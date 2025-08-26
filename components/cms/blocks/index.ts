// Export all CMS blocks and their configurations

// Original blocks
export { HeroBlock, heroBlockConfig } from './hero-block'
export { FeaturesBlock, featuresBlockConfig } from './features-block'
export { TestimonialsBlock, testimonialsBlockConfig } from './testimonials-block'

// Text blocks
export { 
  HeadingBlock, headingBlockConfig,
  ParagraphBlock, paragraphBlockConfig,
  QuoteBlock, quoteBlockConfig,
  ListBlock, listBlockConfig,
  CalloutBlock, calloutBlockConfig
} from './text-blocks'

// Layout blocks
export {
  ContainerBlock, containerBlockConfig,
  SectionBlock, sectionBlockConfig,
  ColumnsBlock, columnsBlockConfig,
  SpacerBlock, spacerBlockConfig,
  DividerBlock, dividerBlockConfig,
  CardBlock, cardBlockConfig
} from './layout-blocks'

// Media blocks
export {
  ImageBlock, imageBlockConfig,
  VideoBlock, videoBlockConfig,
  GalleryBlock, galleryBlockConfig,
  IconBlock, iconBlockConfig
} from './media-blocks'

// Carousel blocks
export {
  CarouselBlock, carouselBlockConfig,
  SliderBlock, sliderBlockConfig,
  TabsBlock, tabsBlockConfig
} from './carousel-blocks'

// Form blocks
export {
  ContactFormBlock, contactFormBlockConfig,
  NewsletterBlock, newsletterBlockConfig,
  RatingBlock, ratingBlockConfig,
  PollBlock, pollBlockConfig
} from './form-blocks'

// CTA blocks
export {
  ButtonBlock, buttonBlockConfig,
  CtaSectionBlock, ctaSectionBlockConfig,
  BannerBlock, bannerBlockConfig,
  CountdownBlock, countdownBlockConfig
} from './cta-blocks'

