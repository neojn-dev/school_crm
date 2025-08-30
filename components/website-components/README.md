# Website Components Library

A comprehensive collection of modern, responsive, and accessible website components built with React, TypeScript, Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **40+ Components** across 8 different categories
- **Fully Responsive** - Works perfectly on all devices
- **Accessible** - Built with accessibility best practices
- **Animated** - Smooth animations and micro-interactions
- **Customizable** - Easy to customize colors, spacing, and content
- **TypeScript** - Full type safety and IntelliSense support
- **Modern Stack** - Built with the latest web technologies

## 📦 Component Categories

### 1. Hero Sections (8 variants)
- **HeroGradientFloating** - Gradient background with floating animated elements
- **HeroSplitImage** - Split layout with content and image
- **HeroVideoBackground** - Full-screen video background
- **HeroParallax** - Parallax scrolling effects
- **HeroParticles** - Interactive particle animation
- **HeroMinimal** - Clean, minimal design
- **HeroCards** - Hero with feature cards
- **HeroFullImage** - Full-screen image with overlay

### 2. Feature Grids (6 layouts)
- **FeatureGrid2x2** - Classic 2x2 grid layout
- **FeatureGrid3x3** - Comprehensive 3x3 grid
- **FeatureGrid4x4** - Compact 4x4 grid
- **FeatureGridMasonry** - Pinterest-style masonry layout
- **FeatureGridStaggered** - Staggered layout with visual rhythm
- **FeatureGridCards** - Card-based layout with images

### 3. Testimonials (5 styles)
- **TestimonialCarousel** - Auto-playing carousel with navigation
- **TestimonialGrid** - Grid layout for multiple testimonials
- **TestimonialSpotlight** - Single featured testimonial
- **TestimonialVideo** - Video testimonials with play buttons
- **TestimonialSocialWall** - Social proof wall with stats

### 4. Team Sections (4 formats)
- **TeamGrid** - Grid layout with bios and social links
- **TeamCarousel** - Scrolling team member carousel
- **TeamOrgChart** - Organizational chart layout
- **TeamLeadershipSpotlight** - Leadership team showcase

### 5. Statistics & Counters (5 designs)
- **StatsGrid** - Simple grid with animated counters
- **StatsCards** - Card-based stats with icons
- **StatsBar** - Horizontal bar layout
- **StatsCircular** - Circular progress indicators
- **StatsMinimal** - Minimal line-based layout

### 6. Service Showcases (6 types)
- **ServiceCards** - Card-based service presentation
- **ServiceTimeline** - Timeline-based process flow
- **ServiceProcessFlow** - Step-by-step process visualization
- **ServiceComparison** - Comparison table layout
- **ServicePricingTiers** - Pricing tier cards
- **ServiceInteractiveDemo** - Interactive demo sections

### 7. Call-to-Action (8 variants)
- **CTABanner** - Full-width banner CTA
- **CTAFloating** - Floating card CTA
- **CTANewsletter** - Newsletter signup form
- **CTAContact** - Contact form with info
- **CTADownload** - Resource download CTA
- **CTAVideo** - Video demo CTA
- **CTASocialProof** - CTA with social proof
- **CTAUrgency** - Limited time offer CTA

## 🛠 Installation & Usage

### Prerequisites
- Next.js 13+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)

### Basic Usage

```tsx
import { HeroGradientFloating, FeatureGrid2x2, CTABanner } from '@/components/website-components/sections'

export default function HomePage() {
  return (
    <div>
      <HeroGradientFloating
        eyebrow="Welcome"
        title="Build Amazing Websites"
        subtitle="With our component library"
        description="Get started with our comprehensive collection of modern website components."
        primaryCta={{ label: "Get Started", href: "/get-started" }}
        secondaryCta={{ label: "View Demo", href: "/demo" }}
      />
      
      <FeatureGrid2x2
        eyebrow="Features"
        title="Why Choose Us"
        subtitle="Everything you need to succeed"
        items={[
          {
            title: "Fast Performance",
            description: "Optimized for speed and performance",
            icon: <ZapIcon className="w-6 h-6" />
          },
          // ... more items
        ]}
      />
      
      <CTABanner
        title="Ready to Get Started?"
        description="Join thousands of developers using our components"
        primaryCta={{ label: "Start Building", href: "/start" }}
      />
    </div>
  )
}
```

