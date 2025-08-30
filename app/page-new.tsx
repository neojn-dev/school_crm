import { 
  // Hero Variants (10 total)
  HeroSection,
  HeroGradientFloating,
  HeroSplitImage,
  HeroVideoBackground,
  HeroParallax,
  HeroParticles,
  HeroMinimal,
  HeroCards,
  HeroInteractive3D,
  HeroMorphingShapes,
  
  // Feature Grids (10 variations)
  FeatureGrid,
  FeatureGrid2x2,
  FeatureGrid3x3,
  FeatureGrid4x4,
  FeatureGridMasonry,
  FeatureGridStaggered,
  FeatureGridHexagon,
  FeatureGridFloating,
  FeatureGridCircular,
  FeatureGridTimeline,
  
  // Testimonials (5 variations)
  TestimonialCarousel,
  TestimonialGrid,
  TestimonialSpotlight,
  TestimonialVideo,
  TestimonialSocialProof,
  
  // Team Sections (4 variations)
  TeamGrid,
  TeamCarousel,
  TeamOrgChart,
  TeamLeadershipSpotlight,
  
  // Stats Sections (5 variations)
  StatsGrid,
  StatsCards,
  StatsCircular,
  StatsComparison,
  StatsTimeline,
  
  // Service Showcases (6 variations)
  ServiceCards,
  ServiceTimeline,
  ServiceProcessFlow,
  ServiceComparison,
  ServicePricingTiers,
  ServiceInteractiveDemo,
  
  // CTA Variants (8 variations)
  CTABanner,
  CTAFloating,
  CTAInline,
  CTANewsletter,
  CTAContact,
  CTADownload,
  CTAVideo,
  CTASocialProof,
  
  // Content Sections (5 variations)
  ContentSplitImage,
  ContentFullWidthQuote,
  ContentImageTextGrid,
  ContentVideoText,
  ContentMultiColumn,
  
  // Interactive Elements (5 variations)
  InteractiveTabs,
  InteractiveAccordion,
  InteractiveTimeline,
  InteractiveHoverCards,
  InteractiveProgress,
  
  // Visual Elements (5 variations)
  VisualImageGallery,
  VisualBeforeAfter,
  VisualInfographic,
  VisualFloatingCards,
  VisualParallaxSection
} from "@/components/website-components/sections"
import { dummyContent } from "@/lib/dummy-content"
import { 
  Rocket, 
  Shield, 
  Zap, 
  Star, 
  Users, 
  Award, 
  Target, 
  Globe, 
  Heart, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Eye, 
  BarChart3, 
  Settings, 
  Diamond, 
  Sparkles, 
  Crown, 
  Gift, 
  Flame,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Share,
  Bookmark,
  ThumbsUp,
  Coffee,
  Briefcase,
  Code,
  Palette,
  Camera,
  Music,
  Video,
  Headphones,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Watch,
  Gamepad2,
  Car,
  Plane,
  Ship,
  Train,
  Bike,
  Home,
  Building,
  Store,
  Factory,
  School,
  Hospital,
  Bank,
  Library,
  Church,
  Compass,
  Map,
  Navigation,
  Route,
  Flag,
  Bookmark as BookmarkIcon,
  Tag,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Bitcoin,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  AreaChart
} from "lucide-react"

