import { db } from "./db"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
}

interface Template {
  id: string
  name: string
  description?: string
  category: string
  structure: string
  parentTemplateId?: string
  isSystem: boolean
}

/**
 * Recursively resolves template inheritance and merges structures
 * Child templates override parent blocks with the same ID
 */
export async function resolveTemplateInheritance(templateId: string): Promise<PageBlock[]> {
  const template = await db.cmsTemplate.findUnique({
    where: { id: templateId }
  })

  if (!template) {
    throw new Error(`Template with id ${templateId} not found`)
  }

  let blocks: PageBlock[] = []

  // If template has a parent, resolve parent structure first
  if (template.parentTemplateId) {
    try {
      const parentBlocks = await resolveTemplateInheritance(template.parentTemplateId)
      blocks = [...parentBlocks]
    } catch (error) {
      console.warn(`Failed to resolve parent template ${template.parentTemplateId}:`, error)
      // Continue with just current template if parent resolution fails
    }
  }

  // Parse current template structure
  try {
    const currentBlocks: PageBlock[] = JSON.parse(template.structure)
    
    // Merge current blocks with parent blocks
    // Current blocks override parent blocks with the same ID
    const mergedBlocks = mergeTemplateBlocks(blocks, currentBlocks)
    
    return mergedBlocks
  } catch (error) {
    console.error(`Failed to parse template structure for ${templateId}:`, error)
    return blocks // Return parent blocks if current template parsing fails
  }
}

/**
 * Merges template blocks, with child blocks overriding parent blocks with same ID
 */
export function mergeTemplateBlocks(parentBlocks: PageBlock[], childBlocks: PageBlock[]): PageBlock[] {
  const blockMap = new Map<string, PageBlock>()
  
  // Add parent blocks first
  parentBlocks.forEach(block => {
    blockMap.set(block.id, block)
  })
  
  // Override with child blocks (same ID = override, new ID = append)
  childBlocks.forEach(block => {
    blockMap.set(block.id, block)
  })
  
  // Convert back to array, maintaining order (parent blocks first, then new child blocks)
  const result: PageBlock[] = []
  const processedIds = new Set<string>()
  
  // First add parent blocks (potentially overridden)
  parentBlocks.forEach(parentBlock => {
    if (!processedIds.has(parentBlock.id)) {
      result.push(blockMap.get(parentBlock.id)!)
      processedIds.add(parentBlock.id)
    }
  })
  
  // Then add new child blocks
  childBlocks.forEach(childBlock => {
    if (!processedIds.has(childBlock.id)) {
      result.push(childBlock)
      processedIds.add(childBlock.id)
    }
  })
  
  return result
}

/**
 * Gets the full inheritance chain for a template
 */
export async function getTemplateInheritanceChain(templateId: string): Promise<Template[]> {
  const chain: Template[] = []
  let currentId = templateId
  const visited = new Set<string>() // Prevent circular references
  
  while (currentId && !visited.has(currentId)) {
    visited.add(currentId)
    
    const template = await db.cmsTemplate.findUnique({
      where: { id: currentId }
    })
    
    if (!template) break
    
    chain.unshift(template as Template)
    currentId = template.parentTemplateId || ''
  }
  
  return chain
}

/**
 * Validates that a template inheritance relationship would not create a cycle
 */
export async function validateTemplateInheritance(
  templateId: string, 
  parentTemplateId: string
): Promise<{ valid: boolean; error?: string }> {
  // Check if parent template exists
  const parentTemplate = await db.cmsTemplate.findUnique({
    where: { id: parentTemplateId }
  })
  
  if (!parentTemplate) {
    return { valid: false, error: 'Parent template not found' }
  }
  
  // Check if parent is in the same category
  const childTemplate = await db.cmsTemplate.findUnique({
    where: { id: templateId }
  })
  
  if (!childTemplate) {
    return { valid: false, error: 'Child template not found' }
  }
  
  if (parentTemplate.category !== childTemplate.category) {
    return { valid: false, error: 'Templates can only inherit from templates in the same category' }
  }
  
  // Check for circular reference by walking up the parent chain
  let currentId = parentTemplateId
  const visited = new Set<string>([templateId])
  
  while (currentId) {
    if (visited.has(currentId)) {
      return { valid: false, error: 'Circular inheritance detected' }
    }
    
    visited.add(currentId)
    
    const current = await db.cmsTemplate.findUnique({
      where: { id: currentId },
      select: { parentTemplateId: true }
    })
    
    if (!current) break
    currentId = current.parentTemplateId || ''
  }
  
  return { valid: true }
}

/**
 * Gets all descendant templates of a given template
 */
export async function getTemplateDescendants(templateId: string): Promise<Template[]> {
  const descendants: Template[] = []
  
  const findDescendants = async (parentId: string) => {
    const children = await db.cmsTemplate.findMany({
      where: { parentTemplateId: parentId }
    })
    
    for (const child of children) {
      descendants.push(child as Template)
      await findDescendants(child.id) // Recursively find descendants
    }
  }
  
  await findDescendants(templateId)
  return descendants
}
