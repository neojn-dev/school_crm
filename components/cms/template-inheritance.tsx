"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { 
  Layers,
  ArrowRight,
  GitBranch,
  Lock,
  Unlock
} from "lucide-react"

interface Template {
  id: string
  name: string
  description?: string
  category: string
  structure: string
  parentTemplateId?: string
  isSystem: boolean
}

interface TemplateInheritanceProps {
  template: Template
  onUpdateInheritance: (parentTemplateId: string | null) => void
}

interface InheritanceNode {
  template: Template
  children: InheritanceNode[]
  level: number
}

export function TemplateInheritance({ template, onUpdateInheritance }: TemplateInheritanceProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [inheritanceTree, setInheritanceTree] = useState<InheritanceNode[]>([])
  const [showInheritanceDialog, setShowInheritanceDialog] = useState(false)
  const [selectedParentId, setSelectedParentId] = useState<string>(template.parentTemplateId || '')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch all templates
  useEffect(() => {
    fetchTemplates()
  }, [])

  // Build inheritance tree when templates change
  useEffect(() => {
    if (templates.length > 0) {
      buildInheritanceTree()
    }
  }, [templates])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/cms/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const buildInheritanceTree = () => {
    const templateMap = new Map(templates.map(t => [t.id, t]))
    const rootNodes: InheritanceNode[] = []
    const processedIds = new Set<string>()

    const buildNode = (template: Template, level: number = 0): InheritanceNode => {
      const children = templates
        .filter(t => t.parentTemplateId === template.id)
        .map(child => buildNode(child, level + 1))

      return {
        template,
        children,
        level
      }
    }

    // Find root templates (no parent)
    templates
      .filter(t => !t.parentTemplateId)
      .forEach(rootTemplate => {
        if (!processedIds.has(rootTemplate.id)) {
          rootNodes.push(buildNode(rootTemplate))
          markProcessed(rootTemplate.id, processedIds)
        }
      })

    setInheritanceTree(rootNodes)
  }

  const markProcessed = (templateId: string, processed: Set<string>) => {
    processed.add(templateId)
    templates
      .filter(t => t.parentTemplateId === templateId)
      .forEach(child => markProcessed(child.id, processed))
  }

  // Get available parent templates (excluding self and descendants)
  const getAvailableParents = (): Template[] => {
    const descendants = new Set<string>()
    
    const collectDescendants = (templateId: string) => {
      descendants.add(templateId)
      templates
        .filter(t => t.parentTemplateId === templateId)
        .forEach(child => collectDescendants(child.id))
    }

    collectDescendants(template.id)

    return templates.filter(t => 
      !descendants.has(t.id) && 
      t.id !== template.id &&
      t.category === template.category // Only allow same category inheritance
    )
  }

  // Check if template can inherit (not a system template)
  const canInherit = !template.isSystem

  // Get inheritance chain
  const getInheritanceChain = (templateId: string): Template[] => {
    const chain: Template[] = []
    let currentId = templateId
    
    while (currentId) {
      const currentTemplate = templates.find(t => t.id === currentId)
      if (!currentTemplate) break
      
      chain.unshift(currentTemplate)
      currentId = currentTemplate.parentTemplateId || ''
    }
    
    return chain
  }

  const handleUpdateInheritance = async () => {
    setIsLoading(true)
    try {
      const parentId = selectedParentId || null
      await onUpdateInheritance(parentId)
      setShowInheritanceDialog(false)
    } catch (error) {
      console.error('Error updating inheritance:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderInheritanceTree = (nodes: InheritanceNode[]): JSX.Element[] => {
    return nodes.map(node => (
      <div key={node.template.id} className="space-y-2">
        <div 
          className={`flex items-center space-x-2 p-2 rounded ${
            node.template.id === template.id 
              ? 'bg-blue-100 border border-blue-300' 
              : 'bg-gray-50'
          }`}
          style={{ marginLeft: `${node.level * 20}px` }}
        >
          {node.level > 0 && (
            <ArrowRight className="h-4 w-4 text-gray-400" />
          )}
          <GitBranch className="h-4 w-4 text-gray-600" />
          <span className="font-medium">{node.template.name}</span>
          <span className="text-sm text-gray-500">({node.template.category})</span>
          {node.template.isSystem && (
            <Lock className="h-3 w-3 text-gray-400" />
          )}
          {node.template.id === template.id && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Current</span>
          )}
        </div>
        {node.children.length > 0 && (
          <div className="space-y-2">
            {renderInheritanceTree(node.children)}
          </div>
        )}
      </div>
    ))
  }

  const inheritanceChain = getInheritanceChain(template.id)

  return (
    <div className="space-y-4">
      {/* Current Inheritance Status */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Template Inheritance</h3>
          {canInherit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInheritanceDialog(true)}
            >
              <GitBranch className="h-4 w-4 mr-2" />
              Manage Inheritance
            </Button>
          )}
        </div>

        {/* Inheritance Chain */}
        {inheritanceChain.length > 1 ? (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Inheritance Chain:</Label>
            <div className="flex items-center space-x-2 text-sm">
              {inheritanceChain.map((t, index) => (
                <div key={t.id} className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded ${
                    t.id === template.id 
                      ? 'bg-blue-100 text-blue-800 font-medium' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {t.name}
                  </span>
                  {index < inheritanceChain.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            {canInherit 
              ? 'This template does not inherit from any parent template.'
              : 'System templates cannot inherit from other templates.'
            }
          </p>
        )}

        {!canInherit && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            <span>System template - inheritance locked</span>
          </div>
        )}
      </div>

      {/* Inheritance Tree Visualization */}
      {inheritanceTree.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Template Hierarchy</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {renderInheritanceTree(inheritanceTree)}
          </div>
        </div>
      )}

      {/* Inheritance Management Dialog */}
      <Dialog open={showInheritanceDialog} onOpenChange={setShowInheritanceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Template Inheritance</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="parentTemplate">Parent Template</Label>
              <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No parent (root template)</SelectItem>
                  {getAvailableParents().map(t => (
                    <SelectItem key={t.id} value={t.id}>
                      <div className="flex items-center space-x-2">
                        <span>{t.name}</span>
                        <span className="text-xs text-gray-500">({t.category})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Templates can only inherit from templates in the same category.
              </p>
            </div>

            {selectedParentId && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Inheriting from a parent template will merge the parent's 
                  structure with this template's structure. Child templates override parent blocks 
                  with the same ID.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowInheritanceDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateInheritance}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Inheritance'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
