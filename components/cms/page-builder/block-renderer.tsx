"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Dynamically import block components

// Original blocks
const HeroBlock = dynamic(() => import("../blocks/hero-block").then(m => ({ default: m.HeroBlock })), {
  loading: () => <BlockSkeleton />
})

const FeaturesBlock = dynamic(() => import("../blocks/features-block").then(m => ({ default: m.FeaturesBlock })), {
  loading: () => <BlockSkeleton />
})

const TestimonialsBlock = dynamic(() => import("../blocks/testimonials-block").then(m => ({ default: m.TestimonialsBlock })), {
  loading: () => <BlockSkeleton />
})

// Text blocks
const HeadingBlock = dynamic(() => import("../blocks/text-blocks").then(m => ({ default: m.HeadingBlock })), {
  loading: () => <BlockSkeleton />
})

const ParagraphBlock = dynamic(() => import("../blocks/text-blocks").then(m => ({ default: m.ParagraphBlock })), {
  loading: () => <BlockSkeleton />
})

const QuoteBlock = dynamic(() => import("../blocks/text-blocks").then(m => ({ default: m.QuoteBlock })), {
  loading: () => <BlockSkeleton />
})

const ListBlock = dynamic(() => import("../blocks/text-blocks").then(m => ({ default: m.ListBlock })), {
  loading: () => <BlockSkeleton />
})

const CalloutBlock = dynamic(() => import("../blocks/text-blocks").then(m => ({ default: m.CalloutBlock })), {
  loading: () => <BlockSkeleton />
})

// Layout blocks
const ContainerBlock = dynamic(() => import("../blocks/layout-blocks").then(m => ({ default: m.ContainerBlock })), {
  loading: () => <BlockSkeleton />
})

const SectionBlock = dynamic(() => import("../blocks/layout-blocks").then(m => ({ default: m.SectionBlock })), {
  loading: () => <BlockSkeleton />
})

const ColumnsBlock = dynamic(() => import("../blocks/layout-blocks").then(m => ({ default: m.ColumnsBlock })), {
  loading: () => <BlockSkeleton />
})

const SpacerBlock = dynamic(() => import("../blocks/layout-blocks").then(m => ({ default: m.SpacerBlock })), {
  loading: () => <BlockSkeleton />
})

const DividerBlock = dynamic(() => import("../blocks/layout-blocks").then(m => ({ default: m.DividerBlock })), {
  loading: () => <BlockSkeleton />
})

const CardBlock = dynamic(() => import("../blocks/layout-blocks").then(m => ({ default: m.CardBlock })), {
  loading: () => <BlockSkeleton />
})

// Advanced Layout blocks
const GridBlock = dynamic(() => import("../blocks/advanced-layout-blocks").then(m => ({ default: m.GridBlock })), {
  loading: () => <BlockSkeleton />
})

const FlexboxBlock = dynamic(() => import("../blocks/advanced-layout-blocks").then(m => ({ default: m.FlexboxBlock })), {
  loading: () => <BlockSkeleton />
})

const MasonryBlock = dynamic(() => import("../blocks/advanced-layout-blocks").then(m => ({ default: m.MasonryBlock })), {
  loading: () => <BlockSkeleton />
})

const StickyBlock = dynamic(() => import("../blocks/advanced-layout-blocks").then(m => ({ default: m.StickyBlock })), {
  loading: () => <BlockSkeleton />
})

const FloatingBlock = dynamic(() => import("../blocks/advanced-layout-blocks").then(m => ({ default: m.FloatingBlock })), {
  loading: () => <BlockSkeleton />
})

// Navigation blocks
const NavbarBlock = dynamic(() => import("../blocks/navigation-blocks").then(m => ({ default: m.NavbarBlock })), {
  loading: () => <BlockSkeleton />
})

const BreadcrumbBlock = dynamic(() => import("../blocks/navigation-blocks").then(m => ({ default: m.BreadcrumbBlock })), {
  loading: () => <BlockSkeleton />
})

const PaginationBlock = dynamic(() => import("../blocks/navigation-blocks").then(m => ({ default: m.PaginationBlock })), {
  loading: () => <BlockSkeleton />
})

const TagCloudBlock = dynamic(() => import("../blocks/navigation-blocks").then(m => ({ default: m.TagCloudBlock })), {
  loading: () => <BlockSkeleton />
})

// Interactive blocks
const AccordionBlock = dynamic(() => import("../blocks/interactive-blocks").then(m => ({ default: m.AccordionBlock })), {
  loading: () => <BlockSkeleton />
})

const ModalBlock = dynamic(() => import("../blocks/interactive-blocks").then(m => ({ default: m.ModalBlock })), {
  loading: () => <BlockSkeleton />
})

const TooltipBlock = dynamic(() => import("../blocks/interactive-blocks").then(m => ({ default: m.TooltipBlock })), {
  loading: () => <BlockSkeleton />
})

