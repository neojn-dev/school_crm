import { 
  HeroGradientFloating,
  HeroVideoBackground,
  HeroParallax,
  LeadershipExecutiveProfiles,
  LeadershipOrgChart,
  LeadershipVisionStrategy,
  LeadershipJourneyTimeline,
  LeadershipQuotesCarousel,
  ContentSplitImage,
  ContentFullWidthQuote,
  InteractiveTabs,
  InteractiveTimeline,
  VisualInfographic,
  VisualParallaxSection,
  StatsGrid,
  TestimonialSpotlight,
  CTABanner
} from "@/components/website-components/sections"
import { dummyContent } from "@/lib/dummy-content"
import { 
  Users, 
  Award, 
  Target, 
  TrendingUp, 
  Globe, 
  Heart, 
  Lightbulb, 
  Shield,
  Star,
  Zap,
  Calendar,
  Building
} from "lucide-react"

export default function LeadershipPage() {
  // Leadership data
  const executiveLeaders = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Visionary leader with 15+ years of experience in technology and business transformation.",
      achievements: [
        "Led company growth from startup to $50M revenue",
        "Named Tech CEO of the Year 2023",
        "Successfully raised $25M in Series B funding",
        "Expanded operations to 15+ countries"
      ],
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        email: "sarah@company.com"
      },
      experience: "15+ Years",
      education: "MBA from Stanford, BS Computer Science from MIT",
      specialties: ["Strategic Planning", "Digital Transformation", "Team Leadership", "Innovation"]
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Technology innovator passionate about building scalable solutions and leading high-performance teams.",
      achievements: [
        "Architected platform serving 1M+ users",
        "Led digital transformation for Fortune 500 clients",
        "Published 15+ technical papers",
        "Built and scaled engineering team to 50+ developers"
      ],
      social: {
        linkedin: "https://linkedin.com/in/michaelchen",
        email: "michael@company.com"
      },
      experience: "12+ Years",
      education: "PhD Computer Science from Carnegie Mellon",
      specialties: ["Software Architecture", "AI/ML", "Cloud Computing", "DevOps"]
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Operations expert focused on scaling businesses and optimizing processes for maximum efficiency.",
      achievements: [
        "Improved operational efficiency by 40%",
        "Streamlined processes across 5 departments",
        "Led successful international expansion",
        "Implemented company-wide digital transformation"
      ],
      social: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        email: "emily@company.com"
      },
      experience: "10+ Years",
      education: "MBA from Wharton, BS Industrial Engineering",
      specialties: ["Operations Management", "Process Optimization", "International Expansion", "Change Management"]
    },
    {
      name: "David Kim",
      role: "Chief Financial Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Financial strategist with expertise in scaling technology companies and managing complex financial operations.",
      achievements: [
        "Managed $100M+ in annual revenue",
        "Led 3 successful funding rounds",
        "Implemented financial systems for global operations",
        "Achieved 25% cost reduction while scaling"
      ],
      social: {
        linkedin: "https://linkedin.com/in/davidkim",
        email: "david@company.com"
      },
      experience: "14+ Years",
      education: "CPA, MBA from Kellogg, BS Accounting",
      specialties: ["Financial Planning", "Investment Strategy", "Risk Management", "Corporate Finance"]
    },
    {
      name: "Lisa Thompson",
      role: "Chief Marketing Officer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      bio: "Marketing visionary specializing in brand building and digital marketing strategies for B2B technology companies.",
      achievements: [
        "Increased brand awareness by 300%",
        "Generated $20M+ in marketing-qualified leads",
        "Built award-winning marketing team",
        "Launched successful global campaigns"
      ],
      social: {
        linkedin: "https://linkedin.com/in/lisathompson",
        twitter: "https://twitter.com/lisathompson",
        email: "lisa@company.com"
      },
      experience: "11+ Years",
      education: "MBA Marketing from Northwestern, BA Communications",
      specialties: ["Brand Strategy", "Digital Marketing", "Content Marketing", "Growth Hacking"]
    },
    {
      name: "James Wilson",
      role: "Chief People Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "People-first leader dedicated to building inclusive cultures and developing world-class talent.",
      achievements: [
        "Achieved 95% employee retention rate",
        "Built diversity program increasing representation by 40%",
        "Implemented company-wide learning & development programs",
        "Led cultural transformation during rapid growth"
      ],
      social: {
        linkedin: "https://linkedin.com/in/jameswilson",
        email: "james@company.com"
      },
      experience: "13+ Years",
      education: "MS Organizational Psychology, BA Human Resources",
      specialties: ["Talent Development", "Culture Building", "Diversity & Inclusion", "Performance Management"]
    }
  ]

  const orgStructure = {
    ceo: {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    departments: [
      {
        head: {
          name: "Michael Chen",
          role: "CTO",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        team: [
          { name: "Alex Kumar", role: "VP Engineering", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
          { name: "Maria Santos", role: "VP Product", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
          { name: "Tom Zhang", role: "VP Data", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" }
        ]
      },
      {
        head: {
          name: "Emily Rodriguez",
          role: "COO",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        team: [
          { name: "Robert Lee", role: "VP Operations", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
          { name: "Sophie Brown", role: "VP Customer Success", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
          { name: "Carlos Mendez", role: "VP Business Dev", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" }
        ]
      },
      {
        head: {
          name: "David Kim",
          role: "CFO",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        team: [
          { name: "Jennifer Park", role: "VP Finance", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
          { name: "Mark Johnson", role: "VP Legal", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
          { name: "Anna Davis", role: "VP Compliance", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" }
        ]
      },
      {
        head: {
          name: "Lisa Thompson",
          role: "CMO",
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
        },
        team: [
          { name: "Ryan O'Connor", role: "VP Marketing", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
          { name: "Nina Patel", role: "VP Brand", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
          { name: "Jake Miller", role: "VP Growth", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" }
        ]
      }
    ]
  }

  const visionItems = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Vision",
      description: "Leading the industry with innovative solutions that transform how businesses operate and grow.",
      metrics: [
        { label: "Market Share", value: "25%" },
        { label: "Growth Rate", value: "150%" }
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "People First",
      description: "Building a culture where every team member can thrive and contribute to our collective success.",
      metrics: [
        { label: "Employee Satisfaction", value: "96%" },
        { label: "Retention Rate", value: "95%" }
      ]
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation Drive",
      description: "Continuously pushing boundaries and exploring new technologies to solve complex challenges.",
      metrics: [
        { label: "R&D Investment", value: "20%" },
        { label: "Patents Filed", value: "15+" }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Impact",
      description: "Creating solutions that make a positive difference for businesses and communities worldwide.",
      metrics: [
        { label: "Countries Served", value: "15+" },
        { label: "Lives Impacted", value: "1M+" }
      ]
    }
  ]

  const journeyMilestones = [
    {
      year: "2009",
      title: "Foundation & Vision",
      description: "Sarah Johnson founded the company with a clear vision to transform how businesses leverage technology for growth.",
      leader: "Sarah Johnson",
      achievement: "Established core values and company culture that continues to guide us today",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
    },
    {
      year: "2012",
      title: "Technology Innovation",
      description: "Michael Chen joined as CTO, leading the development of our flagship platform and establishing our technical excellence.",
      leader: "Michael Chen",
      achievement: "Built scalable architecture serving 100,000+ users with 99.9% uptime",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
    },
    {
      year: "2015",
      title: "Operational Excellence",
      description: "Emily Rodriguez joined as COO, streamlining operations and establishing processes for sustainable growth.",
      leader: "Emily Rodriguez",
      achievement: "Improved operational efficiency by 40% while scaling team from 10 to 50 members",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop"
    },
    {
      year: "2018",
      title: "Financial Growth",
      description: "David Kim joined as CFO, leading financial strategy and securing Series A funding for expansion.",
      leader: "David Kim",
      achievement: "Secured $10M Series A funding and achieved profitability within 18 months",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
    },
    {
      year: "2021",
      title: "Market Leadership",
      description: "Lisa Thompson joined as CMO, establishing our brand as a market leader and driving global expansion.",
      leader: "Lisa Thompson",
      achievement: "Increased brand awareness by 300% and expanded to 15+ international markets",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop"
    },
    {
      year: "2024",
      title: "People & Culture",
      description: "James Wilson joined as CPO, focusing on building an inclusive culture and developing world-class talent.",
      leader: "James Wilson",
      achievement: "Achieved 95% employee retention and built award-winning diversity & inclusion program",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
    }
  ]

  const leadershipQuotes = [
    {
      quote: "Leadership is not about being in charge. It's about taking care of those in your charge and empowering them to achieve their full potential.",
      author: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      context: "From her keynote at Tech Leadership Summit 2024"
    },
    {
      quote: "Innovation happens when we combine technical excellence with deep empathy for the problems we're solving.",
      author: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      context: "Speaking at the Global Tech Innovation Conference"
    },
    {
      quote: "Great operations are invisible. When everything runs smoothly, people can focus on what they do best.",
      author: "Emily Rodriguez",
      role: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      context: "From her Harvard Business Review article on operational excellence"
    },
    {
      quote: "Financial success is not just about numbers. It's about creating sustainable value for all stakeholders.",
      author: "David Kim",
      role: "Chief Financial Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      context: "During the CFO Leadership Forum 2024"
    }
  ]

  const leadershipStats = [
    { label: "Combined Experience", value: 75, suffix: "+ Years", icon: <Calendar className="w-6 h-6" /> },
    { label: "Companies Led", value: 12, suffix: "+", icon: <Building className="w-6 h-6" /> },
    { label: "Industry Awards", value: 28, suffix: "+", icon: <Award className="w-6 h-6" /> },
    { label: "Team Members Mentored", value: 200, suffix: "+", icon: <Users className="w-6 h-6" /> }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroGradientFloating
        eyebrow="Leadership Team"
        title="Visionary Leaders Driving Innovation"
        subtitle="Meet the exceptional individuals shaping our future"
        description="Our leadership team combines decades of experience with a shared passion for innovation, excellence, and making a positive impact on the world."
        primaryCta={{ label: "Meet Our Team", href: "#executives" }}
        secondaryCta={{ label: "Join Our Leadership", href: "/company/careers" }}
      />

      {/* Leadership Stats */}
      <StatsGrid
        eyebrow="Leadership Impact"
        title="Experience That Drives Results"
        subtitle="Our leadership team brings together decades of proven expertise"
        stats={leadershipStats}
      />

      {/* Executive Profiles */}
      <LeadershipExecutiveProfiles
        eyebrow="Executive Team"
        title="Meet Our Leadership"
        subtitle="The visionary leaders driving our company's success and innovation"
        leaders={executiveLeaders}
      />

      {/* Vision & Strategy */}
      <LeadershipVisionStrategy
        eyebrow="Our Vision"
        title="Strategic Pillars for Success"
        subtitle="The core principles that guide our leadership and drive our company forward"
        visionItems={visionItems}
      />

      {/* Leadership Journey Timeline */}
      <LeadershipJourneyTimeline
        eyebrow="Our Journey"
        title="Leadership Milestones"
        subtitle="Key moments where our leaders shaped the company's trajectory"
        milestones={journeyMilestones}
      />

      {/* Organizational Chart */}
      <LeadershipOrgChart
        eyebrow="Organization"
        title="How We're Organized"
        subtitle="Our leadership structure designed for collaboration and rapid decision-making"
        structure={orgStructure}
      />

      {/* Leadership Philosophy */}
      <ContentFullWidthQuote
        eyebrow="Leadership Philosophy"
        title="Leading with Purpose and Integrity"
        subtitle="Our approach to leadership is built on trust, transparency, and empowerment"
        description="We believe that great leadership is about serving others, creating opportunities for growth, and building a culture where everyone can thrive and contribute their best work."
        quote="The best leaders are those who empower others to become leaders themselves."
        author="Sarah Johnson"
        authorRole="CEO & Founder"
        authorImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      />

      {/* Leadership Quotes Carousel */}
      <LeadershipQuotesCarousel
        eyebrow="Leadership Insights"
        title="Words from Our Leaders"
        subtitle="Insights and perspectives from our executive team"
        quotes={leadershipQuotes}
      />

      {/* Leadership Development */}
      <ContentSplitImage
        eyebrow="Leadership Development"
        title="Growing Future Leaders"
        subtitle="Investing in the next generation of leadership"
        description="We're committed to developing leadership at every level of our organization. Through mentorship programs, leadership training, and growth opportunities, we're building the leaders of tomorrow."
        imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
        imageAlt="Leadership development"
        primaryCta={{ label: "Leadership Programs", href: "#" }}
        secondaryCta={{ label: "Career Opportunities", href: "/company/careers" }}
        features={[
          "Comprehensive leadership development programs",
          "Mentorship opportunities with senior executives",
          "Cross-functional project leadership roles",
          "External leadership training and conferences"
        ]}
        reversed={true}
      />

      {/* Company Impact Infographic */}
      <VisualInfographic
        eyebrow="Leadership Impact"
        title="Driving Company Success"
        subtitle="How our leadership team creates value across all dimensions"
        centerIcon={<Target className="w-12 h-12" />}
        items={[
          {
            title: "Strategic Vision",
            description: "Long-term planning and market positioning",
            icon: <Target className="w-6 h-6" />,
            color: "bg-blue-100 text-blue-600"
          },
          {
            title: "Innovation Culture",
            description: "Fostering creativity and breakthrough thinking",
            icon: <Lightbulb className="w-6 h-6" />,
            color: "bg-purple-100 text-purple-600"
          },
          {
            title: "Team Excellence",
            description: "Building and developing world-class talent",
            icon: <Users className="w-6 h-6" />,
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Market Leadership",
            description: "Establishing industry leadership and growth",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "bg-orange-100 text-orange-600"
          }
        ]}
      />

      {/* Parallax CTA Section */}
      <VisualParallaxSection
        eyebrow="Join Our Leadership Journey"
        title="Ready to Lead with Us?"
        subtitle="Explore leadership opportunities at our company"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
        content={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a
              href="/company/careers"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
            >
              View Leadership Roles
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Connect with Leadership
            </a>
          </div>
        }
      />

      {/* Final CTA */}
      <CTABanner
        eyebrow="Ready to Connect?"
        title="Let's Shape the Future Together"
        subtitle="Connect with our leadership team"
        description="Whether you're interested in partnership opportunities, joining our team, or learning more about our vision, we'd love to hear from you."
        primaryCta={{ label: "Contact Leadership", href: "/contact" }}
        secondaryCta={{ label: "Join Our Team", href: "/company/careers" }}
      />
    </div>
  )
}


