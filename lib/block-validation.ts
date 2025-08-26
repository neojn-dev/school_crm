interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  message: string
  value?: any
  validator?: (value: any) => boolean
}

interface FieldValidation {
  [fieldName: string]: ValidationRule[]
}

interface BlockValidation {
  content: FieldValidation
  settings?: FieldValidation
}

interface ValidationError {
  field: string
  message: string
  type: 'content' | 'settings'
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

// Block validation configurations
const blockValidations: Record<string, BlockValidation> = {
  HeroBlock: {
    content: {
      title: [
        { type: 'required', message: 'Title is required' },
        { type: 'minLength', value: 3, message: 'Title must be at least 3 characters' },
        { type: 'maxLength', value: 100, message: 'Title must not exceed 100 characters' }
      ],
      description: [
        { type: 'maxLength', value: 500, message: 'Description must not exceed 500 characters' }
      ],
      backgroundImage: [
        { 
          type: 'custom', 
          message: 'Background image must be a valid URL',
          validator: (value: string) => !value || isValidImageUrl(value)
        }
      ]
    },
    settings: {
      overlayOpacity: [
        { 
          type: 'custom', 
          message: 'Overlay opacity must be between 0 and 100',
          validator: (value: number) => value >= 0 && value <= 100
        }
      ]
    }
  },

  FeaturesBlock: {
    content: {
      title: [
        { type: 'required', message: 'Title is required' },
        { type: 'maxLength', value: 100, message: 'Title must not exceed 100 characters' }
      ],
      features: [
        { 
          type: 'custom', 
          message: 'At least one feature is required',
          validator: (features: any[]) => Array.isArray(features) && features.length > 0
        },
        {
          type: 'custom',
          message: 'Maximum 12 features allowed',
          validator: (features: any[]) => !Array.isArray(features) || features.length <= 12
        }
      ]
    }
  },

  TestimonialsBlock: {
    content: {
      title: [
        { type: 'required', message: 'Title is required' }
      ],
      testimonials: [
        { 
          type: 'custom', 
          message: 'At least one testimonial is required',
          validator: (testimonials: any[]) => Array.isArray(testimonials) && testimonials.length > 0
        }
      ]
    }
  },

  ImageBlock: {
    content: {
      src: [
        { type: 'required', message: 'Image source is required' },
        { 
          type: 'custom', 
          message: 'Must be a valid image URL',
          validator: (value: string) => isValidImageUrl(value)
        }
      ],
      alt: [
        { type: 'required', message: 'Alt text is required for accessibility' },
        { type: 'maxLength', value: 255, message: 'Alt text must not exceed 255 characters' }
      ]
    }
  },

  ButtonBlock: {
    content: {
      text: [
        { type: 'required', message: 'Button text is required' },
        { type: 'maxLength', value: 50, message: 'Button text must not exceed 50 characters' }
      ],
      href: [
        { 
          type: 'custom', 
          message: 'Must be a valid URL',
          validator: (value: string) => !value || isValidUrl(value)
        }
      ]
    }
  },

  ContactFormBlock: {
    content: {
      title: [
        { type: 'required', message: 'Form title is required' }
      ],
      fields: [
        { 
          type: 'custom', 
          message: 'At least one form field is required',
          validator: (fields: any[]) => Array.isArray(fields) && fields.length > 0
        },
        {
          type: 'custom',
          message: 'Maximum 20 form fields allowed',
          validator: (fields: any[]) => !Array.isArray(fields) || fields.length <= 20
        }
      ]
    }
  },

  VideoBlock: {
    content: {
      embedUrl: [
        { type: 'required', message: 'Video URL is required' },
        { 
          type: 'custom', 
          message: 'Must be a valid video URL (YouTube, Vimeo, etc.)',
          validator: (value: string) => isValidVideoUrl(value)
        }
      ]
    }
  }
}

// Content validation rules
const contentValidationRules: Record<string, ValidationRule[]> = {
  // SEO-related validations
  metaTitle: [
    { type: 'maxLength', value: 60, message: 'Meta title should not exceed 60 characters for optimal SEO' }
  ],
  metaDescription: [
    { type: 'maxLength', value: 160, message: 'Meta description should not exceed 160 characters for optimal SEO' }
  ],
  
  // Accessibility validations
  headingStructure: [
    { 
      type: 'custom', 
      message: 'Heading levels should follow proper hierarchy (H1 → H2 → H3)',
      validator: validateHeadingStructure
    }
  ],
  
  // Performance validations
  imageOptimization: [
    { 
      type: 'custom', 
      message: 'Large images should be optimized for web',
      validator: validateImageOptimization
    }
  ]
}

/**
 * Validates a block's content and settings
 */
export function validateBlock(
  blockType: string, 
  content: any, 
  settings: any = {}
): ValidationResult {
  const validation = blockValidations[blockType]
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!validation) {
    return { isValid: true, errors: [], warnings: [] }
  }

  // Validate content fields
  if (validation.content) {
    Object.entries(validation.content).forEach(([field, rules]) => {
      const value = content[field]
      
      rules.forEach(rule => {
        const error = validateField(field, value, rule)
        if (error) {
          errors.push({ field, message: error, type: 'content' })
        }
      })
    })
  }

