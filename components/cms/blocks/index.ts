// Export all CMS blocks and their configurations
export { HeroBlock, heroBlockConfig } from './hero-block'
export { FeaturesBlock, featuresBlockConfig } from './features-block'
export { TestimonialsBlock, testimonialsBlockConfig } from './testimonials-block'

// Block registry for dynamic rendering
export const blockRegistry = {
  HeroBlock: {
    component: () => import('./hero-block').then(m => m.HeroBlock),
    config: () => import('./hero-block').then(m => m.heroBlockConfig)
  },
  FeaturesBlock: {
    component: () => import('./features-block').then(m => m.FeaturesBlock),
    config: () => import('./features-block').then(m => m.featuresBlockConfig)
  },
  TestimonialsBlock: {
    component: () => import('./testimonials-block').then(m => m.TestimonialsBlock),
    config: () => import('./testimonials-block').then(m => m.testimonialsBlockConfig)
  }
}

// All available block configurations
export const allBlockConfigs = [
  {
    name: "Hero Section",
    type: "hero",
    category: "layout",
    description: "A prominent hero section with title, description, and call-to-action buttons",
    component: "HeroBlock",
    previewImage: "/cms/previews/hero-block.jpg"
  },
  {
    name: "Features Section", 
    type: "features",
    category: "content",
    description: "Showcase key features with icons, titles, and descriptions",
    component: "FeaturesBlock",
    previewImage: "/cms/previews/features-block.jpg"
  },
  {
    name: "Testimonials Section",
    type: "testimonials", 
    category: "content",
    description: "Display customer testimonials with ratings and author information",
    component: "TestimonialsBlock",
    previewImage: "/cms/previews/testimonials-block.jpg"
  }
]

// Block categories for organization
export const blockCategories = [
  {
    id: "layout",
    name: "Layout",
    description: "Structural components for page layout"
  },
  {
    id: "content",
    name: "Content",
    description: "Content-focused components"
  },
  {
    id: "media",
    name: "Media",
    description: "Image and video components"
  },
  {
    id: "forms",
    name: "Forms",
    description: "Form and input components"
  },
  {
    id: "navigation",
    name: "Navigation", 
    description: "Navigation and menu components"
  }
]
