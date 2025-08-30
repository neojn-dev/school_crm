import { 
  HeroGradientFloating,
  HeroSplitImage,
  HeroVideoBackground,
  HeroParallax,
  HeroParticles,
  HeroMinimal,
  HeroCards,
  HeroFullImage
} from "@/components/website-components/sections/hero-variants"
import { 
  FeatureGrid2x2,
  FeatureGrid3x3,
  FeatureGrid4x4,
  FeatureGridMasonry,
  FeatureGridStaggered,
  FeatureGridCards
} from "@/components/website-components/sections/feature-grid-variants"
import { 
  TestimonialCarousel,
  TestimonialGrid,
  TestimonialSpotlight,
  TestimonialVideo,
  TestimonialSocialWall
} from "@/components/website-components/sections/testimonial-variants"
import { 
  TeamGrid,
  TeamCarousel,
  TeamOrgChart,
  TeamLeadershipSpotlight
} from "@/components/website-components/sections/team-variants"
import { 
  StatsGrid,
  StatsCards,
  StatsBar,
  StatsCircular,
  StatsMinimal
} from "@/components/website-components/sections/stats-counters"
import { 
  ServiceCards,
  ServiceTimeline,
  ServiceProcessFlow,
  ServiceComparison,
  ServicePricingTiers,
  ServiceInteractiveDemo
} from "@/components/website-components/sections/service-showcases"
import { 
  CTABanner,
  CTAFloating,
  CTANewsletter,
  CTAContact,
  CTADownload,
  CTAVideo,
  CTASocialProof,
  CTAUrgency
} from "@/components/website-components/sections/cta-variants"
import { dummyContent } from "@/lib/dummy-content"
import { 
  Users, Award, Target, Heart, Globe, Zap, Shield, Star, TrendingUp, Clock,
  Code, Smartphone, Cloud, Database, Settings, Monitor, Cpu, Layers, CheckCircle
} from "lucide-react"

