// Comprehensive dummy content library for component showcase

export const dummyImages = {
  hero: [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
  ],
  team: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
  ],
  services: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  ],
  company: [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
  ]
}

export const dummyContent = {
  company: {
    about: {
      mission: "To revolutionize how businesses operate through innovative technology solutions that drive growth and efficiency.",
      vision: "A world where every organization has access to cutting-edge tools that unlock their full potential.",
      values: [
        { title: "Innovation", description: "We push boundaries and embrace new technologies to solve complex challenges." },
        { title: "Excellence", description: "We deliver exceptional quality in everything we do, exceeding expectations." },
        { title: "Integrity", description: "We operate with transparency, honesty, and ethical practices in all our interactions." },
        { title: "Collaboration", description: "We believe in the power of teamwork and building strong partnerships." },
        { title: "Customer Focus", description: "Our clients' success is our success. We prioritize their needs above all." },
        { title: "Continuous Learning", description: "We invest in growth, learning, and adapting to an ever-changing landscape." }
      ],
      stats: [
        { label: "Years of Experience", value: "15+" },
        { label: "Projects Completed", value: "500+" },
        { label: "Happy Clients", value: "200+" },
        { label: "Team Members", value: "50+" }
      ]
    },
    team: [
      {
        name: "Sarah Johnson",
        role: "Chief Executive Officer",
        bio: "Sarah brings over 15 years of leadership experience in technology and business strategy. She's passionate about building teams that deliver exceptional results.",
        image: dummyImages.team[0],
        social: { linkedin: "#", twitter: "#" }
      },
      {
        name: "Michael Chen",
        role: "Chief Technology Officer",
        bio: "Michael is a seasoned technologist with expertise in scalable architecture and emerging technologies. He leads our technical vision and innovation.",
        image: dummyImages.team[1],
        social: { linkedin: "#", github: "#" }
      },
      {
        name: "Emily Rodriguez",
        role: "Head of Design",
        bio: "Emily combines user-centered design with business strategy to create experiences that users love and businesses need.",
        image: dummyImages.team[2],
        social: { linkedin: "#", dribbble: "#" }
      },
      {
        name: "David Kim",
        role: "VP of Engineering",
        bio: "David leads our engineering teams with a focus on quality, scalability, and developer experience. He's passionate about building great products.",
        image: dummyImages.team[3],
        social: { linkedin: "#", github: "#" }
      },
      {
        name: "Lisa Thompson",
        role: "Head of Marketing",
        bio: "Lisa drives our brand strategy and growth initiatives. She has a proven track record of building successful marketing campaigns.",
        image: dummyImages.team[4],
        social: { linkedin: "#", twitter: "#" }
      },
      {
        name: "James Wilson",
        role: "Head of Sales",
        bio: "James leads our sales organization with a consultative approach, helping clients find the right solutions for their unique challenges.",
        image: dummyImages.team[5],
        social: { linkedin: "#" }
      }
    ]
  },
  services: {
    overview: {
      headline: "Comprehensive Solutions for Modern Businesses",
      description: "We provide end-to-end technology services that help organizations transform, scale, and succeed in today's digital landscape.",
      categories: [
        {
          title: "Strategy & Consulting",
          description: "Strategic guidance to align technology with business objectives",
          features: ["Digital Transformation", "Technology Roadmapping", "Process Optimization", "Change Management"]
        },
        {
          title: "Custom Development",
          description: "Tailored software solutions built for your specific needs",
          features: ["Web Applications", "Mobile Apps", "API Development", "System Integration"]
        },
        {
          title: "Cloud & Infrastructure",
          description: "Scalable, secure, and reliable cloud solutions",
          features: ["Cloud Migration", "DevOps", "Security", "Monitoring & Analytics"]
        }
      ]
    },
    industries: [
      {
        name: "Healthcare",
        description: "HIPAA-compliant solutions that improve patient outcomes and operational efficiency",
        challenges: ["Data Security", "Regulatory Compliance", "System Integration", "Patient Experience"],
        solutions: ["Electronic Health Records", "Telemedicine Platforms", "Patient Portals", "Analytics Dashboards"]
      },
      {
        name: "Financial Services",
        description: "Secure, scalable fintech solutions that drive innovation and compliance",
        challenges: ["Regulatory Requirements", "Security Threats", "Legacy Systems", "Customer Expectations"],
        solutions: ["Digital Banking", "Payment Processing", "Risk Management", "Compliance Tools"]
      },
      {
        name: "E-commerce",
        description: "Comprehensive platforms that deliver exceptional shopping experiences",
        challenges: ["Scalability", "User Experience", "Inventory Management", "Multi-channel Integration"],
        solutions: ["Custom Storefronts", "Inventory Systems", "Payment Gateways", "Analytics Platforms"]
      }
    ]
  },
  testimonials: [
    {
      content: "Working with this team transformed our business. Their expertise and dedication exceeded our expectations at every turn.",
      author: "Jennifer Martinez",
      role: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
    },
    {
      content: "The level of professionalism and technical expertise is unmatched. They delivered exactly what we needed, on time and within budget.",
      author: "Robert Chang",
      role: "CTO, InnovateCorp",
      company: "InnovateCorp",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      content: "Our partnership has been instrumental in scaling our operations. The solutions they built are robust, scalable, and user-friendly.",
      author: "Amanda Foster",
      role: "VP Operations, GrowthCo",
      company: "GrowthCo",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    }
  ],
  process: [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, challenges, and requirements through comprehensive analysis.",
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Design & Architecture",
      description: "Our team creates detailed designs and technical architecture that align with your objectives.",
      duration: "2-3 weeks"
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "We build your solution using best practices, with continuous testing and quality assurance.",
      duration: "4-12 weeks"
    },
    {
      step: 4,
      title: "Deployment & Support",
      description: "We handle deployment and provide ongoing support to ensure your solution performs optimally.",
      duration: "Ongoing"
    }
  ]
}

export const dummyPricing = {
  tiers: [
    {
      name: "Starter",
      price: "$2,999",
      period: "one-time",
      description: "Perfect for small businesses getting started with digital transformation",
      features: [
        "Basic website or web app",
        "Responsive design",
        "Content management",
        "Basic SEO optimization",
        "3 months support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$9,999",
      period: "project",
      description: "Comprehensive solutions for growing businesses",
      features: [
        "Custom web application",
        "Advanced functionality",
        "Database integration",
        "Third-party integrations",
        "6 months support",
        "Training included"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "quote",
      description: "Tailored solutions for large organizations",
      features: [
        "Full-scale digital transformation",
        "Custom architecture",
        "Advanced security",
        "Scalable infrastructure",
        "Ongoing support",
        "Dedicated team"
      ],
      popular: false
    }
  ]
}
