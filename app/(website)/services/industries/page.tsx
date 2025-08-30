import { 
  HeroGradientFloating,
  IndustrySectorsGrid,
  IndustryMarketInsights,
  IndustryClientPortfolio,
  IndustryExpertiseMatrix,
  IndustryNewsInsights,
  ContentSplitImage,
  ContentFullWidthQuote,
  VisualInfographic,
  VisualParallaxSection,
  StatsGrid,
  TestimonialCarousel,
  CTABanner,
  CTAContact
} from "@/components/website-components/sections"
import { dummyContent } from "@/lib/dummy-content"
import { 
  Heart, 
  GraduationCap, 
  Building, 
  DollarSign, 
  Zap, 
  ShoppingCart,
  Factory,
  Plane,
  Truck,
  Wifi,
  Users,
  Award,
  Target,
  BarChart3,
  Globe,
  Shield,
  Lightbulb,
  Settings,
  TrendingUp,
  CheckCircle,
  Star
} from "lucide-react"

export default function IndustriesPage() {
  // Industry sectors data
  const industrySectors = [
    {
      name: "Healthcare & Life Sciences",
      description: "Transforming patient care through innovative digital health solutions, electronic health records, telemedicine platforms, and medical device integration.",
      icon: <Heart className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      stats: {
        clients: "50+",
        projects: "120+",
        experience: "8+"
      },
      specializations: ["EHR Systems", "Telemedicine", "Medical IoT", "HIPAA Compliance", "Clinical Analytics"],
      caseStudyLink: "#healthcare-cases",
      color: "bg-red-600"
    },
    {
      name: "Education & E-Learning",
      description: "Empowering educational institutions with learning management systems, virtual classrooms, and student information systems.",
      icon: <GraduationCap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      stats: {
        clients: "35+",
        projects: "85+",
        experience: "6+"
      },
      specializations: ["LMS Platforms", "Virtual Classrooms", "Student Portals", "Assessment Tools", "Mobile Learning"],
      caseStudyLink: "#education-cases",
      color: "bg-blue-600"
    },
    {
      name: "Government & Public Sector",
      description: "Modernizing government services with citizen portals, digital transformation initiatives, and secure public sector solutions.",
      icon: <Building className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      stats: {
        clients: "25+",
        projects: "60+",
        experience: "10+"
      },
      specializations: ["Citizen Services", "Digital Identity", "Public Safety", "Smart Cities", "Government Analytics"],
      caseStudyLink: "#government-cases",
      color: "bg-green-600"
    },
    {
      name: "Financial Services",
      description: "Securing financial futures with fintech solutions, digital banking platforms, payment systems, and regulatory compliance tools.",
      icon: <DollarSign className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      stats: {
        clients: "40+",
        projects: "95+",
        experience: "12+"
      },
      specializations: ["Digital Banking", "Payment Systems", "Risk Management", "Regulatory Compliance", "Blockchain"],
      caseStudyLink: "#finance-cases",
      color: "bg-yellow-600"
    },
    {
      name: "Energy & Utilities",
      description: "Powering the future with smart grid solutions, renewable energy management, and utility optimization systems.",
      icon: <Zap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
      stats: {
        clients: "20+",
        projects: "45+",
        experience: "7+"
      },
      specializations: ["Smart Grid", "Energy Management", "IoT Sensors", "Predictive Maintenance", "Sustainability"],
      caseStudyLink: "#energy-cases",
      color: "bg-orange-600"
    },
    {
      name: "Retail & E-Commerce",
      description: "Revolutionizing retail experiences with omnichannel platforms, inventory management, and customer engagement solutions.",
      icon: <ShoppingCart className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      stats: {
        clients: "60+",
        projects: "150+",
        experience: "9+"
      },
      specializations: ["E-commerce Platforms", "POS Systems", "Inventory Management", "Customer Analytics", "Mobile Commerce"],
      caseStudyLink: "#retail-cases",
      color: "bg-purple-600"
    },
    {
      name: "Manufacturing & Industry 4.0",
      description: "Driving industrial transformation with IoT integration, predictive maintenance, and smart manufacturing solutions.",
      icon: <Factory className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=400&fit=crop",
      stats: {
        clients: "30+",
        projects: "70+",
        experience: "8+"
      },
      specializations: ["IoT Integration", "Predictive Maintenance", "Supply Chain", "Quality Control", "Automation"],
      caseStudyLink: "#manufacturing-cases",
      color: "bg-indigo-600"
    },
    {
      name: "Transportation & Logistics",
      description: "Optimizing mobility with fleet management systems, route optimization, and supply chain visibility solutions.",
      icon: <Truck className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      stats: {
        clients: "25+",
        projects: "55+",
        experience: "6+"
      },
      specializations: ["Fleet Management", "Route Optimization", "Warehouse Management", "Tracking Systems", "Logistics Analytics"],
      caseStudyLink: "#logistics-cases",
      color: "bg-teal-600"
    },
    {
      name: "Telecommunications",
      description: "Connecting the world with network management systems, customer service platforms, and 5G infrastructure solutions.",
      icon: <Wifi className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      stats: {
        clients: "15+",
        projects: "40+",
        experience: "5+"
      },
      specializations: ["Network Management", "5G Infrastructure", "Customer Portals", "Billing Systems", "IoT Connectivity"],
      caseStudyLink: "#telecom-cases",
      color: "bg-pink-600"
    }
  ]

  // Market insights data
  const marketInsights = [
    {
      industry: "Healthcare",
      marketSize: "$350B",
      growthRate: "15.8%",
      keyTrends: [
        "Telemedicine adoption accelerating post-pandemic",
        "AI-powered diagnostic tools gaining traction",
        "Interoperability standards driving integration",
        "Patient data security becoming paramount"
      ],
      opportunities: [
        "Remote patient monitoring solutions",
        "AI-assisted medical imaging",
        "Blockchain for medical records",
        "Wearable health device integration"
      ],
      challenges: [
        "HIPAA compliance requirements",
        "Legacy system integration",
        "Data privacy and security",
        "Regulatory approval processes"
      ],
      icon: <Heart className="w-5 h-5" />,
      color: "bg-red-600"
    },
    {
      industry: "Education",
      marketSize: "$285B",
      growthRate: "12.4%",
      keyTrends: [
        "Hybrid learning models becoming standard",
        "Personalized learning through AI",
        "Microlearning and bite-sized content",
        "Virtual reality in education"
      ],
      opportunities: [
        "Adaptive learning platforms",
        "Virtual classroom technologies",
        "Student analytics and insights",
        "Mobile-first learning solutions"
      ],
      challenges: [
        "Digital divide and accessibility",
        "Teacher training and adoption",
        "Student engagement in digital formats",
        "Assessment and evaluation methods"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-blue-600"
    },
    {
      industry: "Finance",
      marketSize: "$460B",
      growthRate: "18.2%",
      keyTrends: [
        "Digital-first banking experiences",
        "Cryptocurrency and DeFi growth",
        "Open banking and API ecosystems",
        "RegTech for compliance automation"
      ],
      opportunities: [
        "Embedded finance solutions",
        "AI-powered risk assessment",
        "Blockchain for cross-border payments",
        "Robo-advisors and wealth management"
      ],
      challenges: [
        "Regulatory compliance complexity",
        "Cybersecurity threats",
        "Legacy system modernization",
        "Customer trust and adoption"
      ],
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-yellow-600"
    }
  ]

  // Client portfolio data
  const clientPortfolios = [
    {
      industry: "Healthcare",
      clients: [
        {
          name: "MedTech Solutions",
          logo: "https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=MedTech",
          project: "Telemedicine Platform Development",
          result: "300% increase in remote consultations, 45% reduction in wait times",
          testimonial: {
            quote: "The platform has revolutionized how we deliver patient care remotely.",
            author: "Dr. Sarah Chen",
            role: "Chief Medical Officer"
          }
        },
        {
          name: "Regional Hospital Network",
          logo: "https://via.placeholder.com/120x40/EF4444/FFFFFF?text=RHN",
          project: "Electronic Health Records System",
          result: "99.9% uptime, 60% faster patient data access",
          testimonial: {
            quote: "Our clinical workflows have never been more efficient.",
            author: "Mark Johnson",
            role: "IT Director"
          }
        },
        {
          name: "HealthCare Analytics Co.",
          logo: "https://via.placeholder.com/120x40/10B981/FFFFFF?text=HCA",
          project: "Clinical Data Analytics Platform",
          result: "Real-time insights, 25% improvement in patient outcomes"
        }
      ]
    },
    {
      industry: "Education",
      clients: [
        {
          name: "State University System",
          logo: "https://via.placeholder.com/120x40/8B5CF6/FFFFFF?text=SUS",
          project: "Learning Management System",
          result: "50,000+ students served, 95% satisfaction rate",
          testimonial: {
            quote: "The LMS has transformed our online learning capabilities.",
            author: "Prof. Emily Rodriguez",
            role: "Dean of Digital Learning"
          }
        },
        {
          name: "K-12 School District",
          logo: "https://via.placeholder.com/120x40/F59E0B/FFFFFF?text=K12",
          project: "Student Information System",
          result: "Streamlined administration, 40% reduction in paperwork"
        },
        {
          name: "Corporate Training Inc.",
          logo: "https://via.placeholder.com/120x40/06B6D4/FFFFFF?text=CTI",
          project: "Corporate Learning Platform",
          result: "200+ courses delivered, 85% completion rate"
        }
      ]
    },
    {
      industry: "Finance",
      clients: [
        {
          name: "Community Bank",
          logo: "https://via.placeholder.com/120x40/DC2626/FFFFFF?text=CB",
          project: "Digital Banking Platform",
          result: "2M+ transactions processed, 99.99% uptime",
          testimonial: {
            quote: "Our customers love the new digital banking experience.",
            author: "Jennifer Park",
            role: "VP of Digital Services"
          }
        },
        {
          name: "Investment Firm",
          logo: "https://via.placeholder.com/120x40/7C3AED/FFFFFF?text=IF",
          project: "Portfolio Management System",
          result: "$500M+ assets under management, real-time reporting"
        },
        {
          name: "Payment Processor",
          logo: "https://via.placeholder.com/120x40/059669/FFFFFF?text=PP",
          project: "Payment Gateway Integration",
          result: "1M+ daily transactions, 0.01% fraud rate"
        }
      ]
    }
  ]

  // Expertise matrix data
  const expertiseAreas = [
    {
      category: "Technical Expertise",
      description: "Core technology skills across platforms and frameworks",
      skills: [
        {
          name: "Cloud Architecture",
          level: 95,
          description: "AWS, Azure, GCP deployment and management",
          projects: 150
        },
        {
          name: "Data Analytics",
          level: 90,
          description: "Big data processing and business intelligence",
          projects: 120
        },
        {
          name: "Mobile Development",
          level: 88,
          description: "Native and cross-platform mobile applications",
          projects: 200
        },
        {
          name: "AI/Machine Learning",
          level: 85,
          description: "Predictive analytics and intelligent automation",
          projects: 80
        }
      ],
      icon: <Settings className="w-6 h-6" />,
      color: "bg-blue-600"
    },
    {
      category: "Industry Knowledge",
      description: "Deep understanding of sector-specific requirements",
      skills: [
        {
          name: "Regulatory Compliance",
          level: 92,
          description: "HIPAA, SOX, GDPR, and industry standards",
          projects: 100
        },
        {
          name: "Security & Privacy",
          level: 94,
          description: "Enterprise-grade security implementations",
          projects: 180
        },
        {
          name: "Integration Patterns",
          level: 89,
          description: "Legacy system modernization and API design",
          projects: 160
        },
        {
          name: "Scalability Design",
          level: 91,
          description: "High-performance, scalable system architecture",
          projects: 140
        }
      ],
      icon: <Shield className="w-6 h-6" />,
      color: "bg-green-600"
    }
  ]

  // Industry news and insights
  const industryInsights = [
    {
      title: "The Future of Healthcare Technology: Trends Shaping 2024",
      excerpt: "Explore how AI, telemedicine, and IoT are revolutionizing patient care and clinical workflows in healthcare organizations worldwide.",
      category: "Healthcare",
      author: "Dr. Michael Chen",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      tags: ["Healthcare", "AI", "Telemedicine", "IoT"],
      link: "#healthcare-trends"
    },
    {
      title: "Digital Transformation in Education: Lessons Learned",
      excerpt: "Key insights from successful digital transformation initiatives in educational institutions and the impact on student outcomes.",
      category: "Education",
      author: "Prof. Sarah Johnson",
      date: "Dec 12, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
      tags: ["Education", "Digital Transformation", "E-Learning"],
      link: "#education-transformation"
    },
    {
      title: "Fintech Innovation: The Rise of Embedded Finance",
      excerpt: "How embedded finance is changing the financial services landscape and creating new opportunities for businesses.",
      category: "Finance",
      author: "Jennifer Rodriguez",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      tags: ["Fintech", "Embedded Finance", "Innovation"],
      link: "#fintech-innovation"
    },
    {
      title: "Smart Manufacturing: Industry 4.0 Implementation Guide",
      excerpt: "A comprehensive guide to implementing Industry 4.0 technologies in manufacturing environments for improved efficiency.",
      category: "Manufacturing",
      author: "Robert Kim",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=300&fit=crop",
      tags: ["Manufacturing", "Industry 4.0", "IoT", "Automation"],
      link: "#smart-manufacturing"
    },
    {
      title: "Government Digital Services: Citizen-Centric Design",
      excerpt: "Best practices for designing digital government services that prioritize citizen experience and accessibility.",
      category: "Government",
      author: "Lisa Thompson",
      date: "Dec 5, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      tags: ["Government", "Digital Services", "UX Design"],
      link: "#government-services"
    },
    {
      title: "Retail Technology Trends: Omnichannel Excellence",
      excerpt: "How retailers are leveraging technology to create seamless omnichannel experiences and drive customer loyalty.",
      category: "Retail",
      author: "David Park",
      date: "Dec 3, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      tags: ["Retail", "Omnichannel", "Customer Experience"],
      link: "#retail-trends"
    }
  ]

  // Industry stats
  const industryStats = [
    { label: "Industries Served", value: 15, suffix: "+", icon: <Globe className="w-6 h-6" /> },
    { label: "Industry Clients", value: 300, suffix: "+", icon: <Users className="w-6 h-6" /> },
    { label: "Sector Expertise", value: 12, suffix: " Years", icon: <Award className="w-6 h-6" /> },
    { label: "Success Rate", value: 98, suffix: "%", icon: <Target className="w-6 h-6" /> }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroGradientFloating
        eyebrow="Industry Expertise"
        title="Transforming Industries Through Technology"
        subtitle="Specialized solutions for every sector"
        description="We bring deep industry knowledge and cutting-edge technology together to solve complex challenges across healthcare, education, finance, and beyond."
        primaryCta={{ label: "Explore Industries", href: "#industries" }}
        secondaryCta={{ label: "Schedule Consultation", href: "#contact" }}
      />

      {/* Industry Stats */}
      <StatsGrid
        eyebrow="Our Industry Impact"
        title="Trusted Across Sectors"
        subtitle="Numbers that reflect our cross-industry expertise and success"
        stats={industryStats}
      />

      {/* Industry Sectors Grid */}
      <IndustrySectorsGrid
        eyebrow="Industries We Serve"
        title="Comprehensive Sector Expertise"
        subtitle="From healthcare to finance, we understand the unique challenges and opportunities in each industry"
        industries={industrySectors}
      />

      {/* Market Insights Dashboard */}
      <IndustryMarketInsights
        eyebrow="Market Intelligence"
        title="Industry Trends & Insights"
        subtitle="Stay ahead with our deep market analysis and trend forecasting"
        insights={marketInsights}
      />

      {/* Client Portfolio Showcase */}
      <IndustryClientPortfolio
        eyebrow="Success Stories"
        title="Our Industry Clients"
        subtitle="Trusted by leading organizations across multiple sectors"
        portfolios={clientPortfolios}
      />

      {/* Industry Philosophy */}
      <ContentFullWidthQuote
        eyebrow="Our Approach"
        title="Industry-First, Technology-Enabled"
        subtitle="We start with understanding your industry, then apply the right technology"
        description="Our success comes from combining deep industry expertise with cutting-edge technology. We don't just build software – we solve industry-specific challenges."
        quote="Technology is most powerful when it's designed with deep understanding of the industry it serves."
        author="Michael Chen"
        authorRole="Chief Technology Officer"
        authorImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      />

      {/* Expertise Matrix */}
      <IndustryExpertiseMatrix
        eyebrow="Our Capabilities"
        title="Technical & Industry Expertise"
        subtitle="The perfect combination of technical skills and industry knowledge"
        expertiseAreas={expertiseAreas}
      />

      {/* Why Choose Us for Your Industry */}
      <ContentSplitImage
        eyebrow="Industry Specialization"
        title="Why Industry Expertise Matters"
        subtitle="The difference between generic solutions and industry success"
        description="Generic technology solutions often fail because they don't account for industry-specific regulations, workflows, and challenges. Our industry-focused approach ensures solutions that work in the real world."
        imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
        imageAlt="Industry expertise"
        primaryCta={{ label: "Discuss Your Industry", href: "#contact" }}
        secondaryCta={{ label: "View Case Studies", href: "#case-studies" }}
        features={[
          "Regulatory compliance built-in from day one",
          "Industry-specific workflows and processes",
          "Deep understanding of sector challenges",
          "Proven track record across multiple industries"
        ]}
        reversed={true}
      />

      {/* Industry News & Insights */}
      <IndustryNewsInsights
        eyebrow="Industry Insights"
        title="Latest Industry Trends & Analysis"
        subtitle="Stay informed with our expert insights and thought leadership"
        insights={industryInsights}
      />

      {/* Client Testimonials */}
      <TestimonialCarousel
        eyebrow="Client Success"
        title="What Industry Leaders Say"
        subtitle="Hear from the organizations we've helped transform"
        testimonials={dummyContent.testimonials}
      />

      {/* Industry Impact Infographic */}
      <VisualInfographic
        eyebrow="Our Industry Impact"
        title="Driving Transformation Across Sectors"
        subtitle="How our industry expertise creates value across all business dimensions"
        centerIcon={<Target className="w-12 h-12" />}
        items={[
          {
            title: "Compliance",
            description: "Built-in regulatory compliance and industry standards",
            icon: <Shield className="w-6 h-6" />,
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Innovation",
            description: "Industry-specific innovations that drive competitive advantage",
            icon: <Lightbulb className="w-6 h-6" />,
            color: "bg-purple-100 text-purple-600"
          },
          {
            title: "Efficiency",
            description: "Streamlined processes tailored to industry workflows",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "bg-blue-100 text-blue-600"
          },
          {
            title: "Growth",
            description: "Scalable solutions that support industry expansion",
            icon: <BarChart3 className="w-6 h-6" />,
            color: "bg-orange-100 text-orange-600"
          }
        ]}
      />

      {/* Parallax CTA Section */}
      <VisualParallaxSection
        eyebrow="Ready to Transform Your Industry?"
        title="Let's Discuss Your Sector-Specific Needs"
        subtitle="Every industry is unique. Let's explore yours together."
        backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop"
        content={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
            >
              Schedule Industry Consultation
            </a>
            <a
              href="#industries"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Explore All Industries
            </a>
          </div>
        }
      />

      {/* Contact CTA */}
      <CTAContact
        eyebrow="Industry Consultation"
        title="Ready to Discuss Your Industry Needs?"
        subtitle="Let's explore how we can transform your sector"
        description="Schedule a consultation with our industry experts to discuss your specific challenges, opportunities, and how we can help drive your digital transformation."
      />
    </div>
  )
}


