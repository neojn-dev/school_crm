"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Dynamically import block components
const HeroBlock = dynamic(() => import("../blocks/hero-block").then(m => ({ default: m.HeroBlock })), {
  loading: () => <BlockSkeleton />
})

const FeaturesBlock = dynamic(() => import("../blocks/features-block").then(m => ({ default: m.FeaturesBlock })), {
  loading: () => <BlockSkeleton />
})

const TestimonialsBlock = dynamic(() => import("../blocks/testimonials-block").then(m => ({ default: m.TestimonialsBlock })), {
  loading: () => <BlockSkeleton />
})

// Block component mapping
const blockComponents = {
  HeroBlock,
  FeaturesBlock,
  TestimonialsBlock
}

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
}

interface BlockRendererProps {
  block: PageBlock
  isEditing?: boolean
  onEdit?: () => void
}

function BlockSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 h-64 rounded-lg flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  )
}

export function BlockRenderer({ block, isEditing = false, onEdit }: BlockRendererProps) {
  const BlockComponent = blockComponents[block.component as keyof typeof blockComponents]

  if (!BlockComponent) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600 font-medium">Unknown Block Type</p>
        <p className="text-red-500 text-sm mt-1">
          Component "{block.component}" not found
        </p>
      </div>
    )
  }

  return (
    <Suspense fallback={<BlockSkeleton />}>
      <div className="relative">
        <BlockComponent
          content={block.content}
          isEditing={isEditing}
          onEdit={onEdit}
        />
      </div>
    </Suspense>
  )
}
