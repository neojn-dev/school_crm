"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
  Trash2
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
  type: 'page' | 'external'
  pageId?: string
  parentId?: string
  sortOrder: number
  isActive: boolean
  page?: {
    id: string
    title: string
    slug: string
  }
  children?: NavigationItem[]
}

interface NavigationOrganizerProps {
  onNavigationUpdate?: () => void
}

export function NavigationOrganizer({ onNavigationUpdate }: NavigationOrganizerProps) {
  const [pages, setPages] = useState<CmsPage[]>([])
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch pages and navigation in parallel
      const [pagesResponse, navigationResponse] = await Promise.all([
        fetch('/api/cms/pages'),
        fetch('/api/cms/navigation')
      ])

      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json()
        setPages(pagesData.pages || [])
      }

      if (navigationResponse.ok) {
        const navigationData = await navigationResponse.json()
        setNavigationItems(navigationData || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load navigation data')
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(navigationItems)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update sort orders
    const updatedItems = items.map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }))

    setNavigationItems(updatedItems)
  }

  const addPageToNavigation = async (page: CmsPage) => {
    try {
      const response = await fetch('/api/cms/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: page.title,
          type: 'page',
          pageId: page.id,
          isActive: true
        })
      })

      if (response.ok) {
        const newItem = await response.json()
        setNavigationItems(prev => [...prev, newItem])
        toast.success(`Added "${page.title}" to navigation`)
        onNavigationUpdate?.()
      } else {
        throw new Error('Failed to add page to navigation')
      }
    } catch (error) {
      console.error('Error adding page to navigation:', error)
      toast.error('Failed to add page to navigation')
    }
  }

  const removeFromNavigation = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cms/navigation/${itemId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setNavigationItems(prev => prev.filter(item => item.id !== itemId))
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
        setNavigationItems(prev => 
          prev.map(item => 
            item.id === itemId ? { ...item, isActive } : item
          )
        )
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

  const saveNavigationOrder = async () => {
    try {
      setSaving(true)
      
      // Update sort orders for all items
      const updates = navigationItems.map((item, index) => ({
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

  const availablePages = pages.filter(page => 
    page.isPublished && !navigationItems.some(nav => nav.pageId === page.id)
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
          <h2 className="text-xl font-semibold">Navigation Organizer</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Available Pages</span>
              <Badge variant="secondary">{availablePages.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {availablePages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>All published pages are already in navigation</p>
              </div>
            ) : (
              <div className="space-y-2">
                {availablePages.map(page => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{page.title}</h4>
                      <p className="text-sm text-gray-500">/{page.slug}</p>
                      {page.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {page.description}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => addPageToNavigation(page)}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Navigation Structure</span>
              <Badge variant="secondary">{navigationItems.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {navigationItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Navigation className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No navigation items yet</p>
                <p className="text-sm">Add pages from the left panel</p>
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
                      {navigationItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`p-3 border rounded-lg bg-white ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              } ${!item.isActive ? 'opacity-60' : ''}`}
                            >
                              <div className="flex items-center space-x-3">
                                {/* Drag Handle */}
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move text-gray-400 hover:text-gray-600"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium truncate">
                                      {item.label}
                                    </h4>
                                    {item.type === 'external' && (
                                      <ExternalLink className="h-3 w-3 text-gray-400" />
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500 truncate">
                                    {item.type === 'page' 
                                      ? `/${item.page?.slug || 'unknown'}` 
                                      : item.href
                                    }
                                  </p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center space-x-2">
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
                      ))}
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
              <h3 className="font-medium text-blue-900 mb-2">How to use:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Drag and drop items in the right panel to reorder navigation</li>
                <li>• Add published pages from the left panel to navigation</li>
                <li>• Toggle visibility with the eye icon (hidden items won't show in header)</li>
                <li>• Remove items with the trash icon</li>
                <li>• Click "Save Order" to apply changes to the website header</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