// Block registry for dynamic rendering
export const blockRegistry = {
  // Original blocks
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
  },
  
  // Text blocks
  HeadingBlock: {
    component: () => import('./text-blocks').then(m => m.HeadingBlock),
    config: () => import('./text-blocks').then(m => m.headingBlockConfig)
  },
  ParagraphBlock: {
    component: () => import('./text-blocks').then(m => m.ParagraphBlock),
    config: () => import('./text-blocks').then(m => m.paragraphBlockConfig)
  },
  QuoteBlock: {
    component: () => import('./text-blocks').then(m => m.QuoteBlock),
    config: () => import('./text-blocks').then(m => m.quoteBlockConfig)
  },
  ListBlock: {
    component: () => import('./text-blocks').then(m => m.ListBlock),
    config: () => import('./text-blocks').then(m => m.listBlockConfig)
  },
  CalloutBlock: {
    component: () => import('./text-blocks').then(m => m.CalloutBlock),
    config: () => import('./text-blocks').then(m => m.calloutBlockConfig)
  },
  
  // Layout blocks
  ContainerBlock: {
    component: () => import('./layout-blocks').then(m => m.ContainerBlock),
    config: () => import('./layout-blocks').then(m => m.containerBlockConfig)
  },
  SectionBlock: {
    component: () => import('./layout-blocks').then(m => m.SectionBlock),
    config: () => import('./layout-blocks').then(m => m.sectionBlockConfig)
  },
  ColumnsBlock: {
    component: () => import('./layout-blocks').then(m => m.ColumnsBlock),
    config: () => import('./layout-blocks').then(m => m.columnsBlockConfig)
  },
  SpacerBlock: {
    component: () => import('./layout-blocks').then(m => m.SpacerBlock),
    config: () => import('./layout-blocks').then(m => m.spacerBlockConfig)
  },
  DividerBlock: {
    component: () => import('./layout-blocks').then(m => m.DividerBlock),
    config: () => import('./layout-blocks').then(m => m.dividerBlockConfig)
  },
  CardBlock: {
    component: () => import('./layout-blocks').then(m => m.CardBlock),
    config: () => import('./layout-blocks').then(m => m.cardBlockConfig)
  },
  
  // Media blocks
  ImageBlock: {
    component: () => import('./media-blocks').then(m => m.ImageBlock),
    config: () => import('./media-blocks').then(m => m.imageBlockConfig)
  },
  VideoBlock: {
    component: () => import('./media-blocks').then(m => m.VideoBlock),
    config: () => import('./media-blocks').then(m => m.videoBlockConfig)
  },
  GalleryBlock: {
    component: () => import('./media-blocks').then(m => m.GalleryBlock),
    config: () => import('./media-blocks').then(m => m.galleryBlockConfig)
  },
  IconBlock: {
    component: () => import('./media-blocks').then(m => m.IconBlock),
    config: () => import('./media-blocks').then(m => m.iconBlockConfig)
  },
  
  // Carousel blocks
  CarouselBlock: {
    component: () => import('./carousel-blocks').then(m => m.CarouselBlock),
    config: () => import('./carousel-blocks').then(m => m.carouselBlockConfig)
  },
  SliderBlock: {
    component: () => import('./carousel-blocks').then(m => m.SliderBlock),
    config: () => import('./carousel-blocks').then(m => m.sliderBlockConfig)
  },
  TabsBlock: {
    component: () => import('./carousel-blocks').then(m => m.TabsBlock),
    config: () => import('./carousel-blocks').then(m => m.tabsBlockConfig)
  },
  
  // Form blocks
  ContactFormBlock: {
    component: () => import('./form-blocks').then(m => m.ContactFormBlock),
    config: () => import('./form-blocks').then(m => m.contactFormBlockConfig)
  },
  NewsletterBlock: {
    component: () => import('./form-blocks').then(m => m.NewsletterBlock),
    config: () => import('./form-blocks').then(m => m.newsletterBlockConfig)
  },
  RatingBlock: {
    component: () => import('./form-blocks').then(m => m.RatingBlock),
    config: () => import('./form-blocks').then(m => m.ratingBlockConfig)
  },
  PollBlock: {
    component: () => import('./form-blocks').then(m => m.PollBlock),
    config: () => import('./form-blocks').then(m => m.pollBlockConfig)
  },
  
  // CTA blocks
  ButtonBlock: {
    component: () => import('./cta-blocks').then(m => m.ButtonBlock),
    config: () => import('./cta-blocks').then(m => m.buttonBlockConfig)
  },
  CtaSectionBlock: {
    component: () => import('./cta-blocks').then(m => m.CtaSectionBlock),
    config: () => import('./cta-blocks').then(m => m.ctaSectionBlockConfig)
  },
  BannerBlock: {
    component: () => import('./cta-blocks').then(m => m.BannerBlock),
    config: () => import('./cta-blocks').then(m => m.bannerBlockConfig)
  },
  CountdownBlock: {
    component: () => import('./cta-blocks').then(m => m.CountdownBlock),
    config: () => import('./cta-blocks').then(m => m.countdownBlockConfig)
  }
}

