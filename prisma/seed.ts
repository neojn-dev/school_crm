import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.upload.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.passwordResetToken.deleteMany()
  await prisma.user.deleteMany()
  await prisma.role.deleteMany()

  // Create default roles first
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      description: 'Full system administrator with complete access',
      isActive: true,
    },
  })

  const managerRole = await prisma.role.create({
    data: {
      name: 'Manager',
      description: 'Management role for overseeing operations',
      isActive: true,
    },
  })

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
      description: 'Standard user role for regular system access',
      isActive: true,
    },
  })

  // Create test users
  const passwordHash = await bcrypt.hash('password123', 12)
  
  const users = await Promise.all([
    // Admin user
    prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@example.com',
        passwordHash,
        firstName: 'Admin',
        lastName: 'User',
        roleId: adminRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    // Manager user
    prisma.user.create({
      data: {
        username: 'manager',
        email: 'manager@example.com',
        passwordHash,
        firstName: 'Sarah',
        lastName: 'Johnson',
        roleId: managerRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    // Regular users (8 additional users)
    prisma.user.create({
      data: {
        username: 'analyst',
        email: 'analyst@example.com',
        passwordHash,
        firstName: 'Michael',
        lastName: 'Chen',
        roleId: userRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'jdoe',
        email: 'john.doe@example.com',
        passwordHash,
        firstName: 'John',
        lastName: 'Doe',
        roleId: userRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'asmith',
        email: 'alice.smith@example.com',
        passwordHash,
        firstName: 'Alice',
        lastName: 'Smith',
        roleId: userRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'bwilson',
        email: 'bob.wilson@example.com',
        passwordHash,
        firstName: 'Bob',
        lastName: 'Wilson',
        roleId: managerRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'cdavis',
        email: 'carol.davis@example.com',
        passwordHash,
        firstName: 'Carol',
        lastName: 'Davis',
        roleId: userRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'dlee',
        email: 'david.lee@example.com',
        passwordHash,
        firstName: 'David',
        lastName: 'Lee',
        roleId: userRole.id,
        emailVerified: new Date(),
        isActive: false, // Inactive user for testing
      },
    }),
    prisma.user.create({
      data: {
        username: 'emartinez',
        email: 'elena.martinez@example.com',
        passwordHash,
        firstName: 'Elena',
        lastName: 'Martinez',
        roleId: userRole.id,
        emailVerified: new Date(),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'fthompson',
        email: 'frank.thompson@example.com',
        passwordHash,
        firstName: 'Frank',
        lastName: 'Thompson',
        roleId: userRole.id,
        emailVerified: null, // Unverified user for testing
        isActive: true,
      },
    }),
  ])

  console.log(`✅ Created ${users.length} test users`)

  console.log('🎉 Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`  • 3 Roles created`)
  console.log(`  • ${users.length} Users created`)
  console.log('\n📋 Test accounts (all use password: password123):')
  console.log('  🔑 Admin: admin@example.com (Admin role)')
  console.log('  👥 Manager: manager@example.com (Manager role)')
  console.log('  👤 Analyst: analyst@example.com (User role)')
  console.log('  👤 John Doe: john.doe@example.com (User role)')
  console.log('  👤 Alice Smith: alice.smith@example.com (User role)')
  console.log('  👥 Bob Wilson: bob.wilson@example.com (Manager role)')
  console.log('  👤 Carol Davis: carol.davis@example.com (User role)')
  console.log('  ❌ David Lee: david.lee@example.com (User role - INACTIVE)')
  console.log('  👤 Elena Martinez: elena.martinez@example.com (User role)')
  console.log('  ⚠️  Frank Thompson: frank.thompson@example.com (User role - UNVERIFIED)')
  console.log('\n🔐 All users have the same password: password123')
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
