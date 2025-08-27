// Placeholder content and images for CMS blocks

export const placeholderImages = {
  hero: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  business: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  technology: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  product1: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  product2: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  product3: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  avatar1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  avatar2: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  avatar3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  gallery1: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  gallery2: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  gallery3: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  gallery4: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  video: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
}

export const placeholderContent = {
  hero: {
    title: "Transform Your Business with Innovation",
    subtitle: "Leading the Future",
    description: "Discover cutting-edge solutions that drive growth, enhance efficiency, and unlock your organization's full potential in today's competitive landscape.",
    primaryButton: { text: "Get Started", href: "/get-started" },
    secondaryButton: { text: "Learn More", href: "/about" },
    backgroundImage: placeholderImages.hero,
    backgroundType: "image",
    textAlign: "center",
    overlayOpacity: 40
  },

  features: {
    title: "Why Choose Our Platform",
    subtitle: "Powerful Features",
    description: "Everything you need to succeed, all in one comprehensive platform designed for modern businesses.",
    layout: "grid-3",
    showIcons: true,
    iconStyle: "filled",
    features: [
      {
        icon: "⚡",
        title: "Lightning Fast Performance",
        description: "Experience blazing-fast load times and seamless interactions with our optimized infrastructure and cutting-edge technology stack."
      },
      {
        icon: "🔒",
        title: "Enterprise-Grade Security",
        description: "Your data is protected with bank-level encryption, multi-factor authentication, and compliance with industry standards."
      },
      {
        icon: "🚀",
        title: "Scalable Architecture",
        description: "Grow without limits. Our platform scales automatically to handle increased traffic and expanding business needs."
      },
      {
        icon: "📊",
        title: "Advanced Analytics",
        description: "Make data-driven decisions with comprehensive analytics, real-time reporting, and actionable insights."
      },
      {
        icon: "🛠️",
        title: "Easy Integration",
        description: "Connect seamlessly with your existing tools through our robust API and extensive integration marketplace."
      },
      {
        icon: "💬",
        title: "24/7 Expert Support",
        description: "Get help when you need it with our dedicated support team available around the clock via chat, email, and phone."
      }
    ]
  },

  testimonials: {
    title: "What Our Customers Say",
    subtitle: "Success Stories",
    description: "Don't just take our word for it. Here's what industry leaders and satisfied customers have to say about their experience.",
    layout: "grid",
    showRatings: true,
    showAvatars: true,
    showCompany: true,
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        avatar: placeholderImages.avatar1,
        content: "This platform has completely transformed how we manage our business operations. The efficiency gains have been remarkable, and our team productivity has increased by 40%.",
        rating: 5
      },
      {
        name: "Michael Chen",
        role: "CTO",
        company: "Innovation Labs",
        avatar: placeholderImages.avatar2,
        content: "The technical capabilities and scalability of this solution exceeded our expectations. Integration was seamless, and the support team is outstanding.",
        rating: 5
      },
      {
        name: "Emily Rodriguez",
        role: "Operations Director",
        company: "Global Solutions",
        avatar: placeholderImages.avatar3,
        content: "We've seen a 60% reduction in manual processes and significant cost savings. The ROI was evident within the first quarter of implementation.",
        rating: 5
      }
    ]
  },

  gallery: {
    title: "Our Work in Action",
    description: "Explore our portfolio of successful projects and see how we've helped businesses achieve their goals.",
    layout: "grid",
    columns: 3,
    gap: "md",
    aspectRatio: "square",
    images: [
      { src: placeholderImages.gallery1, alt: "Modern office workspace", caption: "Collaborative Workspace Design" },
      { src: placeholderImages.gallery2, alt: "Team collaboration", caption: "Team Building & Culture" },
      { src: placeholderImages.gallery3, alt: "Technology solutions", caption: "Digital Transformation" },
      { src: placeholderImages.gallery4, alt: "Business meeting", caption: "Strategic Planning" }
    ]
  },

  pricing: {
    title: "Choose Your Plan",
    subtitle: "Flexible Pricing",
    description: "Select the perfect plan for your needs. All plans include our core features with the flexibility to upgrade as you grow.",
    style: "modern",
    columns: 3,
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 29,
        originalPrice: 39,
        currency: "$",
        period: "month",
        description: "Perfect for small teams getting started",
        features: [
          { text: "Up to 5 team members", included: true },
          { text: "10GB storage", included: true },
          { text: "Basic analytics", included: true },
          { text: "Email support", included: true },
          { text: "API access", included: false },
          { text: "Advanced integrations", included: false }
        ],
        buttonText: "Start Free Trial",
        buttonStyle: "outline",
        popular: false
      },
      {
        id: "professional",
        name: "Professional",
        price: 79,
        originalPrice: 99,
        currency: "$",
        period: "month",
        description: "Ideal for growing businesses",
        features: [
          { text: "Up to 25 team members", included: true },
          { text: "100GB storage", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Priority support", included: true },
          { text: "Full API access", included: true },
          { text: "Advanced integrations", included: true }
        ],
        buttonText: "Get Started",
        buttonStyle: "primary",
        popular: true
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 199,
        originalPrice: 249,
        currency: "$",
        period: "month",
        description: "For large organizations with advanced needs",
        features: [
          { text: "Unlimited team members", included: true },
          { text: "Unlimited storage", included: true },
          { text: "Custom analytics", included: true },
          { text: "24/7 phone support", included: true },
          { text: "Custom integrations", included: true },
          { text: "Dedicated account manager", included: true }
        ],
        buttonText: "Contact Sales",
        buttonStyle: "outline",
        popular: false
      }
    ]
  },

  contactForm: {
    title: "Get in Touch",
    subtitle: "Contact Us",
    description: "Ready to get started? Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "John" },
      { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Doe" },
      { name: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
      { name: "company", label: "Company", type: "text", required: false, placeholder: "Your Company" },
      { name: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+1 (555) 123-4567" },
      { name: "subject", label: "Subject", type: "text", required: true, placeholder: "How can we help?" },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Tell us about your project or question..." }
    ],
    submitText: "Send Message",
    successMessage: "Thank you for your message! We'll get back to you within 24 hours.",
    style: "modern"
  },

  newsletter: {
    title: "Stay Updated",
    subtitle: "Newsletter Signup",
    description: "Subscribe to our newsletter for the latest updates, insights, and exclusive content delivered straight to your inbox.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe Now",
    style: "inline",
    successMessage: "Thank you for subscribing! Check your email to confirm your subscription.",
    benefits: [
      "Weekly industry insights",
      "Exclusive content and resources",
      "Early access to new features",
      "No spam, unsubscribe anytime"
    ]
  },

  ctaSection: {
    title: "Ready to Transform Your Business?",
    subtitle: "Get Started Today",
    description: "Join thousands of satisfied customers who have already transformed their operations with our platform. Start your free trial today and see the difference.",
    primaryButton: {
      text: "Start Free Trial",
      href: "/signup",
      style: "primary"
    },
    secondaryButton: {
      text: "Schedule Demo",
      href: "/demo",
      style: "outline"
    },
    background: "gradient",
    textColor: "light",
    backgroundImage: placeholderImages.business,
    overlayOpacity: 70
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle: "FAQ",
    description: "Find answers to common questions about our platform, features, and services.",
    style: "bordered",
    allowMultiple: false,
    animation: "slide",
    items: [
      {
        title: "How quickly can I get started?",
        content: "You can sign up and start using our platform immediately. Our onboarding process takes less than 5 minutes, and you'll have access to all features right away.",
        icon: "🚀",
        defaultOpen: true
      },
      {
        title: "Is my data secure?",
        content: "Absolutely. We use enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with industry standards like SOC 2 and GDPR.",
        icon: "🔒"
      },
      {
        title: "Can I integrate with my existing tools?",
        content: "Yes! We offer integrations with over 100 popular business tools including CRM systems, project management tools, and communication platforms. Our API also allows for custom integrations.",
        icon: "🔗"
      },
      {
        title: "What kind of support do you provide?",
        content: "We provide 24/7 support through multiple channels including live chat, email, and phone. Our support team consists of technical experts who can help with any questions or issues.",
        icon: "💬"
      },
      {
        title: "Can I cancel my subscription anytime?",
        content: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your data will remain accessible for 30 days after cancellation.",
        icon: "✅"
      }
    ]
  }
}

export const getPlaceholderContent = (blockType: string) => {
  return placeholderContent[blockType as keyof typeof placeholderContent] || {}
}

export const getPlaceholderImage = (imageType: string) => {
  return placeholderImages[imageType as keyof typeof placeholderImages] || placeholderImages.business
}
