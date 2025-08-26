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
  const [showFolderDialog, setShowFolderDialog] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    item: NavigationItem | null
    isDeleting: boolean
  }>({
    isOpen: false,
    item: null,
    isDeleting: false
  })

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

    const { source, destination, draggableId } = result

    // Handle dragging from available pages to navigation structure
    if (source.droppableId === 'available-pages' && destination.droppableId === 'navigation-structure') {
      const pageId = draggableId.replace('page-', '')
      addPageToNavigation(pageId)
      return
    }

    // Handle dragging from available pages to a navigation item (for nesting)
    if (source.droppableId === 'available-pages' && destination.droppableId.startsWith('nav-item-')) {
      const pageId = draggableId.replace('page-', '')
      const parentId = destination.droppableId.replace('nav-item-', '')
      addPageToNavigation(pageId, parentId)
      return
    }

    // Handle reordering within navigation structure
    if (source.droppableId === 'navigation-structure' && destination.droppableId === 'navigation-structure') {
      const flatItems = flattenHierarchy(navigationItems)
      const [reorderedItem] = flatItems.splice(source.index, 1)
      flatItems.splice(destination.index, 0, reorderedItem)

      // Update sort orders
      const updatedItems = flatItems.map((item, index) => ({
        ...item,
        sortOrder: index + 1
      }))

      setNavigationItems(buildHierarchy(updatedItems))
      return
    }

    // Handle moving navigation items between different containers (for nesting)
    if (source.droppableId !== destination.droppableId) {
      // This would handle moving items between different levels
      // Implementation depends on the specific nesting requirements
    }
  }

  const addNavigationFolder = async () => {
    try {
      if (!newFolderName.trim()) {
        toast.error('Please enter a folder name')
        return
      }

      const response = await fetch('/api/cms/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: newFolderName.trim(),
          type: 'section',
          pageId: null,
          parentId: null,
          isActive: true,
          href: '#'
        })
      })

      if (response.ok) {
        await fetchData()
        setShowFolderDialog(false)
        setNewFolderName('')
        toast.success('Added folder to navigation')
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to add folder to navigation')
      }
    } catch (error) {
      console.error('Error adding folder to navigation:', error)
      toast.error('Failed to add folder to navigation')
    }
  }

  const addPageToNavigation = async (pageId: string, parentId?: string) => {
    try {
      const page = pages.find(p => p.id === pageId)
      if (!page) return

      const response = await fetch('/api/cms/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: page.title,
          type: 'page',
          pageId: pageId,
          parentId: parentId || null,
          isActive: true,
          href: `/${page.slug}`
        })
      })

      if (response.ok) {
        await fetchData()
        toast.success('Added page to navigation')
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to add page to navigation')
      }
    } catch (error) {
      console.error('Error adding page to navigation:', error)
      toast.error('Failed to add page to navigation')
    }
  }

  const resetAddForm = () => {
    setNewItemType('page')
    setNewItemLabel('')
    setNewItemPageId('')
    setNewItemParentId(null)
  }

  const openDeleteDialog = (itemId: string) => {
    const item = flattenHierarchy(navigationItems).find(nav => nav.id === itemId)
    if (item) {
      setDeleteDialog({
        isOpen: true,
        item,
        isDeleting: false
      })
    }
  }

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      item: null,
      isDeleting: false
    })
  }

  const deleteNavigationItemRecursively = async (item: NavigationItem): Promise<void> => {
    // First, delete all children recursively
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        await deleteNavigationItemRecursively(child)
      }
    }

    // Then delete the item itself
    const response = await fetch(`/api/cms/navigation/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      let errorMessage = 'Failed to remove from navigation'
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }
  }

  const confirmDeleteNavigation = async () => {
    if (!deleteDialog.item) return

    setDeleteDialog(prev => ({ ...prev, isDeleting: true }))

    try {
      // Delete the item and all its children recursively
      await deleteNavigationItemRecursively(deleteDialog.item)
      
      // Refresh the data and close dialog
      await fetchData()
      toast.success('Removed from navigation')
      onNavigationUpdate?.()
      closeDeleteDialog()
    } catch (error) {
      console.error('Error removing from navigation:', error)
      const message = error instanceof Error ? error.message : 'Failed to remove from navigation'
      toast.error(message)
      setDeleteDialog(prev => ({ ...prev, isDeleting: false }))
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
    const isFolder = item.type === 'section'

    return (
      <div key={item.id} className="space-y-0.5">
        <Draggable draggableId={`nav-${item.id}`} index={index}>
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
              {isFolder ? (
                <Droppable droppableId={`nav-item-${item.id}`} type="PAGES">
                  {(dropProvided, dropSnapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                      {...dropProvided.droppableProps}
                      className={`p-2 rounded-lg transition-colors ${
                        dropSnapshot.isDraggingOver ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>

                        {/* Expand/Collapse */}
                        {hasChildren && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(item.id)}
                            className="p-0 h-auto w-5 flex-shrink-0"
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
                          <Folder className="h-4 w-4 text-blue-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium truncate">{item.label}</h4>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              folder
                            </Badge>
                            {depth > 0 && (
                              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                L{depth + 1}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {/* Visibility Toggle */}
                          <Button
                            onClick={() => toggleItemVisibility(item.id, !item.isActive)}
                            size="sm"
                            variant="ghost"
                            className={`h-6 w-6 p-0 ${
                              item.isActive 
                                ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                            title={item.isActive ? "Hide from navigation" : "Show in navigation"}
                          >
                            {item.isActive ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </Button>

                                            {/* Remove Button */}
                  <Button
                    onClick={() => openDeleteDialog(item.id)}
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Remove from navigation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                        </div>
                      </div>
                      {dropProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              ) : (
                <div className="p-2 flex items-center space-x-2">
                  {/* Drag Handle */}
                  <div
                    {...provided.dragHandleProps}
                    className="cursor-move text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {item.type === 'homepage' ? (
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
                      <h4 className="text-sm font-medium truncate">{item.label}</h4>
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        page
                      </Badge>
                      {depth > 0 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          L{depth + 1}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {/* Visibility Toggle */}
                    <Button
                      onClick={() => toggleItemVisibility(item.id, !item.isActive)}
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 ${
                        item.isActive 
                          ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                      title={item.isActive ? "Hide from navigation" : "Show in navigation"}
                    >
                      {item.isActive ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>

                    {/* Remove Button */}
                    <Button
                      onClick={() => openDeleteDialog(item.id)}
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Remove from navigation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Draggable>

        {/* Render Children */}
        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {item.children!.map((child, childIndex) => 
              renderNavigationItem(child, childIndex, item.id)
            )}
          </div>
        )}
      </div>
    )
  }



  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Navigation className="h-4 w-4 text-blue-600" />
          <h2 className="text-base font-semibold">Navigation Builder</h2>
          <Badge variant="secondary" className="text-xs">
            {flattenHierarchy(navigationItems).length} items
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={fetchData}
            variant="outline"
            size="sm"
            disabled={loading}
            className="h-8"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button
            onClick={saveNavigationOrder}
            disabled={saving}
            size="sm"
            className="h-8"
          >
            <Save className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Order'}</span>
          </Button>
        </div>
      </div>

      {/* Homepage Settings */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4 text-green-600" />
              <Label className="font-medium">Homepage:</Label>
            </div>
                          <div className="flex items-center space-x-3">
                <Select
                  value={siteSettings.homepageId || ''}
                  onValueChange={updateHomepage}
                >
                  <SelectTrigger className="w-48">
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
          </div>
        </CardContent>
      </Card>

      {/* Drag and Drop Navigation Builder */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Available Pages */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-4 w-4 text-blue-600" />
                <h3 className="text-base font-semibold">Available Pages</h3>
                <Badge variant="secondary" className="text-xs">
                  {pages.filter(p => p.isPublished && !navigationItems.some(nav => nav.pageId === p.id)).length} pages
                </Badge>
              </div>
              
              <Droppable droppableId="available-pages" type="PAGES">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-1 min-h-[200px] p-2 border-2 border-dashed rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    {pages
                      .filter(p => p.isPublished && !navigationItems.some(nav => nav.pageId === p.id))
                      .map((page, index) => (
                        <Draggable key={`page-${page.id}`} draggableId={`page-${page.id}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-2 bg-white border rounded-lg cursor-move transition-all ${
                                snapshot.isDragging ? 'shadow-lg rotate-2' : 'hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <FileText className="h-4 w-4 text-gray-600" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">{page.title}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                    {pages.filter(p => p.isPublished && !navigationItems.some(nav => nav.pageId === p.id)).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">All pages are in navigation</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>

        {/* Navigation Structure */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-green-600" />
                <h3 className="text-base font-semibold">Navigation Structure</h3>
                <Badge variant="secondary" className="text-xs">
                  {flattenHierarchy(navigationItems).length} items
                </Badge>
              </div>
              <Button
                onClick={() => setShowFolderDialog(true)}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                title="Add new folder"
              >
                <FolderPlus className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
            
            <Droppable droppableId="navigation-structure" type="NAVIGATION">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-1 min-h-[200px] p-2 border-2 border-dashed rounded-lg transition-colors ${
                    snapshot.isDraggingOver ? 'border-green-400 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  {navigationItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Navigation className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Drag pages here to build navigation</p>
                      <p className="text-xs text-gray-400">Or add folders with the button above</p>
                    </div>
                  ) : (
                    navigationItems.map((item, index) => 
                      renderNavigationItem(item, index)
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
        </div>
      </DragDropContext>

      {/* New Folder Dialog */}
      <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FolderPlus className="h-5 w-5 text-blue-600" />
              <span>Create New Folder</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="folder-name" className="text-sm font-medium">
                Folder Name
              </Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name..."
                className="mt-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addNavigationFolder()
                  }
                }}
                autoFocus
              />
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Folders help organize your navigation into logical groups. You can drag pages into folders to create nested navigation.</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowFolderDialog(false)
                setNewFolderName('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={addNavigationFolder}
              disabled={!newFolderName.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Create Folder
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.isOpen} onOpenChange={closeDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <span>Confirm Deletion</span>
            </DialogTitle>
          </DialogHeader>
          
          {deleteDialog.item && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex-shrink-0">
                  {deleteDialog.item.type === 'section' ? (
                    <Folder className="h-5 w-5 text-red-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-red-900">{deleteDialog.item.label}</h4>
                  <p className="text-sm text-red-700">
                    {deleteDialog.item.type === 'section' ? 'Folder' : 'Page'}
                    {deleteDialog.item.children && deleteDialog.item.children.length > 0 && 
                      ` • Contains ${deleteDialog.item.children.length} item(s)`
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {deleteDialog.item.children && deleteDialog.item.children.length > 0 ? (
                  <p>
                    <strong>Warning:</strong> This will permanently remove "{deleteDialog.item.label}" and all {deleteDialog.item.children.length} item(s) inside it from your navigation. This action cannot be undone.
                  </p>
                ) : (
                  <p>
                    Are you sure you want to remove "{deleteDialog.item.label}" from your navigation? This action cannot be undone.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={closeDeleteDialog}
              disabled={deleteDialog.isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteNavigation}
              disabled={deleteDialog.isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteDialog.isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