const ProgressBarBlock = dynamic(() => import("../blocks/interactive-blocks").then(m => ({ default: m.ProgressBarBlock })), {
  loading: () => <BlockSkeleton />
})

// E-commerce blocks
const ProductCardBlock = dynamic(() => import("../blocks/ecommerce-blocks").then(m => ({ default: m.ProductCardBlock })), {
  loading: () => <BlockSkeleton />
})

const PricingTableBlock = dynamic(() => import("../blocks/ecommerce-blocks").then(m => ({ default: m.PricingTableBlock })), {
  loading: () => <BlockSkeleton />
})

const ShoppingCartBlock = dynamic(() => import("../blocks/ecommerce-blocks").then(m => ({ default: m.ShoppingCartBlock })), {
  loading: () => <BlockSkeleton />
})

// Media blocks
const ImageBlock = dynamic(() => import("../blocks/media-blocks").then(m => ({ default: m.ImageBlock })), {
  loading: () => <BlockSkeleton />
})

const VideoBlock = dynamic(() => import("../blocks/media-blocks").then(m => ({ default: m.VideoBlock })), {
  loading: () => <BlockSkeleton />
})

const GalleryBlock = dynamic(() => import("../blocks/media-blocks").then(m => ({ default: m.GalleryBlock })), {
  loading: () => <BlockSkeleton />
})

const IconBlock = dynamic(() => import("../blocks/media-blocks").then(m => ({ default: m.IconBlock })), {
  loading: () => <BlockSkeleton />
})

// Carousel blocks
const CarouselBlock = dynamic(() => import("../blocks/carousel-blocks").then(m => ({ default: m.CarouselBlock })), {
  loading: () => <BlockSkeleton />
})

const SliderBlock = dynamic(() => import("../blocks/carousel-blocks").then(m => ({ default: m.SliderBlock })), {
  loading: () => <BlockSkeleton />
})

const TabsBlock = dynamic(() => import("../blocks/carousel-blocks").then(m => ({ default: m.TabsBlock })), {
  loading: () => <BlockSkeleton />
})

// Form blocks
const ContactFormBlock = dynamic(() => import("../blocks/form-blocks").then(m => ({ default: m.ContactFormBlock })), {
  loading: () => <BlockSkeleton />
})

const NewsletterBlock = dynamic(() => import("../blocks/form-blocks").then(m => ({ default: m.NewsletterBlock })), {
  loading: () => <BlockSkeleton />
})

const RatingBlock = dynamic(() => import("../blocks/form-blocks").then(m => ({ default: m.RatingBlock })), {
  loading: () => <BlockSkeleton />
})

const PollBlock = dynamic(() => import("../blocks/form-blocks").then(m => ({ default: m.PollBlock })), {
  loading: () => <BlockSkeleton />
})

// CTA blocks
const ButtonBlock = dynamic(() => import("../blocks/cta-blocks").then(m => ({ default: m.ButtonBlock })), {
  loading: () => <BlockSkeleton />
})

const CtaSectionBlock = dynamic(() => import("../blocks/cta-blocks").then(m => ({ default: m.CtaSectionBlock })), {
  loading: () => <BlockSkeleton />
})

const BannerBlock = dynamic(() => import("../blocks/cta-blocks").then(m => ({ default: m.BannerBlock })), {
  loading: () => <BlockSkeleton />
})

const CountdownBlock = dynamic(() => import("../blocks/cta-blocks").then(m => ({ default: m.CountdownBlock })), {
  loading: () => <BlockSkeleton />
})

// Block component mapping
const blockComponents = {
  // Original blocks
  HeroBlock,
  FeaturesBlock,
  TestimonialsBlock,
  
  // Text blocks
  HeadingBlock,
  ParagraphBlock,
  QuoteBlock,
  ListBlock,
  CalloutBlock,
  
  // Layout blocks
  ContainerBlock,
  SectionBlock,
  ColumnsBlock,
  SpacerBlock,
  DividerBlock,
  CardBlock,
  
  // Advanced Layout blocks
  GridBlock,
  FlexboxBlock,
  MasonryBlock,
  StickyBlock,
  FloatingBlock,
  
  // Navigation blocks
  NavbarBlock,
  BreadcrumbBlock,
  PaginationBlock,
  TagCloudBlock,
  
  // Interactive blocks
  AccordionBlock,
  ModalBlock,
  TooltipBlock,
  ProgressBarBlock,
  
  // E-commerce blocks
  ProductCardBlock,
  PricingTableBlock,
  ShoppingCartBlock,
  
  // Media blocks
  ImageBlock,
  VideoBlock,
  GalleryBlock,
  IconBlock,
  
  // Carousel blocks
  CarouselBlock,
  SliderBlock,
  TabsBlock,
  
  // Form blocks
  ContactFormBlock,
  NewsletterBlock,
  RatingBlock,
  PollBlock,
  
  // CTA blocks
  ButtonBlock,
  CtaSectionBlock,
  BannerBlock,
  CountdownBlock
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