// All available block configurations
export const allBlockConfigs = [
  // LAYOUT BLOCKS
  {
    name: "Hero Section",
    type: "hero",
    category: "layout",
    description: "A prominent hero section with title, description, and call-to-action buttons",
    component: "HeroBlock",
    previewImage: "/cms/previews/hero-block.jpg",
    defaultContent: {
      title: "Welcome to Our Platform",
      subtitle: "Innovative Solutions",
      description: "Transform your business with our cutting-edge technology and expert guidance.",
      primaryButton: { text: "Get Started", href: "/signup" },
      secondaryButton: { text: "Learn More", href: "/about" },
      backgroundType: "gradient",
      textAlign: "center"
    }
  },
  {
    name: "Container",
    type: "container",
    category: "layout",
    description: "Wrapper container with customizable width and styling",
    component: "ContainerBlock",
    defaultContent: {
      maxWidth: 'lg',
      padding: 'md',
      background: 'none'
    }
  },
  {
    name: "Section",
    type: "section",
    category: "layout",
    description: "Full-width section with background and spacing options",
    component: "SectionBlock",
    defaultContent: {
      background: 'white',
      padding: 'lg',
      margin: 'none',
      fullHeight: false,
      overlay: false,
      overlayOpacity: 0.5
    }
  },
  {
    name: "Columns",
    type: "columns",
    category: "layout",
    description: "Multi-column layout with responsive options",
    component: "ColumnsBlock",
    defaultContent: {
      columns: 2,
      gap: 'md',
      alignment: 'top',
      responsive: true
    }
  },
  {
    name: "Card",
    type: "card",
    category: "layout",
    description: "Container card with various styling options",
    component: "CardBlock",
    defaultContent: {
      style: 'shadow',
      padding: 'md',
      rounded: 'lg',
      background: 'white',
      hover: false
    }
  },
  {
    name: "Spacer",
    type: "spacer",
    category: "layout",
    description: "Add vertical spacing between content blocks",
    component: "SpacerBlock",
    defaultContent: {
      height: 'md',
      responsive: true
    }
  },
  {
    name: "Divider",
    type: "divider",
    category: "layout",
    description: "Visual dividers to separate content sections",
    component: "DividerBlock",
    defaultContent: {
      style: 'solid',
      thickness: 'thin',
      color: 'border-gray-300',
      width: 'full',
      alignment: 'center',
      spacing: 'md'
    }
  },

  // TEXT BLOCKS
  {
    name: "Heading",
    type: "heading",
    category: "text",
    description: "Customizable headings with various styles and animations",
    component: "HeadingBlock",
    defaultContent: {
      text: "Your Heading Here",
      level: 2,
      align: 'left',
      color: 'text-gray-900',
      gradient: false,
      animation: 'fade'
    }
  },
  {
    name: "Paragraph",
    type: "paragraph",
    category: "text",
    description: "Rich text paragraphs with formatting options",
    component: "ParagraphBlock",
    defaultContent: {
      text: "Your paragraph text goes here. You can format it with <strong>bold</strong>, <em>italic</em>, and <a href='#'>links</a>.",
      size: 'base',
      align: 'left',
      color: 'text-gray-700',
      lineHeight: 'relaxed'
    }
  },
  {
    name: "Quote",
    type: "quote",
    category: "text",
    description: "Stylized quotes and testimonials",
    component: "QuoteBlock",
    defaultContent: {
      quote: "This is an inspiring quote that adds credibility and social proof to your content.",
      author: "John Doe",
      role: "CEO",
      company: "Example Corp",
      style: 'bordered',
      size: 'base'
    }
  },
  {
    name: "List",
    type: "list",
    category: "text",
    description: "Customizable lists with various styles and layouts",
    component: "ListBlock",
    defaultContent: {
      items: [
        "First list item with important information",
        "Second item highlighting key benefits",
        "Third item with additional details",
        "Fourth item to complete the list"
      ],
      type: 'bullet',
      style: 'simple'
    }
  },
  {
    name: "Callout",
    type: "callout",
    category: "text",
    description: "Highlighted callout boxes for important information",
    component: "CalloutBlock",
    defaultContent: {
      title: "Important Note",
      text: "This is an important callout that draws attention to key information or tips.",
      type: 'info',
      style: 'bordered'
    }
  },

  // CONTENT BLOCKS
  {
    name: "Features Section", 
    type: "features",
    category: "content",
    description: "Showcase key features with icons, titles, and descriptions",
    component: "FeaturesBlock",
    previewImage: "/cms/previews/features-block.jpg",
    defaultContent: {
      title: "Why Choose Us",
      subtitle: "Our Features",
      description: "Discover the powerful features that make our platform the perfect choice for your business needs.",
      layout: "grid-3",
      showIcons: true,
      features: [
        {
          icon: "zap",
          title: "Lightning Fast",
          description: "Experience blazing fast performance with our optimized infrastructure."
        },
        {
          icon: "shield", 
          title: "Secure & Reliable",
          description: "Your data is protected with enterprise-grade security measures."
        },
        {
          icon: "users",
          title: "Team Collaboration", 
          description: "Work seamlessly with your team using our advanced collaboration tools."
        }
      ]
    }
  },
  {
    name: "Testimonials Section",
    type: "testimonials", 
    category: "content",
    description: "Display customer testimonials with ratings and author information",
    component: "TestimonialsBlock",
    previewImage: "/cms/previews/testimonials-block.jpg",
    defaultContent: {
      title: "What Our Customers Say",
      subtitle: "Testimonials",
      description: "Don't just take our word for it. Here's what our satisfied customers have to say.",
      layout: "grid",
      showRatings: true,
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "CEO",
          company: "TechStart Inc.",
          content: "This platform has completely transformed how we manage our business operations.",
          rating: 5
        }
      ]
    }
  },

  // MEDIA BLOCKS
  {
    name: "Image",
    type: "image",
    category: "media",
    description: "Responsive images with various styling and interaction options",
    component: "ImageBlock",
    defaultContent: {
      src: "/placeholder-image.jpg",
      alt: "Placeholder image",
      objectFit: 'cover',
      alignment: 'center',
      rounded: 'md',
      shadow: 'md',
      hover: 'zoom'
    }
  },
  {
    name: "Video",
    type: "video",
    category: "media",
    description: "Video player with support for uploads and embeds",
    component: "VideoBlock",
    defaultContent: {
      type: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      aspectRatio: '16:9'
    }
  },
  {
    name: "Gallery",
    type: "gallery",
    category: "media",
    description: "Image gallery with multiple layout options",
    component: "GalleryBlock",
    defaultContent: {
      images: [
        { src: "/placeholder-1.jpg", alt: "Gallery image 1", caption: "First image" },
        { src: "/placeholder-2.jpg", alt: "Gallery image 2", caption: "Second image" },
        { src: "/placeholder-3.jpg", alt: "Gallery image 3", caption: "Third image" },
        { src: "/placeholder-4.jpg", alt: "Gallery image 4", caption: "Fourth image" }
      ],
      layout: 'grid',
      columns: 3,
      gap: 'md',
      aspectRatio: 'square'
    }
  },
  {
    name: "Icon",
    type: "icon",
    category: "media",
    description: "Customizable icons with various styling options",
    component: "IconBlock",
    defaultContent: {
      icon: "⭐",
      size: 'lg',
      color: 'text-blue-500',
      background: 'circle',
      bgColor: '#f3f4f6',
      alignment: 'center',
      animation: 'none'
    }
  },
  {
    name: "Carousel",
    type: "carousel",
    category: "media",
    description: "Interactive carousel with multiple slide types",
    component: "CarouselBlock",
    defaultContent: {
      slides: [
        {
          type: 'content',
          title: 'Welcome to Our Platform',
          description: 'Discover amazing features and capabilities',
          buttonText: 'Get Started',
          buttonLink: '/signup',
          background: '#3b82f6'
        },
        {
          type: 'content',
          title: 'Powerful Features',
          description: 'Everything you need to succeed',
          buttonText: 'Learn More',
          buttonLink: '/features',
          background: '#8b5cf6'
        }
      ],
      autoplay: true,
      interval: 5000,
      showDots: true,
      showArrows: true,
      infinite: true,
      aspectRatio: '16:9'
    }
  },
  {
    name: "Slider",
    type: "slider",
    category: "media",
    description: "Multi-item slider with responsive options",
    component: "SliderBlock",
    defaultContent: {
      items: [
        {
          title: "Feature One",
          description: "Amazing feature description",
          image: "/placeholder-1.jpg"
        },
        {
          title: "Feature Two", 
          description: "Another great feature",
          image: "/placeholder-2.jpg"
        },
        {
          title: "Feature Three",
          description: "Third awesome feature",
          image: "/placeholder-3.jpg"
        }
      ],
      slidesToShow: 3,
      autoplay: true,
      interval: 4000,
      showArrows: true,
      centerMode: false
    }
  },

  // INTERACTIVE BLOCKS
  {
    name: "Tabs",
    type: "tabs",
    category: "interactive",
    description: "Tabbed content with various styling options",
    component: "TabsBlock",
    defaultContent: {
      tabs: [
        {
          label: "Overview",
          content: "<h3>Overview Content</h3><p>This is the overview tab content with detailed information.</p>",
          icon: "📋"
        },
        {
          label: "Features",
          content: "<h3>Features</h3><p>Here are the amazing features we offer to our users.</p>",
          icon: "⭐"
        },
        {
          label: "Pricing",
          content: "<h3>Pricing Plans</h3><p>Choose from our flexible pricing options that suit your needs.</p>",
          icon: "💰"
        }
      ],
      style: 'default',
      alignment: 'left',
      vertical: false
    }
  },
  {
    name: "Rating",
    type: "rating",
    category: "interactive",
    description: "Star rating display or interactive rating input",
    component: "RatingBlock",
    defaultContent: {
      title: "Rate this product",
      maxRating: 5,
      allowHalf: true,
      size: 'md',
      color: 'yellow',
      interactive: true
    }
  },
  {
    name: "Poll",
    type: "poll",
    category: "interactive",
    description: "Interactive poll with voting and results",
    component: "PollBlock",
    defaultContent: {
      question: "What's your favorite programming language?",
      options: [
        { text: "JavaScript", votes: 45 },
        { text: "Python", votes: 38 },
        { text: "TypeScript", votes: 29 },
        { text: "Go", votes: 12 }
      ],
      allowMultiple: false,
      showResults: false
    }
  },

  // FORM BLOCKS
  {
    name: "Contact Form",
    type: "contact-form",
    category: "forms",
    description: "Customizable contact form with various field types",
    component: "ContactFormBlock",
    defaultContent: {
      title: "Get In Touch",
      description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      fields: [
        { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
        { name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
        { name: "subject", label: "Subject", type: "text", required: false, placeholder: "What's this about?" },
        { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Your message here..." }
      ],
      submitText: "Send Message",
      successMessage: "Your message has been sent successfully! We'll get back to you soon.",
      style: 'simple'
    }
  },
  {
    name: "Newsletter Signup",
    type: "newsletter",
    category: "forms",
    description: "Email newsletter subscription form",
    component: "NewsletterBlock",
    defaultContent: {
      title: "Stay Updated",
      description: "Subscribe to our newsletter for the latest updates and insights.",
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
      style: 'inline',
      successMessage: "Thank you for subscribing!"
    }
  },

  // CTA BLOCKS
  {
    name: "Button",
    type: "button",
    category: "cta",
    description: "Customizable call-to-action button",
    component: "ButtonBlock",
    defaultContent: {
      text: "Get Started",
      href: "/signup",
      type: 'primary',
      size: 'md',
      icon: 'arrow',
      iconPosition: 'right',
      fullWidth: false,
      disabled: false
    }
  },
  {
    name: "CTA Section",
    type: "cta-section",
    category: "cta",
    description: "Full-width call-to-action section with background options",
    component: "CtaSectionBlock",
    defaultContent: {
      title: "Ready to Get Started?",
      description: "Join thousands of satisfied customers and transform your business today.",
      primaryButton: {
        text: "Start Free Trial",
        href: "/signup",
        style: 'primary'
      },
      secondaryButton: {
        text: "Learn More",
        href: "/about",
        style: 'outline'
      },
      background: 'gradient',
      textColor: 'light'
    }
  },
  {
    name: "Banner",
    type: "banner",
    category: "cta",
    description: "Notification banner with various styles",
    component: "BannerBlock",
    defaultContent: {
      text: "🎉 Special offer: Get 50% off your first month!",
      type: 'announcement',
      dismissible: true,
      button: {
        text: "Claim Offer",
        href: "/signup"
      },
      icon: "🎉"
    }
  },
  {
    name: "Countdown",
    type: "countdown",
    category: "cta",
    description: "Countdown timer for events or promotions",
    component: "CountdownBlock",
    defaultContent: {
      title: "Limited Time Offer Ends In:",
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      labels: {
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds"
      },
      style: 'cards',
      size: 'md'
    }
  }
]

// Block categories for organization
export const blockCategories = [
  {
    id: "layout",
    name: "Layout",
    description: "Structural components for page layout",
    icon: "📐"
  },
  {
    id: "text",
    name: "Text",
    description: "Typography and text formatting components",
    icon: "📝"
  },
  {
    id: "content",
    name: "Content",
    description: "Content-focused components",
    icon: "📄"
  },
  {
    id: "media",
    name: "Media",
    description: "Image, video, and gallery components",
    icon: "🖼️"
  },
  {
    id: "interactive",
    name: "Interactive",
    description: "Interactive and dynamic components",
    icon: "⚡"
  },
  {
    id: "forms",
    name: "Forms",
    description: "Form and input components",
    icon: "📋"
  },
  {
    id: "cta",
    name: "Call to Action",
    description: "Buttons, banners, and conversion components",
    icon: "🎯"
  }
]
