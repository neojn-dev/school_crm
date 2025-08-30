import { 
  HeroVideoBackground,
  HeroParallax,
  HeroFullImage
} from "@/components/website-components/sections/hero-variants"
import { 
  ServiceCards,
  ServiceTimeline,
  ServiceProcessFlow,
  ServicePricingTiers,
  ServiceInteractiveDemo
} from "@/components/website-components/sections/service-showcases"
import { 
  FeatureGrid3x3,
  FeatureGridMasonry,
  FeatureGridCards
} from "@/components/website-components/sections/feature-grid-variants"
import { 
  TestimonialGrid,
  TestimonialSocialWall
} from "@/components/website-components/sections/testimonial-variants"
import { 
  StatsCircular,
  StatsMinimal
} from "@/components/website-components/sections/stats-counters"
import { 
  CTAContact,
  CTAVideo,
  CTASocialProof
} from "@/components/website-components/sections/cta-variants"
import { dummyContent } from "@/lib/dummy-content"
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Shield, 
  Database, 
  Zap,
  Settings,
  Globe,
  Lock,
  Cpu,
  Monitor,
  Layers,
  Target,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react"

export default function ServicesOverviewPage() {
  const heroData = {
    eyebrow: "Our Services",
    title: "Comprehensive Technology Solutions",
    subtitle: "From concept to deployment",
    description: "We provide end-to-end technology services that help businesses transform, scale, and succeed in today's digital landscape.",
    primaryCta: { label: "Get Started", href: "/contact" },
    secondaryCta: { label: "View Portfolio", href: "#" }
  }

  const servicesData = {
    eyebrow: "What We Offer",
    title: "Our Core Services",
    subtitle: "Tailored solutions for your unique challenges",
    services: [
      {
        title: "Custom Software Development",
        description: "Build scalable, secure applications tailored to your business needs with cutting-edge technologies and best practices.",
        features: ["Full-stack Development", "API Integration", "Database Design", "Performance Optimization"],
        icon: <Code className="w-6 h-6" />,
        price: "From $15,000",
        duration: "8-16 weeks",
        link: "/services/development",
        popular: true
      },
      {
        title: "Mobile App Development",
        description: "Create engaging mobile experiences for iOS and Android platforms that drive user engagement and business growth.",
        features: ["Native & Cross-platform", "UI/UX Design", "App Store Optimization", "Maintenance & Support"],
        icon: <Smartphone className="w-6 h-6" />,
        price: "From $25,000",
        duration: "12-20 weeks",
        link: "/services/mobile"
      },
      {
        title: "Cloud Solutions",
        description: "Migrate to the cloud and optimize your infrastructure for scalability, security, and cost-effectiveness.",
        features: ["Cloud Migration", "DevOps Setup", "Auto-scaling", "Monitoring & Analytics"],
        icon: <Cloud className="w-6 h-6" />,
        price: "From $10,000",
        duration: "6-12 weeks",
        link: "/services/cloud"
      },
      {
        title: "Cybersecurity",
        description: "Protect your digital assets with comprehensive security solutions and proactive threat management.",
        features: ["Security Audits", "Penetration Testing", "Compliance", "24/7 Monitoring"],
        icon: <Shield className="w-6 h-6" />,
        price: "From $8,000",
        duration: "4-8 weeks",
        link: "/services/security"
      },
      {
        title: "Data Analytics",
        description: "Transform your data into actionable insights with advanced analytics and machine learning solutions.",
        features: ["Data Visualization", "Predictive Analytics", "Real-time Dashboards", "ML Models"],
        icon: <Database className="w-6 h-6" />,
        price: "From $12,000",
        duration: "6-10 weeks",
        link: "/services/analytics"
      },
      {
        title: "Digital Transformation",
        description: "Modernize your business processes and technology stack to stay competitive in the digital age.",
        features: ["Process Automation", "Legacy Modernization", "Change Management", "Training & Support"],
        icon: <Zap className="w-6 h-6" />,
        price: "Custom Quote",
        duration: "12-24 weeks",
        link: "/services/transformation"
      }
    ]
  }

  const processData = {
    eyebrow: "Our Process",
    title: "How We Work",
    subtitle: "A proven methodology for successful project delivery",
    services: [
      {
        title: "Discovery & Planning",
        description: "We start by understanding your business goals, challenges, and requirements through comprehensive analysis.",
        icon: <Target className="w-6 h-6" />,
        duration: "1-2 weeks"
      },
      {
        title: "Design & Architecture",
        description: "Our team creates detailed designs and technical architecture that align with your objectives.",
        icon: <Layers className="w-6 h-6" />,
        duration: "2-3 weeks"
      },
      {
        title: "Development & Testing",
        description: "We build your solution using best practices, with continuous testing and quality assurance.",
        icon: <Code className="w-6 h-6" />,
        duration: "4-12 weeks"
      },
      {
        title: "Deployment & Support",
        description: "We handle deployment and provide ongoing support to ensure your solution performs optimally.",
        icon: <CheckCircle className="w-6 h-6" />,
        duration: "Ongoing"
      }
    ]
  }

  const capabilitiesData = {
    eyebrow: "Our Capabilities",
    title: "Technologies We Master",
    subtitle: "Cutting-edge tools and frameworks for modern solutions",
    items: [
      { title: "Frontend Development", description: "React, Vue.js, Angular, Next.js", icon: <Monitor className="w-6 h-6" /> },
      { title: "Backend Development", description: "Node.js, Python, Java, .NET", icon: <Cpu className="w-6 h-6" /> },
      { title: "Mobile Development", description: "React Native, Flutter, Swift, Kotlin", icon: <Smartphone className="w-6 h-6" /> },
      { title: "Cloud Platforms", description: "AWS, Azure, Google Cloud, Docker", icon: <Cloud className="w-6 h-6" /> },
      { title: "Databases", description: "PostgreSQL, MongoDB, Redis, Elasticsearch", icon: <Database className="w-6 h-6" /> },
      { title: "DevOps & CI/CD", description: "Jenkins, GitLab, Kubernetes, Terraform", icon: <Settings className="w-6 h-6" /> },
      { title: "Security", description: "OAuth, JWT, SSL/TLS, Penetration Testing", icon: <Lock className="w-6 h-6" /> },
      { title: "Analytics", description: "Python, R, TensorFlow, Power BI", icon: <Target className="w-6 h-6" /> },
      { title: "API Development", description: "REST, GraphQL, gRPC, WebSocket", icon: <Globe className="w-6 h-6" /> }
    ]
  }

  const statsData = {
    eyebrow: "Our Track Record",
    title: "Proven Results",
    subtitle: "Numbers that demonstrate our commitment to excellence",
    stats: [
      { label: "Projects Delivered", value: 500, suffix: "+", icon: <CheckCircle className="w-6 h-6" /> },
      { label: "Client Satisfaction", value: 98, suffix: "%", icon: <Star className="w-6 h-6" /> },
      { label: "On-time Delivery", value: 95, suffix: "%", icon: <Clock className="w-6 h-6" /> },
      { label: "Team Members", value: 50, suffix: "+", icon: <Users className="w-6 h-6" /> }
    ]
  }

  const testimonialsData = {
    eyebrow: "Client Success Stories",
    title: "What Our Clients Say",
    subtitle: "Real feedback from successful partnerships",
    testimonials: dummyContent.testimonials
  }

  const industriesData = {
    eyebrow: "Industries We Serve",
    title: "Sector Expertise",
    subtitle: "Deep knowledge across multiple industries",
    items: dummyContent.services.industries.map((industry, index) => ({
      title: industry.name,
      description: industry.description,
      image: `https://images.unsplash.com/photo-${1551434678 + index}-e076c223a692?w=600&h=400&fit=crop`,
      link: `/services/industries/${industry.name.toLowerCase()}`
    }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - Video Background */}
      <HeroVideoBackground {...heroData} />
      
      {/* Services Overview - Cards */}
      <ServiceCards {...servicesData} />
      
      {/* Process Flow */}
      <ServiceProcessFlow {...processData} />
      
      {/* Capabilities - 3x3 Grid */}
      <FeatureGrid3x3 {...capabilitiesData} />
      
      {/* Stats Section */}
      <StatsCircular {...statsData} />
      
      {/* Industries - Masonry Grid */}
      <FeatureGridMasonry {...industriesData} />
      
      {/* Testimonials - Social Wall */}
      <TestimonialSocialWall {...testimonialsData} />
      
      {/* Pricing Tiers */}
      <ServicePricingTiers
        eyebrow="Pricing"
        title="Choose Your Plan"
        subtitle="Flexible pricing options to fit your needs"
        services={[
          {
            title: "Starter",
            description: "Perfect for small businesses and startups",
            price: "$2,999",
            features: [
              "Basic web application",
              "Responsive design",
              "3 months support",
              "Basic SEO optimization",
              "Content management"
            ],
            icon: <Target className="w-6 h-6" />,
            link: "/contact"
          },
          {
            title: "Professional",
            description: "Comprehensive solutions for growing businesses",
            price: "$9,999",
            features: [
              "Custom web application",
              "Advanced functionality",
              "6 months support",
              "Third-party integrations",
              "Training included",
              "Performance optimization"
            ],
            icon: <Star className="w-6 h-6" />,
            popular: true,
            link: "/contact"
          },
          {
            title: "Enterprise",
            description: "Tailored solutions for large organizations",
            price: "Custom",
            features: [
              "Full-scale digital transformation",
              "Custom architecture",
              "Ongoing support",
              "Dedicated team",
              "Advanced security",
              "Scalable infrastructure"
            ],
            icon: <Shield className="w-6 h-6" />,
            link: "/contact"
          }
        ]}
      />
      
      {/* Interactive Demo Section */}
      <ServiceInteractiveDemo
        eyebrow="See It In Action"
        title="Interactive Demos"
        subtitle="Experience our solutions firsthand"
        services={[
          {
            title: "E-commerce Platform",
            description: "See how our custom e-commerce solution drives sales and improves user experience.",
            icon: <Globe className="w-6 h-6" />,
            price: "Live Demo",
            link: "#demo1"
          },
          {
            title: "Analytics Dashboard",
            description: "Explore our real-time analytics dashboard with interactive data visualization.",
            icon: <Database className="w-6 h-6" />,
            price: "Interactive",
            link: "#demo2"
          },
          {
            title: "Mobile App",
            description: "Try our mobile app prototype with native performance and smooth animations.",
            icon: <Smartphone className="w-6 h-6" />,
            price: "Try Now",
            link: "#demo3"
          },
          {
            title: "Cloud Infrastructure",
            description: "See how our cloud solutions provide scalability and reliability for your business.",
            icon: <Cloud className="w-6 h-6" />,
            price: "Explore",
            link: "#demo4"
          }
        ]}
      />
      
      {/* Video CTA */}
      <CTAVideo
        eyebrow="Ready to Get Started?"
        title="Let's Build Something Amazing Together"
        subtitle="See how we can transform your business"
        description="Schedule a free consultation to discuss your project and learn how our expertise can help you achieve your goals."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Portfolio", href: "/portfolio" }}
      />
      
      {/* Contact Form */}
      <CTAContact
        eyebrow="Get In Touch"
        title="Start Your Project Today"
        subtitle="Ready to transform your business?"
        description="Contact us to discuss your project requirements and get a custom quote tailored to your needs."
      />
    </div>
  )
}