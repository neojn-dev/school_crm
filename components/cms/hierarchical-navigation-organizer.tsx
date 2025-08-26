"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  FileText, 
  Save,
  RefreshCw,
  Navigation,
  Plus,
  Trash2,
  FolderPlus,
  Home,
  ChevronRight,
  ChevronDown,
  Edit,
  Folder,
  Settings
} from "lucide-react"
import { toast } from "react-toastify"

interface CmsPage {
  id: string
  title: string
  slug: string
  isPublished: boolean
  description?: string
}

interface NavigationItem {
  id: string
  label: string
  href: string
  target?: string
  type: 'page' | 'external' | 'section' | 'homepage'
  pageId?: string
  parentId?: string
  sortOrder: number
  isActive: boolean
  depth?: number
  page?: {
    id: string
    title: string
    slug: string
  }
  children?: NavigationItem[]
}

interface SiteSettings {
  id?: string
  homepageId?: string
  homepage?: {
    id: string
    title: string
    slug: string
  }
}

interface HierarchicalNavigationOrganizerProps {
  onNavigationUpdate?: () => void
}

export function HierarchicalNavigationOrganizer({ onNavigationUpdate }: HierarchicalNavigationOrganizerProps) {
  const [pages, setPages] = useState<CmsPage[]>([])
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newItemType, setNewItemType] = useState<'page' | 'section'>('page')
  const [newItemLabel, setNewItemLabel] = useState('')
  const [newItemPageId, setNewItemPageId] = useState('')
  const [newItemParentId, setNewItemParentId] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch pages, navigation, and site settings in parallel
      const [pagesResponse, navigationResponse, settingsResponse] = await Promise.all([
        fetch('/api/cms/pages'),
        fetch('/api/cms/navigation'),
        fetch('/api/cms/site-settings')
      ])

      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json()
        setPages(pagesData.pages || [])
      }

      if (navigationResponse.ok) {
        const navigationData = await navigationResponse.json()
        setNavigationItems(buildHierarchy(navigationData || []))
      }

      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json()
        setSiteSettings(settingsData || {})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load navigation data')
    } finally {
      setLoading(false)
    }
  }

  const buildHierarchy = (items: NavigationItem[]): NavigationItem[] => {
    const itemMap = new Map<string, NavigationItem>()
    const rootItems: NavigationItem[] = []

    // First pass: create map of all items
    items.forEach(item => {
      itemMap.set(item.id, { ...item, children: [], depth: 0 })
    })

    // Second pass: build hierarchy
    items.forEach(item => {
      const currentItem = itemMap.get(item.id)!
      if (item.parentId && itemMap.has(item.parentId)) {
        const parent = itemMap.get(item.parentId)!
        currentItem.depth = (parent.depth || 0) + 1
        parent.children!.push(currentItem)
      } else {
        rootItems.push(currentItem)
      }
    })

    // Sort items by sortOrder
    const sortItems = (items: NavigationItem[]) => {
      items.sort((a, b) => a.sortOrder - b.sortOrder)
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          sortItems(item.children)
        }
      })
    }

    sortItems(rootItems)
    return rootItems
  }

  const flattenHierarchy = (items: NavigationItem[]): NavigationItem[] => {
    const flattened: NavigationItem[] = []
    
    const flatten = (items: NavigationItem[]) => {
      items.forEach(item => {
        flattened.push(item)
        if (item.children && item.children.length > 0) {
          flatten(item.children)
        }
      })
    }
    
    flatten(items)
    return flattened
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const flatItems = flattenHierarchy(navigationItems)
    const [reorderedItem] = flatItems.splice(result.source.index, 1)
    flatItems.splice(result.destination.index, 0, reorderedItem)

    // Update sort orders
    const updatedItems = flatItems.map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }))

    setNavigationItems(buildHierarchy(updatedItems))
  }

  const addNavigationItem = async () => {
    try {
      if (newItemType === 'page' && !newItemPageId) {
        toast.error('Please select a page')
        return
      }

      if (newItemType === 'section' && !newItemLabel.trim()) {
        toast.error('Please enter a section label')
        return
      }

      const response = await fetch('/api/cms/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: newItemType === 'page' 
            ? pages.find(p => p.id === newItemPageId)?.title 
            : newItemLabel.trim(),
          type: newItemType,
          pageId: newItemType === 'page' ? newItemPageId : null,
          parentId: newItemParentId,
          isActive: true,
          href: newItemType === 'section' ? '#' : ''
        })
      })

      if (response.ok) {
        await fetchData()
        setShowAddDialog(false)
        resetAddForm()
        toast.success(`Added ${newItemType} to navigation`)
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to add item to navigation')
      }
    } catch (error) {
      console.error('Error adding item to navigation:', error)
      toast.error('Failed to add item to navigation')
    }
  }

  const resetAddForm = () => {
    setNewItemType('page')
    setNewItemLabel('')
    setNewItemPageId('')
    setNewItemParentId(null)
  }

  const removeFromNavigation = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cms/navigation/${itemId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchData()
        toast.success('Removed from navigation')
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to remove from navigation')
      }
    } catch (error) {
      console.error('Error removing from navigation:', error)
      toast.error('Failed to remove from navigation')
    }
  }

  const toggleItemVisibility = async (itemId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/cms/navigation/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      })

      if (response.ok) {
        await fetchData()
        toast.success(`Navigation item ${isActive ? 'shown' : 'hidden'}`)
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to update navigation item')
      }
    } catch (error) {
      console.error('Error updating navigation item:', error)
      toast.error('Failed to update navigation item')
    }
  }

  const updateHomepage = async (homepageId: string) => {
    try {
      const response = await fetch('/api/cms/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homepageId })
      })

      if (response.ok) {
        await fetchData()
        toast.success('Homepage updated successfully')
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to update homepage')
      }
    } catch (error) {
      console.error('Error updating homepage:', error)
      toast.error('Failed to update homepage')
    }
  }

  const saveNavigationOrder = async () => {
    try {
      setSaving(true)
      
      const flatItems = flattenHierarchy(navigationItems)
      const updates = flatItems.map((item, index) => ({
        id: item.id,
        sortOrder: index + 1
      }))

      const response = await fetch('/api/cms/navigation/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updates })
      })

      if (response.ok) {
        toast.success('Navigation order saved successfully')
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to save navigation order')
      }
    } catch (error) {
      console.error('Error saving navigation order:', error)
      toast.error('Failed to save navigation order')
    } finally {
      setSaving(false)
    }
  }

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const renderNavigationItem = (item: NavigationItem, index: number, parentId?: string) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const depth = item.depth || 0
    const maxDepth = 4

    return (
      <div key={item.id} className="space-y-1">
        <Draggable draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={`border rounded-lg bg-white ${
                snapshot.isDragging ? 'shadow-lg' : ''
              } ${!item.isActive ? 'opacity-60' : ''}`}
              style={{
                marginLeft: `${depth * 20}px`,
                ...provided.draggableProps.style
              }}
            >
              <div className="p-3 flex items-center space-x-3">
                {/* Drag Handle */}
                <div
                  {...provided.dragHandleProps}
                  className="cursor-move text-gray-400 hover:text-gray-600"
                >
                  <GripVertical className="h-4 w-4" />
                </div>

                {/* Expand/Collapse */}
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.id)}
                    className="p-0 h-auto"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}

                {/* Icon */}
                <div className="flex-shrink-0">
                  {item.type === 'section' ? (
                    <Folder className="h-4 w-4 text-blue-600" />
                  ) : item.type === 'homepage' ? (
                    <Home className="h-4 w-4 text-green-600" />
                  ) : item.type === 'external' ? (
                    <ExternalLink className="h-4 w-4 text-purple-600" />
                  ) : (
                    <FileText className="h-4 w-4 text-gray-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium truncate">{item.label}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    {depth > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Level {depth + 1}
                      </Badge>
                    )}
                  </div>
                  {item.type === 'page' && item.page && (
                    <p className="text-sm text-gray-500 truncate">
                      /{item.page.slug}
                    </p>
                  )}
                  {item.type === 'external' && (
                    <p className="text-sm text-gray-500 truncate">
                      {item.href}
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-2">
                  {/* Add Child (only if not at max depth) */}
                  {item.type === 'section' && depth < maxDepth - 1 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => setNewItemParentId(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Item to &quot;{item.label}&quot;</DialogTitle>
                        </DialogHeader>
                        <AddItemForm 
                          parentId={item.id}
                          onAdd={addNavigationItem}
                          onCancel={() => setNewItemParentId(null)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* Visibility Toggle */}
                  <div className="flex items-center space-x-1">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(checked) => 
                        toggleItemVisibility(item.id, checked)
                      }
                      size="sm"
                    />
                    {item.isActive ? (
                      <Eye className="h-3 w-3 text-green-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </div>

                  {/* Remove Button */}
                  <Button
                    onClick={() => removeFromNavigation(item.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Draggable>

        {/* Render Children */}
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {item.children!.map((child, childIndex) => 
              renderNavigationItem(child, childIndex, item.id)
            )}
          </div>
        )}
      </div>
    )
  }

  const AddItemForm = ({ parentId, onAdd, onCancel }: {
    parentId: string | null
    onAdd: () => void
    onCancel: () => void
  }) => (
    <div className="space-y-4">
      <div>
        <Label>Item Type</Label>
        <Select value={newItemType} onValueChange={(value: 'page' | 'section') => setNewItemType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="page">Page</SelectItem>
            <SelectItem value="section">Section Header</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {newItemType === 'page' ? (
        <div>
          <Label>Select Page</Label>
          <Select value={newItemPageId} onValueChange={setNewItemPageId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a page" />
            </SelectTrigger>
            <SelectContent>
              {pages.filter(p => p.isPublished).map(page => (
                <SelectItem key={page.id} value={page.id}>
                  {page.title} (/{page.slug})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div>
          <Label>Section Label</Label>
          <Input
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            placeholder="Enter section name"
          />
        </div>
      )}

      <div className="flex space-x-2">
        <Button onClick={onAdd} className="flex-1">
          Add {newItemType}
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Hierarchical Navigation</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={fetchData}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={resetAddForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Navigation Item</DialogTitle>
              </DialogHeader>
              <AddItemForm 
                parentId={newItemParentId}
                onAdd={addNavigationItem}
                onCancel={() => setShowAddDialog(false)}
              />
            </DialogContent>
          </Dialog>
          <Button
            onClick={saveNavigationOrder}
            disabled={saving}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Order'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Homepage Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Homepage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Select Homepage</Label>
                <Select
                  value={siteSettings.homepageId || ''}
                  onValueChange={updateHomepage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose homepage" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.filter(p => p.isPublished).map(page => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {siteSettings.homepage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      {siteSettings.homepage.title}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    /{siteSettings.homepage.slug}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Structure */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Navigation Structure</span>
              <Badge variant="secondary">{flattenHierarchy(navigationItems).length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {navigationItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Navigation className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No navigation items yet</p>
                <p className="text-sm">Click &quot;Add Item&quot; to start building your navigation</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="navigation-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {navigationItems.map((item, index) => 
                        renderNavigationItem(item, index)
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Navigation className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Multi-Level Navigation:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Homepage:</strong> Select which page serves as your homepage</li>
                <li>• <strong>Pages:</strong> Add individual pages to navigation</li>
                <li>• <strong>Sections:</strong> Create section headers to group pages</li>
                <li>• <strong>Nesting:</strong> Add items to sections (up to 4 levels deep)</li>
                <li>• <strong>Reordering:</strong> Drag and drop to reorder items</li>
                <li>• <strong>Visibility:</strong> Toggle items on/off with the eye icon</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