### Component Props

All components follow consistent prop patterns:

```tsx
interface BaseComponentProps {
  eyebrow?: string        // Small text above title
  title?: string          // Main heading
  subtitle?: string       // Subheading
  description?: string    // Description text
  primaryCta?: {          // Primary call-to-action
    label: string
    href: string
  }
  secondaryCta?: {        // Secondary call-to-action
    label: string
    href: string
  }
}
```

### Customization

#### Colors
Components use Tailwind CSS classes and can be customized by modifying the color classes:

```tsx
// Change primary color from blue to purple
className="bg-blue-600 hover:bg-blue-700"
// becomes
className="bg-purple-600 hover:bg-purple-700"
```

#### Animations
Framer Motion animations can be customized by modifying the motion props:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

#### Responsive Design
All components are responsive by default using Tailwind's responsive prefixes:

```tsx
className="text-lg lg:text-xl"  // Larger text on large screens
className="grid md:grid-cols-2 lg:grid-cols-3"  // Responsive grid
```

## 📱 Responsive Breakpoints

Components are optimized for these breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

## 🎨 Design System

### Typography Scale
- **Eyebrow**: text-xs (12px)
- **Body**: text-base (16px)
- **Large**: text-lg (18px)
- **H3**: text-xl (20px)
- **H2**: text-2xl to text-3xl (24px-30px)
- **H1**: text-4xl to text-6xl (36px-60px)

### Color Palette
- **Primary**: Blue (blue-600, blue-700)
- **Secondary**: Purple (purple-600, purple-700)
- **Success**: Green (green-500, green-600)
- **Warning**: Yellow (yellow-400, yellow-500)
- **Error**: Red (red-500, red-600)
- **Neutral**: Gray (gray-50 to gray-900)

### Spacing System
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)
- **2xl**: 4rem (64px)

## 🔧 Advanced Usage

### Custom Animations
Create custom animations using Framer Motion:

```tsx
const customVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

<motion.div
  variants={customVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Your content */}
</motion.div>
```

### Custom Hooks
Useful hooks for component functionality:

```tsx
// Animated counter hook
const counterRef = useAnimatedCounter(1000, 2000) // value, duration

// Intersection observer hook
const { ref, inView } = useInView({ threshold: 0.1 })
```

### Performance Optimization
- Use `viewport={{ once: true }}` for animations that should only trigger once
- Implement lazy loading for images using Next.js Image component
- Use `React.memo()` for components that don't need frequent re-renders

## 📖 Examples

### Complete Landing Page
```tsx
import {
  HeroGradientFloating,
  FeatureGrid3x3,
  TestimonialCarousel,
  StatsBar,
  CTABanner
} from '@/components/website-components/sections'

export default function LandingPage() {
  return (
    <>
      <HeroGradientFloating {...heroData} />
      <FeatureGrid3x3 {...featuresData} />
      <StatsBar {...statsData} />
      <TestimonialCarousel {...testimonialsData} />
      <CTABanner {...ctaData} />
    </>
  )
}
```

### About Page
```tsx
import {
  HeroSplitImage,
  TeamGrid,
  StatsCards,
  CTAFloating
} from '@/components/website-components/sections'

export default function AboutPage() {
  return (
    <>
      <HeroSplitImage {...aboutHeroData} />
      <StatsCards {...companyStatsData} />
      <TeamGrid {...teamData} />
      <CTAFloating {...joinTeamCTA} />
    </>
  )
}
```

## 🚀 Demo Pages

Visit these pages to see all components in action:
- `/company/about` - Complete about page with multiple components
- `/services/overview` - Services page showcasing various layouts
- `/company/showcase` - Comprehensive component showcase

## 🤝 Contributing

1. Follow the existing component structure
2. Ensure TypeScript types are properly defined
3. Add responsive design considerations
4. Include accessibility features
5. Test on multiple devices and browsers
6. Update documentation for new components

## 📄 License

This component library is part of the Next.js template project and follows the same licensing terms.

## 🆘 Support

For questions, issues, or feature requests:
1. Check the component showcase page for examples
2. Review the TypeScript definitions for prop details
3. Test components in isolation before integration
4. Ensure all dependencies are properly installed

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion**