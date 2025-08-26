"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { TextAlign } from '@tiptap/extension-text-align'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette
} from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'

interface TipTapEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const MenuBar = ({ editor }: { editor: any }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  
  if (!editor) {
    return null
  }

  const colors = [
    // Grayscale
    '#000000', '#374151', '#6B7280', '#9CA3AF',
    // Primary colors
    '#EF4444', '#F97316', '#EAB308', '#22C55E', 
    '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E',
    // Light variants
    '#FCA5A5', '#FDBA74', '#FDE047', '#86EFAC',
    '#93C5FD', '#C4B5FD', '#F9A8D4', '#FB7185'
  ]

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
      {/* Text Formatting */}
      <Button
        type="button"
        variant={editor.isActive('bold') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="h-8 w-8 p-0"
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive('italic') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="h-8 w-8 p-0"
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive('strike') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="h-8 w-8 p-0"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive('code') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className="h-8 w-8 p-0"
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Lists */}
      <Button
        type="button"
        variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="h-8 w-8 p-0"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="h-8 w-8 p-0"
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text Alignment */}
      <Button
        type="button"
        variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className="h-8 w-8 p-0"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className="h-8 w-8 p-0"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className="h-8 w-8 p-0"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className="h-8 w-8 p-0"
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text Color */}
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="h-8 w-8 p-0"
        >
          <Palette className="h-4 w-4" />
        </Button>
        
        {showColorPicker && (
          <div 
            ref={colorPickerRef}
            className="absolute top-10 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-3 w-[200px] animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <div className="grid grid-cols-4 gap-2 mb-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-7 h-7 rounded-md border-2 border-gray-300 hover:scale-110 hover:border-gray-400 transition-all duration-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run()
                    setShowColorPicker(false)
                  }}
                  title={`Set color to ${color}`}
                />
              ))}
            </div>
            <div className="pt-2 border-t border-gray-200">
              <button
                type="button"
                className="w-full text-xs text-gray-600 hover:text-gray-800 py-1.5 px-2 rounded hover:bg-gray-100 transition-colors font-medium"
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                  setShowColorPicker(false)
                }}
              >
                Remove Color
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Undo/Redo */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-8 w-8 p-0"
      >
        <Undo className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-8 w-8 p-0"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function TipTapEditor({ 
  content = '', 
  onChange, 
  placeholder = 'Start typing...', 
  className,
  disabled = false 
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editable: !disabled,
    immediatelyRender: false, // Fix SSR hydration issues
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[120px] p-4',
          className
        ),
        'data-placeholder': placeholder,
      },
    },
  })

  // Update content when prop changes (using useEffect for safety)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  // Show loading state while editor is initializing
  if (!editor) {
    return (
      <div className={cn(
        "border border-gray-300 rounded-lg overflow-hidden bg-white",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        <div className="border-b border-gray-200 p-2 bg-gray-50 h-12 flex items-center">
          <div className="flex space-x-1">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="min-h-[120px] p-4 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "border border-gray-300 rounded-lg overflow-hidden bg-white",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      {!disabled && <MenuBar editor={editor} />}
      <div className="min-h-[120px]">
        <EditorContent 
          editor={editor} 
          className={cn(
            "prose prose-sm max-w-none p-4 focus-within:outline-none",
            "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[120px]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
          )}
        />
      </div>
    </div>
  )
}