export default function ComponentShowcasePage() {
  // Sample data for all components
  const sampleFeatures = [
    { title: "Innovation", description: "Cutting-edge solutions for modern challenges", icon: <Zap className="w-6 h-6" /> },
    { title: "Excellence", description: "Uncompromising quality in everything we do", icon: <Award className="w-6 h-6" /> },
    { title: "Collaboration", description: "Working together to achieve extraordinary results", icon: <Users className="w-6 h-6" /> },
    { title: "Security", description: "Enterprise-grade security for peace of mind", icon: <Shield className="w-6 h-6" /> },
    { title: "Scalability", description: "Solutions that grow with your business", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Support", description: "24/7 dedicated support when you need it", icon: <Heart className="w-6 h-6" /> }
  ]

  const sampleStats = [
    { label: "Happy Clients", value: 500, suffix: "+", icon: <Users className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
    { label: "Projects Completed", value: 1000, suffix: "+", icon: <CheckCircle className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
    { label: "Years Experience", value: 15, suffix: "+", icon: <Clock className="w-6 h-6" />, color: "bg-purple-100 text-purple-600" },
    { label: "Team Members", value: 50, suffix: "+", icon: <Star className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-600" }
  ]

  const sampleServices = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      features: ["React/Next.js", "Node.js Backend", "Database Design", "API Integration"],
      icon: <Code className="w-6 h-6" />,
      price: "$5,000",
      duration: "4-8 weeks",
      link: "#",
      popular: false
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android", "React Native", "App Store Optimization", "Push Notifications"],
      icon: <Smartphone className="w-6 h-6" />,
      price: "$8,000",
      duration: "6-12 weeks",
      link: "#",
      popular: true
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment",
      features: ["AWS/Azure", "DevOps Setup", "Auto-scaling", "Monitoring"],
      icon: <Cloud className="w-6 h-6" />,
      price: "$3,000",
      duration: "2-6 weeks",
      link: "#",
      popular: false
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">Component Showcase</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive library of website components with various layouts, animations, and interactions. 
            Perfect for developers to reference and reuse in their projects.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Component Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Hero Sections", count: "8 variants", href: "#hero-sections" },
              { name: "Feature Grids", count: "6 layouts", href: "#feature-grids" },
              { name: "Testimonials", count: "5 styles", href: "#testimonials" },
              { name: "Team Sections", count: "4 formats", href: "#team-sections" },
              { name: "Stats Counters", count: "5 designs", href: "#stats-counters" },
              { name: "Service Showcases", count: "6 types", href: "#service-showcases" },
              { name: "CTA Sections", count: "8 variants", href: "#cta-sections" },
              { name: "All Components", count: "40+ total", href: "#all-components" }
            ].map((category, index) => (
              <a
                key={index}
                href={category.href}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border hover:border-blue-200 text-center group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Sections */}
      <section id="hero-sections" className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hero Section Variants</h2>
        </div>
        
        {/* Hero 1: Gradient Floating */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. Gradient with Floating Elements</h3>
          </div>
          <HeroGradientFloating
            eyebrow="Hero Variant 1"
            title="Gradient Floating Hero"
            subtitle="Beautiful gradients with animated elements"
            description="This hero section features stunning gradients and floating animated elements that create visual depth and engagement."
            primaryCta={{ label: "Get Started", href: "#" }}
            secondaryCta={{ label: "Learn More", href: "#" }}
          />
        </div>

        {/* Hero 2: Split Image */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. Split Layout with Image</h3>
          </div>
          <HeroSplitImage
            eyebrow="Hero Variant 2"
            title="Split Layout Hero"
            subtitle="Content and visuals in perfect harmony"
            description="A balanced layout that combines compelling content with striking visuals, perfect for showcasing your value proposition."
            primaryCta={{ label: "Explore Features", href: "#" }}
            secondaryCta={{ label: "Watch Demo", href: "#" }}
          />
        </div>

        {/* Hero 3: Minimal */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">3. Minimal Clean Design</h3>
          </div>
          <HeroMinimal
            eyebrow="Hero Variant 3"
            title="Minimal Hero Section"
            subtitle="Less is more"
            description="Clean, minimal design that focuses attention on your message without distractions."
            primaryCta={{ label: "Start Now", href: "#" }}
            secondaryCta={{ label: "View Pricing", href: "#" }}
          />
        </div>

        {/* Hero 4: Cards */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">4. Cards Layout</h3>
          </div>
          <HeroCards
            eyebrow="Hero Variant 4"
            title="Cards Hero Section"
            subtitle="Highlight key features"
            description="Showcase your main value propositions with elegant cards that provide quick insights into your offerings."
            primaryCta={{ label: "Get Started", href: "#" }}
            secondaryCta={{ label: "Learn More", href: "#" }}
          />
        </div>
      </section>

      {/* Feature Grids */}
      <section id="feature-grids" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Feature Grid Layouts</h2>
        </div>

        {/* 2x2 Grid */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. 2x2 Grid Layout</h3>
          </div>
          <FeatureGrid2x2
            eyebrow="Feature Grid"
            title="2x2 Grid Layout"
            subtitle="Perfect for highlighting key features"
            items={sampleFeatures.slice(0, 4)}
          />
        </div>

        {/* 3x3 Grid */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. 3x3 Grid Layout</h3>
          </div>
          <FeatureGrid3x3
            eyebrow="Feature Grid"
            title="3x3 Grid Layout"
            subtitle="Comprehensive feature showcase"
            items={sampleFeatures}
          />
        </div>

        {/* Staggered Layout */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">3. Staggered Layout</h3>
          </div>
          <FeatureGridStaggered
            eyebrow="Feature Grid"
            title="Staggered Layout"
            subtitle="Dynamic visual rhythm"
            items={sampleFeatures}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Testimonial Sections</h2>
        </div>

        {/* Carousel */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. Testimonial Carousel</h3>
          </div>
          <TestimonialCarousel
            eyebrow="Client Feedback"
            title="What Our Clients Say"
            subtitle="Real stories from real customers"
            testimonials={dummyContent.testimonials}
          />
        </div>

        {/* Grid */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. Testimonial Grid</h3>
          </div>
          <TestimonialGrid
            eyebrow="Success Stories"
            title="Customer Success Stories"
            subtitle="Hear from our satisfied clients"
            testimonials={dummyContent.testimonials}
          />
        </div>

        {/* Social Wall */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">3. Social Proof Wall</h3>
          </div>
          <TestimonialSocialWall
            eyebrow="Social Proof"
            title="Loved by Thousands"
            subtitle="Join our community of satisfied customers"
            testimonials={dummyContent.testimonials}
          />
        </div>
      </section>

      {/* Team Sections */}
      <section id="team-sections" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Team Showcase Formats</h2>
        </div>

        {/* Team Grid */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. Team Grid with Bios</h3>
          </div>
          <TeamGrid
            eyebrow="Our Team"
            title="Meet the Team"
            subtitle="The people behind our success"
            members={dummyContent.company.team.slice(0, 6)}
          />
        </div>

        {/* Leadership Spotlight */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. Leadership Spotlight</h3>
          </div>
          <TeamLeadershipSpotlight
            eyebrow="Leadership"
            title="Our Leaders"
            subtitle="Visionary leadership driving innovation"
            members={dummyContent.company.team.slice(0, 4)}
          />
        </div>
      </section>

      {/* Stats Counters */}
      <section id="stats-counters" className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Statistics & Counters</h2>
        </div>

        {/* Stats Grid */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. Stats Grid</h3>
          </div>
          <StatsGrid
            eyebrow="Our Impact"
            title="By the Numbers"
            subtitle="Measurable results that matter"
            stats={sampleStats}
          />
        </div>

        {/* Stats Bar */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. Stats Bar</h3>
          </div>
          <StatsBar
            eyebrow="Achievements"
            title="Our Track Record"
            subtitle="Proven success across all metrics"
            stats={sampleStats}
          />
        </div>

        {/* Stats Cards */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">3. Stats Cards</h3>
          </div>
          <StatsCards
            eyebrow="Performance"
            title="Key Metrics"
            subtitle="Data-driven results you can trust"
            stats={sampleStats}
          />
        </div>
      </section>

      {/* Service Showcases */}
      <section id="service-showcases" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Service Presentation Layouts</h2>
        </div>

        {/* Service Cards */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. Service Cards</h3>
          </div>
          <ServiceCards
            eyebrow="Our Services"
            title="What We Offer"
            subtitle="Comprehensive solutions for your needs"
            services={sampleServices}
          />
        </div>

        {/* Pricing Tiers */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. Pricing Tiers</h3>
          </div>
          <ServicePricingTiers
            eyebrow="Pricing"
            title="Choose Your Plan"
            subtitle="Flexible options for every budget"
            services={sampleServices}
          />
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">3. Process Flow</h3>
          </div>
          <ServiceProcessFlow
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A proven methodology for success"
            services={[
              {
                title: "Discovery",
                description: "Understanding your needs and goals",
                icon: <Target className="w-6 h-6" />,
                duration: "1-2 weeks"
              },
              {
                title: "Design",
                description: "Creating the perfect solution",
                icon: <Layers className="w-6 h-6" />,
                duration: "2-3 weeks"
              },
              {
                title: "Development",
                description: "Building with precision and care",
                icon: <Code className="w-6 h-6" />,
                duration: "4-8 weeks"
              },
              {
                title: "Delivery",
                description: "Launching your success",
                icon: <CheckCircle className="w-6 h-6" />,
                duration: "1 week"
              }
            ]}
          />
        </div>
      </section>

      {/* CTA Sections */}
      <section id="cta-sections" className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Call-to-Action Variants</h2>
        </div>

        {/* CTA Banner */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">1. CTA Banner</h3>
          </div>
          <CTABanner
            eyebrow="Ready to Start?"
            title="Transform Your Business Today"
            subtitle="Join thousands of satisfied customers"
            description="Take the first step towards digital transformation with our proven solutions and expert team."
            primaryCta={{ label: "Get Started Now", href: "#" }}
            secondaryCta={{ label: "Learn More", href: "#" }}
          />
        </div>

        {/* CTA Floating */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">2. Floating Card CTA</h3>
          </div>
          <CTAFloating
            eyebrow="Special Offer"
            title="Limited Time Opportunity"
            subtitle="Don't miss out on this exclusive deal"
            description="Get premium features at a fraction of the cost. This offer won't last long!"
            primaryCta={{ label: "Claim Offer", href: "#" }}
            secondaryCta={{ label: "View Details", href: "#" }}
          />
        </div>

        {/* Newsletter */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">3. Newsletter Signup</h3>
          </div>
          <CTANewsletter
            eyebrow="Stay Updated"
            title="Join Our Newsletter"
            subtitle="Get the latest insights and updates"
            description="Subscribe to receive exclusive content, industry insights, and product updates directly in your inbox."
          />
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <div className="container-custom mb-4">
            <h3 className="text-xl font-semibold text-gray-800">4. Contact Form</h3>
          </div>
          <CTAContact
            eyebrow="Get In Touch"
            title="Let's Start a Conversation"
            subtitle="Ready to discuss your project?"
            description="Contact us today to learn how we can help you achieve your goals with our expert solutions and dedicated support."
          />
        </div>
      </section>

      {/* Final CTA */}
      <CTABanner
        eyebrow="Component Library"
        title="Ready to Use These Components?"
        subtitle="Start building amazing websites today"
        description="All components are fully responsive, accessible, and ready to be customized for your specific needs."
        primaryCta={{ label: "View Documentation", href: "#" }}
        secondaryCta={{ label: "Download Components", href: "#" }}
      />
    </div>
  )
}
