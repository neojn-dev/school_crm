"use client"

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Video,
  FileText,
  Palette,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Undo,
  Redo,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
  showToolbar?: boolean
  showPreview?: boolean
  showLayoutOptions?: boolean
  showSeoOptions?: boolean
  onSave?: () => void
  className?: string
}

interface MediaItem {
  id: string
  url: string
  filename: string
  mimeType: string
  altText?: string
  caption?: string
}

interface LayoutOption {
  value: string
  label: string
  description: string
  preview: string
}

const layoutOptions: LayoutOption[] = [
  { value: 'default', label: 'Default', description: 'Standard content layout', preview: '📄' },
  { value: 'featured', label: 'Featured', description: 'Prominent display with large header', preview: '⭐' },
  { value: 'sidebar', label: 'Sidebar', description: 'Content with right sidebar', preview: '📰' },
  { value: 'full-width', label: 'Full Width', description: 'Content spans entire width', preview: '🖥️' },
  { value: 'centered', label: 'Centered', description: 'Content centered with max-width', preview: '🎯' },
  { value: 'magazine', label: 'Magazine', description: 'Multi-column magazine style', preview: '📖' }
]

export function WysiwygEditor({
  value,
  onChange,
  placeholder = "Start writing your content...",
  height = "500px",
  showToolbar = true,
  showPreview = true,
  showLayoutOptions = true,
  showSeoOptions = true,
  onSave,
  className = ""
}: WysiwygEditorProps) {
  const [content, setContent] = useState(value)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState('default')
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  })
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkData, setLinkData] = useState({ url: '', text: '', target: '_self' })
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageData, setImageData] = useState({ url: '', altText: '', caption: '' })
  
  const editorRef = useRef<HTMLDivElement>(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    if (value !== content) {
      setContent(value)
    }
  }, [value, content])

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML
    setContent(newContent)
    onChange(newContent)
    updateUndoRedoState()
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateUndoRedoState()
  }

  const updateUndoRedoState = () => {
    setCanUndo(document.queryCommandEnabled('undo'))
    setCanRedo(document.queryCommandEnabled('redo'))
  }

  const insertHTML = (html: string) => {
    document.execCommand('insertHTML', false, html)
    editorRef.current?.focus()
    updateUndoRedoState()
  }

  const insertLink = () => {
    if (linkData.url && linkData.text) {
      const target = linkData.target === '_blank' ? ' target="_blank" rel="noopener noreferrer"' : ''
      const html = `<a href="${linkData.url}"${target}>${linkData.text}</a>`
      insertHTML(html)
      setShowLinkDialog(false)
      setLinkData({ url: '', text: '', target: '_self' })
    }
  }

  const insertImage = () => {
    if (imageData.url) {
      const alt = imageData.altText ? ` alt="${imageData.altText}"` : ''
      const caption = imageData.caption ? `<figcaption>${imageData.caption}</figcaption>` : ''
      const html = `<figure><img src="${imageData.url}"${alt} style="max-width: 100%; height: auto;" />${caption}</figure>`
      insertHTML(html)
      setShowImageDialog(false)
      setImageData({ url: '', altText: '', caption: '' })
    }
  }


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      insertHTML('&nbsp;&nbsp;&nbsp;&nbsp;')
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    insertHTML(text)
  }

  const insertTable = (rows: number, cols: number) => {
    let html = '<table border="1" style="border-collapse: collapse; width: 100%;">'
    for (let i = 0; i < rows; i++) {
      html += '<tr>'
      for (let j = 0; j < cols; j++) {
        html += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>'
      }
      html += '</tr>'
    }
    html += '</table>'
    insertHTML(html)
  }

  const insertCodeBlock = () => {
    insertHTML('<pre><code>Your code here</code></pre>')
  }

  const insertQuote = () => {
    insertHTML('<blockquote style="border-left: 4px solid #ccc; margin: 0; padding-left: 16px; font-style: italic;">Quote text here</blockquote>')
  }

  const clearFormatting = () => {
    execCommand('removeFormat')
  }

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
  }

  return (
    <div className={`wysiwyg-editor ${className}`}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="border rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1 items-center">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('bold')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('italic')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('underline')}
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('strikethrough')}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyLeft')}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyCenter')}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyRight')}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyFull')}
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('formatBlock', '<h1>')}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('formatBlock', '<h2>')}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('formatBlock', '<h3>')}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('insertUnorderedList')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('insertOrderedList')}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          {/* Special Elements */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={insertQuote}
              title="Insert Quote"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertCodeBlock}
              title="Insert Code"
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>

          {/* Media & Links */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLinkDialog(true)}
              title="Insert Link"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageDialog(true)}
              title="Insert Image"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMediaLibrary(true)}
              title="Media Library"
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>

          {/* Tables */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertTable(3, 3)}
              title="Insert Table"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('undo')}
              disabled={!canUndo}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('redo')}
              disabled={!canRedo}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFormatting}
              title="Clear Formatting"
            >
              <Type className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            {showPreview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePreview}
                title={isPreviewMode ? "Edit Mode" : "Preview Mode"}
              >
                {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            )}
            {onSave && (
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                title="Save"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="border rounded-b-lg">
        {isPreviewMode ? (
          <div 
            className="p-4 min-h-[200px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            className="p-4 min-h-[200px] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            style={{ height }}
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            dangerouslySetInnerHTML={{ __html: content }}
            placeholder={placeholder}
          />
        )}
      </div>

      {/* Layout Options */}
      {showLayoutOptions && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Layout Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {layoutOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedLayout === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedLayout(option.value)}
                >
                  <div className="text-2xl mb-2">{option.preview}</div>
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Options */}
      {showSeoOptions && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">SEO Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={seoData.metaTitle}
                  onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                  placeholder="SEO title (max 60 characters)"
                  maxLength={60}
                />
                <div className="text-xs text-gray-500">
                  {seoData.metaTitle.length}/60 characters
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                  placeholder="SEO description (max 160 characters)"
                  maxLength={160}
                  rows={3}
                />
                <div className="text-xs text-gray-500">
                  {seoData.metaDescription.length}/160 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={seoData.metaKeywords}
                  onChange={(e) => setSeoData({ ...seoData, metaKeywords: e.target.value })}
                  placeholder="Keywords separated by commas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                  placeholder="https://example.com/page"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogTitle">Open Graph Title</Label>
                <Input
                  id="ogTitle"
                  value={seoData.ogTitle}
                  onChange={(e) => setSeoData({ ...seoData, ogTitle: e.target.value })}
                  placeholder="Social media title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogDescription">Open Graph Description</Label>
                <Textarea
                  id="ogDescription"
                  value={seoData.ogDescription}
                  onChange={(e) => setSeoData({ ...seoData, ogDescription: e.target.value })}
                  placeholder="Social media description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Open Graph Image</Label>
                <Input
                  id="ogImage"
                  value={seoData.ogImage}
                  onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="linkUrl">URL</Label>
                <Input
                  id="linkUrl"
                  value={linkData.url}
                  onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="linkText">Link Text</Label>
                <Input
                  id="linkText"
                  value={linkData.text}
                  onChange={(e) => setLinkData({ ...linkData, text: e.target.value })}
                  placeholder="Link text"
                />
              </div>
              <div>
                <Label htmlFor="linkTarget">Target</Label>
                <Select
                  value={linkData.target}
                  onValueChange={(value) => setLinkData({ ...linkData, target: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same Window</SelectItem>
                    <SelectItem value="_blank">New Window</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={insertLink} className="flex-1">Insert Link</Button>
              <Button variant="outline" onClick={() => setShowLinkDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageData.url}
                  onChange={(e) => setImageData({ ...imageData, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="imageAlt">Alt Text</Label>
                <Input
                  id="imageAlt"
                  value={imageData.altText}
                  onChange={(e) => setImageData({ ...imageData, altText: e.target.value })}
                  placeholder="Image description for accessibility"
                />
              </div>
              <div>
                <Label htmlFor="imageCaption">Caption</Label>
                <Input
                  id="imageCaption"
                  value={imageData.caption}
                  onChange={(e) => setImageData({ ...imageData, caption: e.target.value })}
                  placeholder="Image caption (optional)"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={insertImage} className="flex-1">Insert Image</Button>
              <Button variant="outline" onClick={() => setShowImageDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Media Library */}
      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-4/5 h-4/5 max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Media Library</h3>
              <Button variant="outline" onClick={() => setShowMediaLibrary(false)}>
                Close
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4 h-full overflow-y-auto">
              {/* Sample media items - in real implementation, fetch from API */}
              <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-500">
                <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
                  📷
                </div>
                <div className="text-xs text-center">sample-image.jpg</div>
              </div>
              <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-500">
                <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
                  🎥
                </div>
                <div className="text-xs text-center">sample-video.mp4</div>
              </div>
              <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-500">
                <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
                  📄
                </div>
                <div className="text-xs text-center">sample-document.pdf</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

