"use client"

import { BlockRenderer } from "./page-builder/block-renderer"

interface CmsPageRendererProps {
  page: {
    id: string
    title: string
    slug: string
    content?: string
    parsedBlocks: any[]
    isPublished: boolean
  }
  isPreview?: boolean
}

export function CmsPageRenderer({ page, isPreview = false }: CmsPageRendererProps) {
  return (
    <div className="min-h-screen">
      {/* Preview Banner */}
      {isPreview && (
        <div className="bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
          🔍 Preview Mode - This page is not yet published
        </div>
      )}
      
      {/* Page Content */}
      <div className="cms-page-content">
        {page.parsedBlocks && page.parsedBlocks.length > 0 ? (
          page.parsedBlocks.map((block, index) => (
            <BlockRenderer
              key={block.id || `block-${index}`}
              block={block}
              isEditing={false}
            />
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {page.title}
              </h1>
              <p className="text-gray-600 mb-8">
                This page is under construction. Content will be added soon.
              </p>
              {isPreview && (
                <p className="text-sm text-yellow-600">
                  Add content blocks using the CMS editor to build this page.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
