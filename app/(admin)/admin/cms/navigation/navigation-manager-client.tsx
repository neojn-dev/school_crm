"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Move, 
  ExternalLink,
  FileText,
  Menu,
  ChevronDown,
  ChevronRight,
  Save,
  X
} from "lucide-react"
import { toast } from "react-toastify"

interface NavigationItem {
  id: string
  label: string
  href: string
  target?: string
  type: string
  pageId?: string
  sortOrder: number
  isActive: boolean
  parentId?: string
  children?: NavigationItem[]
  page?: {
    id: string
    title: string
    slug: string
  }
}

interface CmsPage {
  id: string
  title: string
  slug: string
  isPublished: boolean
}

export function NavigationManagerClient() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [pages, setPages] = useState<CmsPage[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const [formData, setFormData] = useState({
    label: '',
    href: '',
    target: '',
    type: 'page',
    pageId: '',
    parentId: '',
    isActive: true
  })

  useEffect(() => {
    fetchNavigationItems()
    fetchPages()
  }, [])

  const fetchNavigationItems = async () => {
    try {
      const response = await fetch('/api/cms/navigation')
      if (response.ok) {
        const data = await response.json()
        setNavigationItems(data)
      } else {
        toast.error('Failed to load navigation items')
      }
    } catch (error) {
      console.error('Error fetching navigation:', error)
      toast.error('Failed to load navigation items')
    } finally {
      setLoading(false)
    }
  }

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/cms/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages || [])
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.label.trim()) {
      toast.error('Label is required')
      return
    }

    if (formData.type === 'external' && !formData.href.trim()) {
      toast.error('URL is required for external links')
      return
    }

    if (formData.type === 'page' && !formData.pageId) {
      toast.error('Please select a page')
      return
    }

    try {
      const url = editingItem ? `/api/cms/navigation/${editingItem.id}` : '/api/cms/navigation'
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          href: formData.type === 'page' ? '' : formData.href,
          pageId: formData.type === 'page' ? formData.pageId : null
        })
      })

      if (response.ok) {
        toast.success(editingItem ? 'Navigation item updated' : 'Navigation item created')
        fetchNavigationItems()
        resetForm()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save navigation item')
      }
    } catch (error) {
      console.error('Error saving navigation item:', error)
      toast.error('Failed to save navigation item')
    }
  }

  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item)
    setFormData({
      label: item.label,
      href: item.href,
      target: item.target || '',
      type: item.type,
      pageId: item.pageId || '',
      parentId: item.parentId || '',
      isActive: item.isActive
    })
    setIsAddingNew(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this navigation item?')) return

    try {
      const response = await fetch(`/api/cms/navigation/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Navigation item deleted')
        fetchNavigationItems()
      } else {
        toast.error('Failed to delete navigation item')
      }
    } catch (error) {
      console.error('Error deleting navigation item:', error)
      toast.error('Failed to delete navigation item')
    }
  }

  const resetForm = () => {
    setFormData({
      label: '',
      href: '',
      target: '',
      type: 'page',
      pageId: '',
      parentId: '',
      isActive: true
    })
    setEditingItem(null)
    setIsAddingNew(false)
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div key={item.id} className="space-y-2">
        <Card className={`${level > 0 ? 'ml-8' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.id)}
                    className="p-1 h-6 w-6"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                
                <div className="flex items-center space-x-2">
                  {item.type === 'page' ? (
                    <FileText className="h-4 w-4 text-blue-600" />
                  ) : item.type === 'external' ? (
                    <ExternalLink className="h-4 w-4 text-green-600" />
                  ) : (
                    <Menu className="h-4 w-4 text-purple-600" />
                  )}
                  
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500">
                      {item.type === 'page' && item.page ? (
                        `/${item.page.slug}`
                      ) : (
                        item.href
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={item.isActive ? "default" : "secondary"}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  
                  <Badge variant="outline">
                    {item.type === 'page' ? 'Page' : item.type === 'external' ? 'External' : 'Dropdown'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
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
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="label">Label *</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Navigation label"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">CMS Page</SelectItem>
                      <SelectItem value="external">External Link</SelectItem>
                      <SelectItem value="dropdown">Dropdown Menu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.type === 'page' && (
                  <div>
                    <Label htmlFor="pageId">Select Page</Label>
                    <Select
                      value={formData.pageId}
                      onValueChange={(value) => setFormData({ ...formData, pageId: value })}
                    >
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
                )}

                {formData.type === 'external' && (
                  <div>
                    <Label htmlFor="href">URL *</Label>
                    <Input
                      id="href"
                      value={formData.href}
                      onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                      placeholder="https://example.com"
                      type="url"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="target">Link Target</Label>
                  <Select
                    value={formData.target}
                    onValueChange={(value) => setFormData({ ...formData, target: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Same Window</SelectItem>
                      <SelectItem value="_blank">New Window</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="parentId">Parent Item (Optional)</Label>
                  <Select
                    value={formData.parentId}
                    onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="No parent (top level)" />
                    </SelectTrigger>
                    <SelectContent>
                      {navigationItems
                        .filter(item => item.type === 'dropdown' && item.id !== editingItem?.id)
                        .map(item => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button type="submit" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>{editingItem ? 'Update' : 'Create'} Navigation Item</span>
                </Button>
                
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Navigation Items List */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Navigation Structure</h2>
        <Button onClick={() => setIsAddingNew(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Navigation Item</span>
        </Button>
      </div>

      {navigationItems.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Menu className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Navigation Items</h3>
            <p className="text-gray-600 mb-4">
              Create your first navigation item to get started.
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Navigation Item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {navigationItems
            .filter(item => !item.parentId)
            .map(item => renderNavigationItem(item))}
        </div>
      )}
    </div>
  )
}
