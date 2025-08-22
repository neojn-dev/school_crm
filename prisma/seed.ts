import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create test users for each role
  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@example.com',
        passwordHash: await bcrypt.hash('password123', 12),
        role: 'ROLE1',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { username: 'manager' },
      update: {},
      create: {
        username: 'manager',
        email: 'manager@example.com',
        passwordHash: await bcrypt.hash('password123', 12),
        role: 'ROLE2',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { username: 'analyst' },
      update: {},
      create: {
        username: 'analyst',
        email: 'analyst@example.com',
        passwordHash: await bcrypt.hash('password123', 12),
        role: 'ROLE3',
        emailVerified: new Date(),
      },
    }),
  ])

  console.log(`✅ Created ${users.length} test users`)

  // Generate 50 MyData records
  const myDataRecords = []
  
  for (let i = 0; i < 50; i++) {
    const user = faker.helpers.arrayElement(users)
    
    const record = {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      passwordHash: faker.internet.password(),
      age: faker.number.int({ min: 18, max: 80 }),
      balance: parseFloat(faker.finance.amount()),
      rating: parseFloat(faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }).toFixed(1)),
      isActive: faker.datatype.boolean(),
      category: faker.helpers.arrayElement(['A', 'B', 'C'] as const),
      dateOnly: faker.date.past().toISOString().split('T')[0],
      dateTime: faker.date.recent().toISOString().slice(0, 16),
      timeOnly: faker.date.recent().toTimeString().slice(0, 5),
      website: faker.internet.url(),
      avatarUrl: faker.image.avatar(),
      color: faker.internet.color(),
      tags: JSON.stringify(
        faker.helpers.arrayElements([
          'important', 'urgent', 'review', 'approved', 'pending', 
          'completed', 'draft', 'archived', 'featured', 'priority'
        ], { min: 1, max: 4 })
      ),
      userId: user.id,
    }
    
    myDataRecords.push(record)
  }

  // Insert all records
  const createdRecords = await prisma.myData.createMany({
    data: myDataRecords,
  })

  console.log(`✅ Created ${createdRecords.count} MyData records`)

  // Create some sample uploads
  const uploads = [
    {
      filename: 'sample-document.pdf',
      originalName: 'Sample Document.pdf',
      mimeType: 'application/pdf',
      size: 1024000,
      path: '/uploads/sample-document.pdf',
      userId: users[0].id,
    },
    {
      filename: 'profile-image.jpg',
      originalName: 'Profile Image.jpg',
      mimeType: 'image/jpeg',
      size: 512000,
      path: '/uploads/profile-image.jpg',
      userId: users[1].id,
    },
    {
      filename: 'data-export.csv',
      originalName: 'Data Export.csv',
      mimeType: 'text/csv',
      size: 256000,
      path: '/uploads/data-export.csv',
      userId: users[2].id,
    },
  ]

  const createdUploads = await prisma.upload.createMany({
    data: uploads,
  })

  console.log(`✅ Created ${createdUploads.count} upload records`)

  console.log('🎉 Database seeded successfully!')
  console.log('\n📋 Test accounts:')
  console.log('  Admin: admin / password123 (ROLE1)')
  console.log('  Manager: manager / password123 (ROLE2)')
  console.log('  Analyst: analyst / password123 (ROLE3)')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
