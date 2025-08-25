import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCmsBlocks() {
  console.log('🌱 Seeding CMS blocks...')

  // Get the first admin user for created/updated by fields
  const adminUser = await prisma.user.findFirst({
    include: { role: true }
  })

  if (!adminUser) {
    console.error('No admin user found. Please create a user first.')
    return
  }

  // Create Hero Block
  let heroBlock = await prisma.cmsBlock.findFirst({
    where: { component: 'HeroBlock' }
  })
  
  if (!heroBlock) {
    heroBlock = await prisma.cmsBlock.create({
      data: {
      name: 'Hero Section',
      type: 'hero',
      category: 'layout',
      description: 'A prominent hero section with title, description, and call-to-action buttons',
      component: 'HeroBlock',
      props: JSON.stringify({
        title: { type: 'text', label: 'Title', required: true },
        subtitle: { type: 'text', label: 'Subtitle' },
        description: { type: 'textarea', label: 'Description' },
        primaryButton: {
          type: 'object',
          label: 'Primary Button',
          properties: {
            text: { type: 'text', label: 'Button Text' },
            href: { type: 'text', label: 'Button Link' }
          }
        },
        secondaryButton: {
          type: 'object',
          label: 'Secondary Button',
          properties: {
            text: { type: 'text', label: 'Button Text' },
            href: { type: 'text', label: 'Button Link' }
          }
        },
        backgroundType: {
          type: 'select',
          label: 'Background Type',
          options: [
            { value: 'gradient', label: 'Gradient' },
            { value: 'image', label: 'Image' },
            { value: 'solid', label: 'Solid Color' }
          ]
        },
        textAlign: {
          type: 'select',
          label: 'Text Alignment',
          options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' }
          ]
        }
      }),
      defaultContent: JSON.stringify({
        title: 'Welcome to Our Platform',
        subtitle: 'Innovative Solutions',
        description: 'Transform your business with our cutting-edge technology and expert guidance.',
        primaryButton: { text: 'Get Started', href: '/signup' },
        secondaryButton: { text: 'Learn More', href: '/about' },
        backgroundType: 'gradient',
        textAlign: 'center'
      }),
      isReusable: true,
      isSystem: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
      }
    })
  }

  // Create Features Block
  let featuresBlock = await prisma.cmsBlock.findFirst({
    where: { component: 'FeaturesBlock' }
  })
  
  if (!featuresBlock) {
    featuresBlock = await prisma.cmsBlock.create({
      data: {
      name: 'Features Section',
      type: 'features',
      category: 'content',
      description: 'Showcase key features with icons, titles, and descriptions',
      component: 'FeaturesBlock',
      props: JSON.stringify({
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        description: { type: 'textarea', label: 'Description' },
        layout: {
          type: 'select',
          label: 'Layout',
          options: [
            { value: 'grid-2', label: '2 Columns' },
            { value: 'grid-3', label: '3 Columns' },
            { value: 'grid-4', label: '4 Columns' },
            { value: 'list', label: 'List View' }
          ]
        },
        showIcons: { type: 'boolean', label: 'Show Icons' }
      }),
      defaultContent: JSON.stringify({
        title: 'Why Choose Us',
        subtitle: 'Our Features',
        description: 'Discover the powerful features that make our platform the perfect choice.',
        layout: 'grid-3',
        showIcons: true,
        features: [
          {
            icon: 'zap',
            title: 'Lightning Fast',
            description: 'Experience blazing fast performance with our optimized infrastructure.'
          },
          {
            icon: 'shield',
            title: 'Secure & Reliable',
            description: 'Your data is protected with enterprise-grade security measures.'
          },
          {
            icon: 'users',
            title: 'Team Collaboration',
            description: 'Work seamlessly with your team using our advanced collaboration tools.'
          }
        ]
      }),
      isReusable: true,
      isSystem: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
      }
    })
  }

  // Create Testimonials Block
  let testimonialsBlock = await prisma.cmsBlock.findFirst({
    where: { component: 'TestimonialsBlock' }
  })
  
  if (!testimonialsBlock) {
    testimonialsBlock = await prisma.cmsBlock.create({
      data: {
      name: 'Testimonials Section',
      type: 'testimonials',
      category: 'content',
      description: 'Display customer testimonials with ratings and author information',
      component: 'TestimonialsBlock',
      props: JSON.stringify({
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        description: { type: 'textarea', label: 'Description' },
        layout: {
          type: 'select',
          label: 'Layout',
          options: [
            { value: 'grid', label: 'Grid' },
            { value: 'carousel', label: 'Carousel' },
            { value: 'single', label: 'Single' }
          ]
        },
        showRatings: { type: 'boolean', label: 'Show Ratings' }
      }),
      defaultContent: JSON.stringify({
        title: 'What Our Customers Say',
        subtitle: 'Testimonials',
        description: 'Don\'t just take our word for it. Here\'s what our satisfied customers have to say.',
        layout: 'grid',
        showRatings: true,
        testimonials: [
          {
            name: 'Sarah Johnson',
            role: 'CEO',
            company: 'TechStart Inc.',
            content: 'This platform has completely transformed how we manage our business operations.',
            rating: 5
          },
          {
            name: 'Michael Chen',
            role: 'Product Manager',
            company: 'InnovateCorp',
            content: 'The customer support is exceptional, and the platform\'s reliability is unmatched.',
            rating: 5
          },
          {
            name: 'Emily Rodriguez',
            role: 'Marketing Director',
            company: 'GrowthLab',
            content: 'The analytics and insights provided have helped us make better data-driven decisions.',
            rating: 5
          }
        ]
      }),
      isReusable: true,
      isSystem: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
      }
    })
  }

  // Create a sample template
  let businessTemplate = await prisma.cmsTemplate.findFirst({
    where: { name: 'Business Homepage' }
  })
  
  if (!businessTemplate) {
    businessTemplate = await prisma.cmsTemplate.create({
      data: {
      name: 'Business Homepage',
      description: 'A modern business homepage template with hero, features, and testimonials',
      category: 'business',
      structure: JSON.stringify({
        sections: ['hero', 'features', 'testimonials'],
        layout: 'public'
      }),
      layout: 'public',
      defaultBlocks: JSON.stringify([
        { blockId: heroBlock.id, section: 'main', sortOrder: 0 },
        { blockId: featuresBlock.id, section: 'main', sortOrder: 1 },
        { blockId: testimonialsBlock.id, section: 'main', sortOrder: 2 }
      ]),
      isActive: true,
      isSystem: true,
      createdBy: adminUser.id,
      updatedBy: adminUser.id
      }
    })
  }

  // Create SEO settings
  let seoSettings = await prisma.cmsSeoSettings.findFirst()
  
  if (!seoSettings) {
    await prisma.cmsSeoSettings.create({
      data: {
      siteName: 'Your Company Name',
      siteDescription: 'Your company description for SEO',
      robotsTxt: `User-agent: *
Allow: /

Sitemap: /sitemap.xml`,
      updatedBy: adminUser.id
      }
    })
  }

  // Create default site settings
  let siteSettings = await prisma.cmsSiteSettings.findFirst()
  if (!siteSettings) {
    siteSettings = await prisma.cmsSiteSettings.create({
      data: {
        headerStyle: 'full',
        showSearch: false,
        copyrightText: '© 2024 Your Website. All rights reserved.',
        showSocialLinks: true,
        updatedBy: adminUser.id
      }
    })
    console.log('✅ Created default site settings')
  }

  // Create default navigation items
  const existingNavigation = await prisma.cmsNavigation.findFirst()
  if (!existingNavigation) {
    // Create About dropdown
    const aboutDropdown = await prisma.cmsNavigation.create({
      data: {
        label: 'About',
        href: '#',
        type: 'dropdown',
        sortOrder: 1,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    // Create Services dropdown
    const servicesDropdown = await prisma.cmsNavigation.create({
      data: {
        label: 'Services',
        href: '#',
        type: 'dropdown',
        sortOrder: 2,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    // Create Contact link
    await prisma.cmsNavigation.create({
      data: {
        label: 'Contact',
        href: '/contact',
        type: 'external',
        sortOrder: 3,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    // Create About sub-items
    await prisma.cmsNavigation.create({
      data: {
        label: 'Our Story',
        href: '/about',
        type: 'external',
        parentId: aboutDropdown.id,
        sortOrder: 1,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    await prisma.cmsNavigation.create({
      data: {
        label: 'Team',
        href: '/team',
        type: 'external',
        parentId: aboutDropdown.id,
        sortOrder: 2,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    // Create Services sub-items
    await prisma.cmsNavigation.create({
      data: {
        label: 'Web Development',
        href: '/services/web-development',
        type: 'external',
        parentId: servicesDropdown.id,
        sortOrder: 1,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    await prisma.cmsNavigation.create({
      data: {
        label: 'Consulting',
        href: '/services/consulting',
        type: 'external',
        parentId: servicesDropdown.id,
        sortOrder: 2,
        isActive: true,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    })

    console.log('✅ Created default navigation structure')
  }

  console.log('✅ CMS blocks seeded successfully!')
  console.log(`Created blocks: ${[heroBlock.name, featuresBlock.name, testimonialsBlock.name].join(', ')}`)
  console.log(`Created template: ${businessTemplate.name}`)
}

async function main() {
  try {
    await seedCmsBlocks()
  } catch (error) {
    console.error('Error seeding CMS:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main()
}

export { seedCmsBlocks }