  // Validate settings fields
  if (validation.settings) {
    Object.entries(validation.settings).forEach(([field, rules]) => {
      const value = settings[field]
      
      rules.forEach(rule => {
        const error = validateField(field, value, rule)
        if (error) {
          errors.push({ field, message: error, type: 'settings' })
        }
      })
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Validates a single field against a rule
 */
function validateField(field: string, value: any, rule: ValidationRule): string | null {
  switch (rule.type) {
    case 'required':
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return rule.message
      }
      break

    case 'minLength':
      if (value && typeof value === 'string' && value.length < rule.value) {
        return rule.message
      }
      break

    case 'maxLength':
      if (value && typeof value === 'string' && value.length > rule.value) {
        return rule.message
      }
      break

    case 'pattern':
      if (value && typeof value === 'string' && !new RegExp(rule.value).test(value)) {
        return rule.message
      }
      break

    case 'custom':
      if (rule.validator && !rule.validator(value)) {
        return rule.message
      }
      break
  }

  return null
}

/**
 * Validates multiple blocks for page-level issues
 */
export function validatePage(blocks: any[]): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for duplicate IDs
  const ids = blocks.map(block => block.id)
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicateIds.length > 0) {
    errors.push({
      field: 'blocks',
      message: `Duplicate block IDs found: ${duplicateIds.join(', ')}`,
      type: 'content'
    })
  }

  // Check heading structure
  const headings = extractHeadings(blocks)
  const headingError = validateHeadingStructure(headings)
  if (headingError) {
    warnings.push({
      field: 'headingStructure',
      message: 'Heading structure should follow proper hierarchy (H1 → H2 → H3)',
      type: 'content'
    })
  }

  // Check for accessibility issues
  const accessibilityIssues = validateAccessibility(blocks)
  warnings.push(...accessibilityIssues)

  // Check for SEO issues
  const seoIssues = validateSEO(blocks)
  warnings.push(...seoIssues)

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Helper validation functions
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function isValidImageUrl(url: string): boolean {
  if (!isValidUrl(url)) return false
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
}

function isValidVideoUrl(url: string): boolean {
  if (!isValidUrl(url)) return false
  return /^https:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)/.test(url)
}

function extractHeadings(blocks: any[]): Array<{ level: number; text: string }> {
  const headings: Array<{ level: number; text: string }> = []
  
  blocks.forEach(block => {
    if (block.component === 'HeadingBlock') {
      headings.push({
        level: block.content.level || 2,
        text: block.content.text || ''
      })
    } else if (block.component === 'HeroBlock' && block.content.title) {
      headings.push({
        level: 1,
        text: block.content.title
      })
    }
  })
  
  return headings
}

function validateHeadingStructure(headings: Array<{ level: number; text: string }>): boolean {
  if (headings.length === 0) return true
  
  let previousLevel = 0
  
  for (const heading of headings) {
    if (heading.level > previousLevel + 1) {
      return false // Skipped a level
    }
    previousLevel = heading.level
  }
  
  return true
}

function validateImageOptimization(blocks: any[]): boolean {
  // This would check for large unoptimized images
  // Implementation would depend on your image handling system
  return true
}

function validateAccessibility(blocks: any[]): ValidationError[] {
  const errors: ValidationError[] = []
  
  blocks.forEach((block, index) => {
    // Check for images without alt text
    if (block.component === 'ImageBlock' && !block.content.alt) {
      errors.push({
        field: `block-${index}`,
        message: 'Image blocks should have alt text for accessibility',
        type: 'content'
      })
    }
    
    // Check for buttons without proper text
    if (block.component === 'ButtonBlock' && (!block.content.text || block.content.text.trim() === '')) {
      errors.push({
        field: `block-${index}`,
        message: 'Button blocks should have descriptive text',
        type: 'content'
      })
    }
  })
  
  return errors
}

function validateSEO(blocks: any[]): ValidationError[] {
  const errors: ValidationError[] = []
  
  // Check for multiple H1 tags
  const h1Count = blocks.filter(block => 
    (block.component === 'HeroBlock' && block.content.title) ||
    (block.component === 'HeadingBlock' && block.content.level === 1)
  ).length
  
  if (h1Count > 1) {
    errors.push({
      field: 'seo',
      message: 'Page should have only one H1 heading for optimal SEO',
      type: 'content'
    })
  }
  
  if (h1Count === 0) {
    errors.push({
      field: 'seo',
      message: 'Page should have at least one H1 heading for SEO',
      type: 'content'
    })
  }
  
  return errors
}

/**
 * Get validation rules for a specific block type
 */
export function getBlockValidationRules(blockType: string): BlockValidation | null {
  return blockValidations[blockType] || null
}

/**
 * Check if a field has validation errors
 */
export function hasFieldErrors(
  blockType: string, 
  fieldName: string, 
  value: any, 
  isSettings = false
): ValidationError[] {
  const validation = blockValidations[blockType]
  if (!validation) return []
  
  const fieldValidations = isSettings ? validation.settings : validation.content
  if (!fieldValidations || !fieldValidations[fieldName]) return []
  
  const errors: ValidationError[] = []
  
  fieldValidations[fieldName].forEach(rule => {
    const error = validateField(fieldName, value, rule)
    if (error) {
      errors.push({
        field: fieldName,
        message: error,
        type: isSettings ? 'settings' : 'content'
      })
    }
  })
  
  return errors
}