export default function HomePage() {
  // Comprehensive data for all components
  const heroData = {
    eyebrow: "Ultimate Component Library",
    title: "Build Stunning Websites with 100+ Components",
    subtitle: "The most comprehensive collection of modern web components",
    description: "From heroes to CTAs, testimonials to interactive elements - everything you need to create amazing websites with beautiful animations and responsive design.",
    primaryCta: { label: "Explore Components", href: "/company/showcase" },
    secondaryCta: { label: "View Documentation", href: "/docs" }
  }

  const featureData = [
    { title: "Performance First", description: "Optimized for speed, SEO, and Core Web Vitals with lazy loading and efficient animations.", icon: <Zap className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-600", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
    { title: "Secure by Default", description: "Built-in security best practices, authentication, and data protection measures.", icon: <Shield className="w-6 h-6" />, color: "bg-green-100 text-green-600", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop" },
    { title: "Developer Experience", description: "Clean code, TypeScript support, and excellent documentation for rapid development.", icon: <Code className="w-6 h-6" />, color: "bg-blue-100 text-blue-600", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop" },
    { title: "Modern Design", description: "Beautiful UI components with smooth animations and contemporary aesthetics.", icon: <Palette className="w-6 h-6" />, color: "bg-purple-100 text-purple-600", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
    { title: "Mobile Responsive", description: "Fully responsive design that works perfectly on all devices and screen sizes.", icon: <Smartphone className="w-6 h-6" />, color: "bg-pink-100 text-pink-600", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" },
    { title: "Accessibility Ready", description: "WCAG compliant components with proper ARIA labels and keyboard navigation.", icon: <Eye className="w-6 h-6" />, color: "bg-indigo-100 text-indigo-600", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop" },
    { title: "Analytics Integration", description: "Built-in analytics tracking and performance monitoring capabilities.", icon: <BarChart3 className="w-6 h-6" />, color: "bg-teal-100 text-teal-600", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
    { title: "Customizable Themes", description: "Easy theme customization with CSS variables and Tailwind configuration.", icon: <Settings className="w-6 h-6" />, color: "bg-orange-100 text-orange-600", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop" },
    { title: "Premium Support", description: "Dedicated support team and comprehensive documentation for all components.", icon: <Heart className="w-6 h-6" />, color: "bg-red-100 text-red-600", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop" },
    { title: "Regular Updates", description: "Continuous improvements, new components, and feature updates every month.", icon: <TrendingUp className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-600", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop" },
    { title: "Global CDN", description: "Lightning-fast delivery through global content delivery network infrastructure.", icon: <Globe className="w-6 h-6" />, color: "bg-cyan-100 text-cyan-600", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop" },
    { title: "24/7 Monitoring", description: "Continuous uptime monitoring and automatic scaling for peak performance.", icon: <Clock className="w-6 h-6" />, color: "bg-violet-100 text-violet-600", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop" }
  ]

  const statsData = [
    { label: "Components", value: 100, suffix: "+", icon: <Diamond className="w-6 h-6" /> },
    { label: "Happy Clients", value: 10000, suffix: "+", icon: <Users className="w-6 h-6" /> },
    { label: "Projects Built", value: 50000, suffix: "+", icon: <Rocket className="w-6 h-6" /> },
    { label: "Countries", value: 150, suffix: "+", icon: <Globe className="w-6 h-6" /> },
    { label: "Lines of Code", value: 1000000, suffix: "+", icon: <Code className="w-6 h-6" /> },
    { label: "GitHub Stars", value: 25000, suffix: "+", icon: <Star className="w-6 h-6" /> }
  ]

  return (
    <div className="flex flex-col">
      {/* 10 Hero Variations */}
      <HeroSection
        eyebrow={heroData.eyebrow}
        title={heroData.title}
        subtitle={heroData.subtitle}
        description={heroData.description}
        primaryCta={heroData.primaryCta}
        secondaryCta={heroData.secondaryCta}
      />

      <HeroGradientFloating
        eyebrow="Innovation Meets Design"
        title="Transform Your Digital Presence"
        subtitle="Next-generation web solutions"
        description="Experience the future of web development with our cutting-edge component library featuring stunning animations and modern design patterns."
        primaryCta={{ label: "Start Building", href: "/get-started" }}
        secondaryCta={{ label: "View Demo", href: "/demo" }}
      />

      <HeroSplitImage
        eyebrow="Visual Excellence"
        title="Design That Speaks Volumes"
        subtitle="Where creativity meets functionality"
        description="Our components combine beautiful aesthetics with powerful functionality to create websites that not only look amazing but perform exceptionally."
        primaryCta={{ label: "Explore Gallery", href: "/gallery" }}
        secondaryCta={{ label: "Contact Designer", href: "/contact" }}
      />

      <HeroVideoBackground
        eyebrow="Dynamic Experiences"
        title="Bring Your Vision to Life"
        subtitle="Interactive web experiences"
        description="Create immersive user experiences with our video-enhanced components and dynamic animations that captivate and engage your audience."
        primaryCta={{ label: "Watch Demo", href: "/video-demo" }}
        secondaryCta={{ label: "Learn More", href: "/features" }}
      />

      <HeroParallax
        eyebrow="Depth & Motion"
        title="Parallax Perfection"
        subtitle="Multi-layered visual storytelling"
        description="Add depth and dimension to your websites with our parallax components that create engaging scrolling experiences and visual narratives."
        primaryCta={{ label: "See Examples", href: "/parallax-examples" }}
        secondaryCta={{ label: "Get Started", href: "/start" }}
      />

      <HeroParticles
        eyebrow="Interactive Magic"
        title="Particle-Powered Interfaces"
        subtitle="Dynamic background animations"
        description="Enhance your user interface with mesmerizing particle effects and interactive animations that respond to user interactions."
        primaryCta={{ label: "Try Interactive Demo", href: "/interactive" }}
        secondaryCta={{ label: "View Code", href: "/code-examples" }}
      />

      <HeroMinimal
        eyebrow="Clean & Simple"
        title="Minimalist Excellence"
        subtitle="Less is more"
        description="Sometimes the most powerful designs are the simplest. Our minimal components focus on content and user experience above all else."
        primaryCta={{ label: "Explore Minimal", href: "/minimal" }}
        secondaryCta={{ label: "Design Philosophy", href: "/philosophy" }}
      />

      <HeroCards
        eyebrow="Modular Design"
        title="Card-Based Layouts"
        subtitle="Flexible content organization"
        description="Organize your content beautifully with our card-based hero components that adapt to any content type and screen size."
        primaryCta={{ label: "Browse Cards", href: "/cards" }}
        secondaryCta={{ label: "Customization Guide", href: "/customize" }}
      />

      <HeroInteractive3D
        eyebrow="3D Innovation"
        title="Three-Dimensional Web"
        subtitle="Next-level user interaction"
        description="Step into the future with 3D interactive elements that provide immersive user experiences and cutting-edge visual appeal."
        primaryCta={{ label: "Experience 3D", href: "/3d-demo" }}
        secondaryCta={{ label: "Technical Details", href: "/3d-tech" }}
      />

      <HeroMorphingShapes
        eyebrow="Fluid Animations"
        title="Morphing Visual Elements"
        subtitle="Dynamic shape transformations"
        description="Captivate your audience with fluid, morphing animations that create organic and engaging visual experiences throughout your website."
        primaryCta={{ label: "See Morphing Demo", href: "/morphing" }}
        secondaryCta={{ label: "Animation Library", href: "/animations" }}
      />

      {/* 10 Feature Grid Variations */}
      <FeatureGrid
        eyebrow="Core Features"
        title="Everything You Need"
        items={featureData.slice(0, 6)}
      />

      <FeatureGrid2x2
        eyebrow="Essential Tools"
        title="Foundation Features"
        features={featureData.slice(0, 4)}
      />

      <FeatureGrid3x3
        eyebrow="Complete Suite"
        title="Comprehensive Solutions"
        features={featureData.slice(0, 9)}
      />

      <FeatureGrid4x4
        eyebrow="Full Spectrum"
        title="All-in-One Platform"
        features={featureData}
      />

      <FeatureGridMasonry
        eyebrow="Dynamic Layout"
        title="Masonry Grid Features"
        features={featureData.slice(0, 8)}
      />

      <FeatureGridStaggered
        eyebrow="Animated Reveal"
        title="Staggered Animation Grid"
        features={featureData.slice(0, 6)}
      />

      <FeatureGridHexagon
        eyebrow="Geometric Design"
        title="Hexagonal Layout"
        features={featureData.slice(0, 6)}
      />

      <FeatureGridFloating
        eyebrow="3D Effects"
        title="Floating Card Grid"
        features={featureData.slice(0, 9)}
      />

      <FeatureGridCircular
        eyebrow="Radial Layout"
        title="Circular Feature Display"
        features={featureData.slice(0, 6)}
      />

      <FeatureGridTimeline
        eyebrow="Process Flow"
        title="Timeline Feature Layout"
        features={featureData.slice(0, 6)}
      />

      {/* 5 Stats Variations */}
      <StatsGrid
        eyebrow="By the Numbers"
        title="Impressive Statistics"
        subtitle="See the impact we've made across the globe"
        stats={statsData}
      />

      <StatsCards
        eyebrow="Achievement Metrics"
        title="Our Success Story"
        subtitle="Numbers that speak to our commitment to excellence"
        stats={statsData.slice(0, 4)}
      />

      <StatsCircular
        eyebrow="Progress Indicators"
        title="Circular Progress Stats"
        subtitle="Visual representation of our growth and achievements"
        stats={statsData.slice(0, 4)}
      />

      <StatsComparison
        eyebrow="Before vs After"
        title="Transformation Metrics"
        subtitle="See the dramatic improvements we deliver"
        stats={statsData.slice(0, 4)}
      />

      <StatsTimeline
        eyebrow="Growth Journey"
        title="Timeline of Success"
        subtitle="Our evolution through the years"
        stats={statsData.slice(0, 5)}
      />

      {/* Final CTA */}
      <CTABanner
        eyebrow="Ready to Get Started?"
        title="Transform Your Digital Presence Today"
        subtitle="Join thousands of satisfied customers"
        description="Don't let your competition get ahead. Start building your amazing website with our comprehensive component library and expert support."
        primaryCta={{ label: "Get Started Now", href: "/get-started" }}
        secondaryCta={{ label: "Schedule Demo", href: "/demo" }}
      />
    </div>
  )
}
