import { 
  HeroGradientFloating,
  HeroVideoBackground,
  SolutionCategoriesGrid,
  SolutionProcessFlow,
  SolutionTechnologyStack,
  SolutionCaseStudies,
  SolutionComparison,
  ContentSplitImage,
  ContentFullWidthQuote,
  InteractiveTabs,
  VisualInfographic,
  VisualParallaxSection,
  StatsGrid,
  TestimonialCarousel,
  CTABanner,
  CTAContact
} from "@/components/website-components/sections"
import { dummyContent } from "@/lib/dummy-content"
import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Globe,
  Smartphone,
  Monitor,
  Server,
  Lock,
  Rocket,
  Heart,
  Eye,
  MessageSquare,
  Settings,
  Target,
  Lightbulb,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Calendar,
  Building
} from "lucide-react"

export default function SolutionsPage() {
  // Solution categories data
  const solutionCategories = [
    {
      title: "Web Applications",
      description: "Custom web applications built with modern frameworks and scalable architecture to meet your business needs.",
      icon: <Globe className="w-6 h-6" />,
      features: [
        "Responsive design across all devices",
        "Progressive Web App (PWA) capabilities",
        "Real-time data synchronization",
        "Advanced user authentication",
        "API integrations and third-party services"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      cta: { label: "Explore Web Apps", href: "#web-apps" },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      color: "bg-blue-600"
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android.",
      icon: <Smartphone className="w-6 h-6" />,
      features: [
        "Native iOS and Android development",
        "Cross-platform React Native solutions",
        "Offline-first architecture",
        "Push notifications and real-time updates",
        "App Store optimization and deployment"
      ],
      technologies: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase"],
      cta: { label: "Explore Mobile Apps", href: "#mobile-apps" },
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      color: "bg-green-600"
    },
    {
      title: "Enterprise Software",
      description: "Scalable enterprise solutions that streamline operations and drive business growth at any scale.",
      icon: <Building className="w-6 h-6" />,
      features: [
        "Custom ERP and CRM systems",
        "Workflow automation and optimization",
        "Advanced reporting and analytics",
        "Multi-tenant architecture",
        "Enterprise-grade security and compliance"
      ],
      technologies: ["Java", "Spring Boot", ".NET", "Microservices", "Kubernetes"],
      cta: { label: "Explore Enterprise", href: "#enterprise" },
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      color: "bg-purple-600"
    },
    {
      title: "Cloud Infrastructure",
      description: "Robust cloud solutions that ensure scalability, reliability, and optimal performance for your applications.",
      icon: <Cloud className="w-6 h-6" />,
      features: [
        "Multi-cloud deployment strategies",
        "Auto-scaling and load balancing",
        "Disaster recovery and backup solutions",
        "DevOps and CI/CD pipeline setup",
        "Infrastructure as Code (IaC)"
      ],
      technologies: ["AWS", "Azure", "GCP", "Docker", "Terraform"],
      cta: { label: "Explore Cloud", href: "#cloud" },
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      color: "bg-indigo-600"
    },
    {
      title: "Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics and machine learning solutions.",
      icon: <BarChart3 className="w-6 h-6" />,
      features: [
        "Real-time data processing and visualization",
        "Machine learning model development",
        "Business intelligence dashboards",
        "Data warehouse and ETL solutions",
        "Predictive analytics and forecasting"
      ],
      technologies: ["Python", "R", "Tableau", "Power BI", "Apache Spark"],
      cta: { label: "Explore Analytics", href: "#analytics" },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      color: "bg-orange-600"
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
      icon: <Shield className="w-6 h-6" />,
      features: [
        "Security audits and penetration testing",
        "Identity and access management",
        "Encryption and data protection",
        "Compliance with GDPR, HIPAA, SOC 2",
        "24/7 security monitoring and response"
      ],
      technologies: ["OAuth", "JWT", "SSL/TLS", "SIEM", "Zero Trust"],
      cta: { label: "Explore Security", href: "#security" },
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      color: "bg-red-600"
    }
  ]

  // Process flow data
  const processFlow = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We analyze your requirements, define project scope, and create a comprehensive roadmap for success.",
      icon: <Target className="w-6 h-6" />,
      deliverables: [
        "Requirements analysis document",
        "Technical architecture design",
        "Project timeline and milestones",
        "Risk assessment and mitigation plan"
      ],
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description: "Our design team creates intuitive user experiences and interactive prototypes for validation.",
      icon: <Eye className="w-6 h-6" />,
      deliverables: [
        "User experience (UX) design",
        "User interface (UI) mockups",
        "Interactive prototypes",
        "Design system and style guide"
      ],
      duration: "2-3 weeks"
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "We build your solution using agile methodologies with continuous testing and quality assurance.",
      icon: <Code className="w-6 h-6" />,
      deliverables: [
        "Clean, maintainable code",
        "Automated testing suite",
        "Code documentation",
        "Performance optimization"
      ],
      duration: "6-12 weeks"
    },
    {
      step: 4,
      title: "Deployment & Support",
      description: "We deploy your solution and provide ongoing support to ensure optimal performance and growth.",
      icon: <Rocket className="w-6 h-6" />,
      deliverables: [
        "Production deployment",
        "Monitoring and analytics setup",
        "User training and documentation",
        "Ongoing maintenance and support"
      ],
      duration: "1 week + ongoing"
    }
  ]

  // Technology stacks data
  const technologyStacks = [
    {
      category: "Frontend",
      description: "Modern frontend technologies for building responsive and interactive user interfaces.",
      technologies: [
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          description: "Component-based library for building user interfaces",
          proficiency: 95
        },
        {
          name: "Next.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
          description: "Full-stack React framework with SSR and SSG",
          proficiency: 90
        },
        {
          name: "TypeScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          description: "Typed superset of JavaScript for better development",
          proficiency: 92
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
          description: "Utility-first CSS framework for rapid UI development",
          proficiency: 88
        }
      ]
    },
    {
      category: "Backend",
      description: "Scalable backend technologies for robust server-side applications and APIs.",
      technologies: [
        {
          name: "Node.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
          description: "JavaScript runtime for server-side development",
          proficiency: 93
        },
        {
          name: "Python",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          description: "Versatile language for web development and data science",
          proficiency: 89
        },
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          description: "Advanced open-source relational database",
          proficiency: 87
        },
        {
          name: "Redis",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
          description: "In-memory data structure store for caching",
          proficiency: 85
        }
      ]
    },
    {
      category: "Cloud & DevOps",
      description: "Cloud platforms and DevOps tools for deployment, scaling, and monitoring.",
      technologies: [
        {
          name: "AWS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
          description: "Comprehensive cloud computing platform",
          proficiency: 91
        },
        {
          name: "Docker",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
          description: "Containerization platform for application deployment",
          proficiency: 88
        },
        {
          name: "Kubernetes",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
          description: "Container orchestration for scalable deployments",
          proficiency: 82
        },
        {
          name: "GitHub Actions",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          description: "CI/CD platform for automated workflows",
          proficiency: 86
        }
      ]
    }
  ]

  // Case studies data
  const caseStudies = [
    {
      title: "E-commerce Platform Transformation",
      client: "RetailMax Inc.",
      industry: "E-commerce",
      challenge: "Legacy e-commerce platform couldn't handle growing traffic and had poor mobile experience, resulting in high cart abandonment rates.",
      solution: "Built a modern, scalable e-commerce platform with React/Next.js frontend, Node.js backend, and AWS cloud infrastructure with auto-scaling capabilities.",
      results: [
        { metric: "Page Load Speed", value: "2.1s", improvement: "65% faster" },
        { metric: "Mobile Conversion", value: "8.4%", improvement: "120% increase" },
        { metric: "Server Uptime", value: "99.9%", improvement: "40% improvement" }
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      testimonial: {
        quote: "The new platform exceeded our expectations. Our sales have increased by 150% since launch, and customer satisfaction scores are at an all-time high.",
        author: "Sarah Mitchell",
        role: "CTO, RetailMax Inc."
      },
      cta: { label: "View Full Case Study", href: "#case-study-1" }
    },
    {
      title: "Healthcare Data Analytics Platform",
      client: "MedTech Solutions",
      industry: "Healthcare",
      challenge: "Hospital network needed real-time patient data analytics to improve care quality and operational efficiency across multiple locations.",
      solution: "Developed a HIPAA-compliant analytics platform with real-time dashboards, predictive modeling, and automated reporting using Python, React, and secure cloud infrastructure.",
      results: [
        { metric: "Data Processing", value: "10M+", improvement: "Real-time insights" },
        { metric: "Operational Efficiency", value: "35%", improvement: "Cost reduction" },
        { metric: "Patient Satisfaction", value: "94%", improvement: "18% increase" }
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      testimonial: {
        quote: "This platform has revolutionized how we analyze patient data. We can now make data-driven decisions that directly improve patient outcomes.",
        author: "Dr. Michael Chen",
        role: "Chief Medical Officer, MedTech Solutions"
      },
      cta: { label: "View Full Case Study", href: "#case-study-2" }
    },
    {
      title: "Financial Services Mobile App",
      client: "SecureBank",
      industry: "Financial Services",
      challenge: "Traditional bank needed a modern mobile banking app with advanced security features to compete with fintech startups.",
      solution: "Created a feature-rich mobile banking app with biometric authentication, real-time notifications, and AI-powered financial insights using React Native and secure backend APIs.",
      results: [
        { metric: "User Adoption", value: "2.1M", improvement: "300% increase" },
        { metric: "Transaction Volume", value: "$50M", improvement: "Monthly processing" },
        { metric: "Security Incidents", value: "0", improvement: "100% secure" }
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      testimonial: {
        quote: "Our mobile app has become the primary way customers interact with our bank. The security features and user experience are industry-leading.",
        author: "Jennifer Rodriguez",
        role: "Head of Digital Banking, SecureBank"
      },
      cta: { label: "View Full Case Study", href: "#case-study-3" }
    }
  ]

  // Solution comparison data
  const solutionComparison = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups looking to establish their digital presence.",
      price: "Starting at $15K",
      features: [
        { name: "Custom Web Application", included: true },
        { name: "Responsive Design", included: true },
        { name: "Basic SEO Optimization", included: true },
        { name: "Content Management System", included: true },
        { name: "3 Months Support", included: true },
        { name: "Mobile Application", included: false },
        { name: "Advanced Analytics", included: false },
        { name: "Third-party Integrations", included: false },
        { name: "Custom API Development", included: false },
        { name: "24/7 Priority Support", included: false }
      ],
      cta: { label: "Get Started", href: "#contact" }
    },
    {
      name: "Professional",
      description: "Comprehensive solution for growing businesses that need advanced features and integrations.",
      price: "Starting at $35K",
      popular: true,
      features: [
        { name: "Custom Web Application", included: true },
        { name: "Responsive Design", included: true },
        { name: "Advanced SEO Optimization", included: true },
        { name: "Content Management System", included: true },
        { name: "6 Months Support", included: true },
        { name: "Mobile Application", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Third-party Integrations", included: true },
        { name: "Custom API Development", included: true },
        { name: "24/7 Priority Support", included: false }
      ],
      cta: { label: "Get Started", href: "#contact" }
    },
    {
      name: "Enterprise",
      description: "Full-scale solution for large organizations requiring maximum customization and support.",
      price: "Starting at $75K",
      features: [
        { name: "Custom Web Application", included: true },
        { name: "Responsive Design", included: true },
        { name: "Enterprise SEO Strategy", included: true },
        { name: "Advanced CMS with Workflows", included: true },
        { name: "12 Months Support", included: true },
        { name: "Native Mobile Applications", included: true },
        { name: "Real-time Analytics Dashboard", included: true },
        { name: "Unlimited Integrations", included: true },
        { name: "Microservices Architecture", included: true },
        { name: "24/7 Priority Support", included: true }
      ],
      cta: { label: "Contact Sales", href: "#contact" }
    }
  ]

  // Stats data
  const solutionStats = [
    { label: "Solutions Delivered", value: 200, suffix: "+", icon: <Rocket className="w-6 h-6" /> },
    { label: "Client Satisfaction", value: 98, suffix: "%", icon: <Heart className="w-6 h-6" /> },
    { label: "Technologies Mastered", value: 50, suffix: "+", icon: <Code className="w-6 h-6" /> },
    { label: "Years of Experience", value: 15, suffix: "+", icon: <Award className="w-6 h-6" /> }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroGradientFloating
        eyebrow="Our Solutions"
        title="Tailored Technology Solutions"
        subtitle="Transforming ideas into powerful digital experiences"
        description="We create custom software solutions that drive business growth, enhance user experiences, and solve complex challenges with cutting-edge technology."
        primaryCta={{ label: "Explore Solutions", href: "#solutions" }}
        secondaryCta={{ label: "Schedule Consultation", href: "#contact" }}
      />

      {/* Solution Stats */}
      <StatsGrid
        eyebrow="Our Impact"
        title="Delivering Excellence at Scale"
        subtitle="Numbers that reflect our commitment to quality and innovation"
        stats={solutionStats}
      />

      {/* Solution Categories */}
      <SolutionCategoriesGrid
        eyebrow="Our Expertise"
        title="Comprehensive Solution Portfolio"
        subtitle="From web applications to enterprise software, we cover the full spectrum of digital solutions"
        categories={solutionCategories}
      />

      {/* Process Flow */}
      <SolutionProcessFlow
        eyebrow="Our Process"
        title="How We Deliver Success"
        subtitle="A proven methodology that ensures quality, efficiency, and client satisfaction"
        processes={processFlow}
      />

      {/* Technology Stack */}
      <SolutionTechnologyStack
        eyebrow="Our Technology"
        title="Cutting-Edge Technology Stack"
        subtitle="We leverage the latest technologies to build robust, scalable, and future-proof solutions"
        stacks={technologyStacks}
      />

      {/* Case Studies */}
      <SolutionCaseStudies
        eyebrow="Success Stories"
        title="Real Results for Real Businesses"
        subtitle="Discover how we've helped organizations transform their operations and achieve their goals"
        caseStudies={caseStudies}
      />

      {/* Solution Philosophy */}
      <ContentFullWidthQuote
        eyebrow="Our Philosophy"
        title="Technology That Serves Your Vision"
        subtitle="We believe in creating solutions that empower businesses and delight users"
        description="Our approach combines technical excellence with deep business understanding to deliver solutions that not only meet your current needs but also scale with your future growth."
        quote="The best technology is invisible – it just works, enabling people to focus on what matters most."
        author="Michael Chen"
        authorRole="Chief Technology Officer"
        authorImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      />

      {/* Solution Comparison */}
      <SolutionComparison
        eyebrow="Choose Your Solution"
        title="Find the Perfect Fit"
        subtitle="Compare our solution packages to find the one that best matches your needs and budget"
        solutions={solutionComparison}
      />

      {/* Why Choose Us */}
      <ContentSplitImage
        eyebrow="Why Choose Us"
        title="Your Trusted Technology Partner"
        subtitle="15+ years of delivering exceptional solutions"
        description="We combine deep technical expertise with a client-first approach to deliver solutions that exceed expectations. Our team of experienced developers, designers, and strategists work collaboratively to ensure your success."
        imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
        imageAlt="Our team collaboration"
        primaryCta={{ label: "Meet Our Team", href: "/company/leadership" }}
        secondaryCta={{ label: "View Our Work", href: "#case-studies" }}
        features={[
          "Agile development methodology for faster delivery",
          "24/7 support and maintenance services",
          "Scalable architecture designed for growth",
          "Security-first approach with industry best practices"
        ]}
        reversed={true}
      />

      {/* Client Testimonials */}
      <TestimonialCarousel
        eyebrow="Client Testimonials"
        title="What Our Clients Say"
        subtitle="Hear from the businesses we've helped transform"
        testimonials={dummyContent.testimonials}
      />

      {/* Impact Infographic */}
      <VisualInfographic
        eyebrow="Our Impact"
        title="Driving Digital Transformation"
        subtitle="How our solutions create value across all business dimensions"
        centerIcon={<Target className="w-12 h-12" />}
        items={[
          {
            title: "Innovation",
            description: "Cutting-edge solutions that drive competitive advantage",
            icon: <Lightbulb className="w-6 h-6" />,
            color: "bg-purple-100 text-purple-600"
          },
          {
            title: "Efficiency",
            description: "Streamlined processes that reduce costs and save time",
            icon: <Zap className="w-6 h-6" />,
            color: "bg-yellow-100 text-yellow-600"
          },
          {
            title: "Growth",
            description: "Scalable platforms that support business expansion",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Security",
            description: "Enterprise-grade security protecting your digital assets",
            icon: <Shield className="w-6 h-6" />,
            color: "bg-red-100 text-red-600"
          }
        ]}
      />

      {/* Parallax CTA Section */}
      <VisualParallaxSection
        eyebrow="Ready to Transform?"
        title="Let's Build Something Amazing Together"
        subtitle="Start your digital transformation journey today"
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
        content={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
            >
              Start Your Project
            </a>
            <a
              href="#solutions"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Explore Solutions
            </a>
          </div>
        }
      />

      {/* Contact CTA */}
      <CTAContact
        eyebrow="Get Started Today"
        title="Ready to Discuss Your Project?"
        subtitle="Let's turn your vision into reality"
        description="Schedule a free consultation to discuss your requirements, explore solutions, and discover how we can help you achieve your business goals."
      />
    </div>
  )
}


