import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createSampleCmsContent() {
  console.log('🚀 Creating sample CMS content...')

  // Get admin user
  const adminUser = await prisma.user.findFirst({
    where: { 
      role: { 
        name: { in: ['ADMIN', 'admin', 'Admin'] } 
      } 
    }
  })

  if (!adminUser) {
    console.error('❌ No admin user found. Please ensure you have an admin user.')
    return
  }

  console.log(`📝 Using admin user: ${adminUser.username}`)

  // Get existing blocks
  const heroBlock = await prisma.cmsBlock.findFirst({ where: { component: 'HeroBlock' } })
  const featuresBlock = await prisma.cmsBlock.findFirst({ where: { component: 'FeaturesBlock' } })
  const testimonialsBlock = await prisma.cmsBlock.findFirst({ where: { component: 'TestimonialsBlock' } })

  if (!heroBlock || !featuresBlock || !testimonialsBlock) {
    console.error('❌ CMS blocks not found. Please run the CMS seed script first.')
    return
  }

  // 1. Create Homepage
  console.log('🏠 Creating Homepage...')
  const homepage = await prisma.cmsPage.create({
    data: {
      title: 'Welcome to Our Company',
      slug: 'home',
      description: 'Transform your business with our innovative solutions and expert team.',
      content: JSON.stringify([
        {
          id: 'hero-1',
          type: 'hero',
          component: 'HeroBlock',
          content: {
            title: 'Transform Your Business Today',
            subtitle: 'Innovation Meets Excellence',
            description: 'We help businesses grow with cutting-edge technology solutions, expert consulting, and innovative strategies that deliver real results.',
            primaryButton: {
              text: 'Get Started',
              href: '/contact',
              variant: 'primary'
            },
            secondaryButton: {
              text: 'Learn More',
              href: '/about',
              variant: 'outline'
            },
            backgroundImage: '/images/hero-bg.jpg',
            layout: 'centered'
          }
        },
        {
          id: 'features-1',
          type: 'features',
          component: 'FeaturesBlock',
          content: {
            title: 'Why Choose Us',
            subtitle: 'Our Advantages',
            description: 'We deliver exceptional value through our comprehensive suite of services and expertise.',
            layout: 'grid',
            features: [
              {
                icon: '🚀',
                title: 'Fast Delivery',
                description: 'Quick turnaround times without compromising quality.'
              },
              {
                icon: '💡',
                title: 'Innovation',
                description: 'Cutting-edge solutions using the latest technologies.'
              },
              {
                icon: '🎯',
                title: 'Results-Driven',
                description: 'Focused on delivering measurable business outcomes.'
              },
              {
                icon: '🤝',
                title: 'Expert Support',
                description: '24/7 support from our team of experienced professionals.'
              }
            ]
          }
        },
        {
          id: 'testimonials-1',
          type: 'testimonials',
          component: 'TestimonialsBlock',
          content: {
            title: 'What Our Clients Say',
            subtitle: 'Success Stories',
            description: 'Don\'t just take our word for it. Here\'s what our satisfied clients have to say.',
            layout: 'grid',
            showRatings: true,
            testimonials: [
              {
                name: 'Sarah Johnson',
                role: 'CEO',
                company: 'TechStart Inc.',
                content: 'This team transformed our business operations completely. The results exceeded our expectations.',
                rating: 5,
                image: '/images/testimonial-1.jpg'
              },
              {
                name: 'Michael Chen',
                role: 'CTO',
                company: 'InnovateCorp',
                content: 'Professional, reliable, and innovative. They delivered exactly what we needed on time.',
                rating: 5,
                image: '/images/testimonial-2.jpg'
              }
            ]
          }
        }
      ]),
      metaTitle: 'Welcome to Our Company - Leading Business Solutions',
      metaDescription: 'Transform your business with our innovative solutions and expert team. Get started today with our proven strategies.',
      metaKeywords: 'business solutions, consulting, technology, innovation',
      ogTitle: 'Welcome to Our Company',
      ogDescription: 'Transform your business with our innovative solutions and expert team.',
      isPublished: true,
      layout: 'public',
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  // 2. Create About Page
  console.log('ℹ️ Creating About Page...')
  const aboutPage = await prisma.cmsPage.create({
    data: {
      title: 'About Our Company',
      slug: 'about',
      description: 'Learn about our mission, values, and the team behind our success.',
      content: JSON.stringify([
        {
          id: 'hero-about',
          type: 'hero',
          component: 'HeroBlock',
          content: {
            title: 'About Our Company',
            subtitle: 'Our Story',
            description: 'Founded with a vision to transform businesses through technology and innovation, we have been helping companies achieve their goals for over a decade.',
            primaryButton: {
              text: 'Meet Our Team',
              href: '/team',
              variant: 'primary'
            },
            layout: 'left-aligned',
            backgroundImage: '/images/about-hero.jpg'
          }
        },
        {
          id: 'features-about',
          type: 'features',
          component: 'FeaturesBlock',
          content: {
            title: 'Our Values',
            subtitle: 'What Drives Us',
            description: 'These core values guide everything we do and shape our approach to business.',
            layout: 'grid',
            features: [
              {
                icon: '🎯',
                title: 'Excellence',
                description: 'We strive for excellence in every project and interaction.'
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'We conduct business with honesty and transparency.'
              },
              {
                icon: '💡',
                title: 'Innovation',
                description: 'We embrace new technologies and creative solutions.'
              },
              {
                icon: '🌟',
                title: 'Customer Success',
                description: 'Your success is our success. We\'re committed to your growth.'
              }
            ]
          }
        }
      ]),
      metaTitle: 'About Us - Our Story and Values',
      metaDescription: 'Learn about our mission, values, and the team behind our success. Discover what drives us to deliver exceptional results.',
      metaKeywords: 'about us, company story, values, mission, team',
      ogTitle: 'About Our Company',
      ogDescription: 'Learn about our mission, values, and the team behind our success.',
      isPublished: true,
      layout: 'public',
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  // 3. Create Services Page
  console.log('🛠️ Creating Services Page...')
  const servicesPage = await prisma.cmsPage.create({
    data: {
      title: 'Our Services',
      slug: 'services',
      description: 'Comprehensive business solutions tailored to your needs.',
      content: JSON.stringify([
        {
          id: 'hero-services',
          type: 'hero',
          component: 'HeroBlock',
          content: {
            title: 'Our Services',
            subtitle: 'Comprehensive Solutions',
            description: 'We offer a full range of services to help your business thrive in today\'s competitive landscape.',
            primaryButton: {
              text: 'Get Quote',
              href: '/contact',
              variant: 'primary'
            },
            secondaryButton: {
              text: 'View Portfolio',
              href: '/portfolio',
              variant: 'outline'
            },
            layout: 'centered'
          }
        },
        {
          id: 'features-services',
          type: 'features',
          component: 'FeaturesBlock',
          content: {
            title: 'What We Offer',
            subtitle: 'Our Services',
            description: 'From strategy to implementation, we provide end-to-end solutions.',
            layout: 'grid',
            features: [
              {
                icon: '💻',
                title: 'Web Development',
                description: 'Custom websites and web applications built with modern technologies.'
              },
              {
                icon: '📱',
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile applications for iOS and Android.'
              },
              {
                icon: '☁️',
                title: 'Cloud Solutions',
                description: 'Scalable cloud infrastructure and migration services.'
              },
              {
                icon: '📊',
                title: 'Data Analytics',
                description: 'Transform your data into actionable business insights.'
              },
              {
                icon: '🔒',
                title: 'Cybersecurity',
                description: 'Comprehensive security solutions to protect your digital assets.'
              },
              {
                icon: '🎯',
                title: 'Digital Strategy',
                description: 'Strategic consulting to guide your digital transformation.'
              }
            ]
          }
        }
      ]),
      metaTitle: 'Our Services - Comprehensive Business Solutions',
      metaDescription: 'Comprehensive business solutions tailored to your needs. Web development, mobile apps, cloud solutions, and more.',
      metaKeywords: 'services, web development, mobile apps, cloud solutions, consulting',
      ogTitle: 'Our Services',
      ogDescription: 'Comprehensive business solutions tailored to your needs.',
      isPublished: true,
      layout: 'public',
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  // 4. Create Contact Page
  console.log('📞 Creating Contact Page...')
  const contactPage = await prisma.cmsPage.create({
    data: {
      title: 'Contact Us',
      slug: 'contact',
      description: 'Get in touch with our team to discuss your project and requirements.',
      content: JSON.stringify([
        {
          id: 'hero-contact',
          type: 'hero',
          component: 'HeroBlock',
          content: {
            title: 'Get In Touch',
            subtitle: 'Contact Us',
            description: 'Ready to start your project? We\'d love to hear from you. Get in touch with our team today.',
            primaryButton: {
              text: 'Call Us Now',
              href: 'tel:+1234567890',
              variant: 'primary'
            },
            secondaryButton: {
              text: 'Send Email',
              href: 'mailto:hello@company.com',
              variant: 'outline'
            },
            layout: 'centered'
          }
        },
        {
          id: 'features-contact',
          type: 'features',
          component: 'FeaturesBlock',
          content: {
            title: 'How to Reach Us',
            subtitle: 'Contact Information',
            description: 'Multiple ways to get in touch with our team.',
            layout: 'grid',
            features: [
              {
                icon: '📧',
                title: 'Email Us',
                description: 'hello@company.com\\nSupport: support@company.com'
              },
              {
                icon: '📞',
                title: 'Call Us',
                description: '+1 (555) 123-4567\\nMon-Fri 9AM-6PM EST'
              },
              {
                icon: '📍',
                title: 'Visit Us',
                description: '123 Business Ave\\nSuite 100\\nCity, State 12345'
              },
              {
                icon: '💬',
                title: 'Live Chat',
                description: 'Available 24/7 on our website\\nInstant support and answers'
              }
            ]
          }
        }
      ]),
      metaTitle: 'Contact Us - Get In Touch Today',
      metaDescription: 'Get in touch with our team to discuss your project and requirements. Multiple ways to reach us.',
      metaKeywords: 'contact, get in touch, support, phone, email',
      ogTitle: 'Contact Us',
      ogDescription: 'Get in touch with our team to discuss your project and requirements.',
      isPublished: true,
      layout: 'public',
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  // 5. Update Site Settings to use Homepage
  console.log('⚙️ Updating Site Settings...')
  const existingSiteSettings = await prisma.cmsSiteSettings.findFirst()
  
  if (existingSiteSettings) {
    await prisma.cmsSiteSettings.update({
      where: { id: existingSiteSettings.id },
      data: {
        homepageId: homepage.id,
        updatedBy: adminUser.id
      }
    })
  } else {
    await prisma.cmsSiteSettings.create({
      data: {
        homepageId: homepage.id,
        headerStyle: 'full',
        showSearch: false,
        copyrightText: '© 2024 Our Company. All rights reserved.',
        showSocialLinks: true,
        contactEmail: 'hello@company.com',
        contactPhone: '+1 (555) 123-4567',
        contactAddress: '123 Business Ave, Suite 100, City, State 12345',
        updatedBy: adminUser.id
      }
    })
  }

  // 6. Update Navigation to link to CMS pages
  console.log('🧭 Updating Navigation...')
  
  // Clear existing navigation
  await prisma.cmsNavigation.deleteMany({})
  
  // Create new navigation structure
  const aboutNav = await prisma.cmsNavigation.create({
    data: {
      label: 'About',
      href: '',
      type: 'page',
      pageId: aboutPage.id,
      sortOrder: 1,
      isActive: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  const servicesNav = await prisma.cmsNavigation.create({
    data: {
      label: 'Services',
      href: '',
      type: 'page',
      pageId: servicesPage.id,
      sortOrder: 2,
      isActive: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  const contactNav = await prisma.cmsNavigation.create({
    data: {
      label: 'Contact',
      href: '',
      type: 'page',
      pageId: contactPage.id,
      sortOrder: 3,
      isActive: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
    }
  })

  console.log('✅ Sample CMS content created successfully!')
  console.log(`📄 Created pages:`)
  console.log(`   - Homepage: /${homepage.slug}`)
  console.log(`   - About: /${aboutPage.slug}`)
  console.log(`   - Services: /${servicesPage.slug}`)
  console.log(`   - Contact: /${contactPage.slug}`)
  console.log(`🏠 Homepage set in site settings`)
  console.log(`🧭 Navigation updated to link to CMS pages`)
  
  return {
    homepage,
    aboutPage,
    servicesPage,
    contactPage
  }
}

async function main() {
  try {
    await createSampleCmsContent()
  } catch (error) {
    console.error('Error creating sample content:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main()
}

export { createSampleCmsContent }
