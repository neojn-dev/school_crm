import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.upload.deleteMany()
  await prisma.lawyer.deleteMany()
  await prisma.engineer.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.passwordResetToken.deleteMany()
  await prisma.user.deleteMany()

  // Create test users
  const passwordHash = await bcrypt.hash('password123', 12)
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@example.com',
        passwordHash,
        role: 'ROLE1',
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        username: 'manager',
        email: 'manager@example.com',
        passwordHash,
        role: 'ROLE2',
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        username: 'analyst',
        email: 'analyst@example.com',
        passwordHash,
        role: 'ROLE3',
        emailVerified: new Date(),
      },
    }),
  ])

  console.log(`✅ Created ${users.length} test users`)

  // Create sample Teachers
  const teachers = []
  for (let i = 0; i < 10; i++) {
    const user = faker.helpers.arrayElement(users)
    const teacher = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.past({ years: 30 }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      employeeId: `T${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Mathematics', 'Science', 'English', 'History', 'Arts']),
      subject: faker.helpers.arrayElement(['Algebra', 'Physics', 'Literature', 'World History', 'Painting']),
      gradeLevel: faker.helpers.arrayElement(['Elementary', 'Middle School', 'High School', 'College']),
      yearsOfExperience: faker.number.int({ min: 1, max: 25 }),
      salary: faker.number.float({ min: 30000, max: 80000, multipleOf: 1000 }),
      hireDate: faker.date.past({ years: 10 }),
      isActive: faker.datatype.boolean(),
      highestDegree: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']),
      university: faker.company.name(),
      graduationYear: faker.number.int({ min: 1990, max: 2020 }),
      certifications: JSON.stringify(['Teaching License', 'Subject Certification']),
      specializations: JSON.stringify(['Special Education', 'Gifted Students']),
      performanceRating: faker.number.float({ min: 3.0, max: 5.0, multipleOf: 0.1 }),
      studentSatisfaction: faker.number.float({ min: 3.0, max: 5.0, multipleOf: 0.1 }),
      attendanceRate: faker.number.float({ min: 80, max: 100, multipleOf: 0.1 }),
      bio: faker.lorem.paragraph(),
      profileImage: faker.image.avatar(),
      emergencyContact: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      notes: faker.lorem.sentence(),
      userId: user.id,
    }
    teachers.push(teacher)
  }

  const createdTeachers = await prisma.teacher.createMany({
    data: teachers,
  })
  console.log(`✅ Created ${createdTeachers.count} Teacher records`)

  // Create sample Doctors
  const doctors = []
  for (let i = 0; i < 10; i++) {
    const user = faker.helpers.arrayElement(users)
    const doctor = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.past({ years: 35 }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      employeeId: `D${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Cardiology', 'Neurology', 'Pediatrics', 'Surgery', 'Emergency']),
      specialization: faker.helpers.arrayElement(['Interventional Cardiology', 'Pediatric Neurology', 'General Surgery']),
      licenseNumber: `MD${faker.string.alphanumeric(8).toUpperCase()}`,
      yearsOfExperience: faker.number.int({ min: 2, max: 30 }),
      salary: faker.number.float({ min: 80000, max: 300000, multipleOf: 1000 }),
      hireDate: faker.date.past({ years: 15 }),
      isActive: faker.datatype.boolean(),
      medicalSchool: faker.company.name(),
      graduationYear: faker.number.int({ min: 1985, max: 2015 }),
      boardCertifications: JSON.stringify(['Board Certified', 'Fellowship Trained']),
      languages: JSON.stringify(['English', 'Spanish', 'French']),
      patientSatisfaction: faker.number.float({ min: 3.5, max: 5.0, multipleOf: 0.1 }),
      successRate: faker.number.float({ min: 80, max: 99, multipleOf: 0.1 }),
      averageWaitTime: faker.number.int({ min: 10, max: 60 }),
      workingHours: JSON.stringify({ start: '8:00 AM', end: '5:00 PM' }),
      onCallSchedule: JSON.stringify({ frequency: 'Weekly', rotation: 'Every 4th week' }),
      bio: faker.lorem.paragraph(),
      profileImage: faker.image.avatar(),
      emergencyContact: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      notes: faker.lorem.sentence(),
      userId: user.id,
    }
    doctors.push(doctor)
  }

  const createdDoctors = await prisma.doctor.createMany({
    data: doctors,
  })
  console.log(`✅ Created ${createdDoctors.count} Doctor records`)

  // Create sample Engineers
  const engineers = []
  for (let i = 0; i < 10; i++) {
    const user = faker.helpers.arrayElement(users)
    const engineer = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.past({ years: 30 }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      employeeId: `E${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Software', 'Hardware', 'Civil', 'Mechanical', 'Electrical']),
      specialization: faker.helpers.arrayElement(['Full Stack Development', 'Machine Learning', 'Structural Design']),
      engineeringType: faker.helpers.arrayElement(['Software', 'Hardware', 'Civil', 'Mechanical', 'Electrical']),
      yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
      salary: faker.number.float({ min: 60000, max: 150000, multipleOf: 1000 }),
      hireDate: faker.date.past({ years: 8 }),
      isActive: faker.datatype.boolean(),
      highestDegree: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']),
      university: faker.company.name(),
      graduationYear: faker.number.int({ min: 1995, max: 2022 }),
      certifications: JSON.stringify(['AWS Certified', 'Google Cloud Certified']),
      technicalSkills: JSON.stringify(['JavaScript', 'Python', 'React', 'Node.js']),
      projectSuccessRate: faker.number.float({ min: 70, max: 100, multipleOf: 0.1 }),
      codeQuality: faker.number.float({ min: 3.0, max: 5.0, multipleOf: 0.1 }),
      innovationScore: faker.number.float({ min: 3.0, max: 5.0, multipleOf: 0.1 }),
      programmingLanguages: JSON.stringify(['JavaScript', 'Python', 'Java', 'C++']),
      frameworks: JSON.stringify(['React', 'Node.js', 'Django', 'Spring']),
      tools: JSON.stringify(['Git', 'Docker', 'Jenkins', 'Jira']),
      bio: faker.lorem.paragraph(),
      profileImage: faker.image.avatar(),
      emergencyContact: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      notes: faker.lorem.sentence(),
      userId: user.id,
    }
    engineers.push(engineer)
  }

  const createdEngineers = await prisma.engineer.createMany({
    data: engineers,
  })
  console.log(`✅ Created ${createdEngineers.count} Engineer records`)

  // Create sample Lawyers
  const lawyers = []
  for (let i = 0; i < 10; i++) {
    const user = faker.helpers.arrayElement(users)
    const lawyer = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.past({ years: 32 }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      employeeId: `L${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Corporate', 'Criminal', 'Family', 'Real Estate', 'Intellectual Property']),
      practiceArea: faker.helpers.arrayElement(['Corporate Law', 'Criminal Defense', 'Family Law', 'Real Estate Law']),
      barNumber: `BAR${faker.string.alphanumeric(8).toUpperCase()}`,
      yearsOfExperience: faker.number.int({ min: 3, max: 25 }),
      salary: faker.number.float({ min: 70000, max: 200000, multipleOf: 1000 }),
      hireDate: faker.date.past({ years: 12 }),
      isActive: faker.datatype.boolean(),
      lawSchool: faker.company.name(),
      graduationYear: faker.number.int({ min: 1990, max: 2018 }),
      barAdmissions: JSON.stringify(['State Bar', 'Federal Court']),
      specializations: JSON.stringify(['Corporate Litigation', 'Mergers & Acquisitions']),
      caseSuccessRate: faker.number.float({ min: 75, max: 98, multipleOf: 0.1 }),
      clientSatisfaction: faker.number.float({ min: 3.5, max: 5.0, multipleOf: 0.1 }),
      averageCaseDuration: faker.number.int({ min: 30, max: 365 }),
      courtExperience: JSON.stringify(['State Court', 'Federal Court', 'Appellate Court']),
      languages: JSON.stringify(['English', 'Spanish', 'Mandarin']),
      bio: faker.lorem.paragraph(),
      profileImage: faker.image.avatar(),
      emergencyContact: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      notes: faker.lorem.sentence(),
      userId: user.id,
    }
    lawyers.push(lawyer)
  }

  const createdLawyers = await prisma.lawyer.createMany({
    data: lawyers,
  })
  console.log(`✅ Created ${createdLawyers.count} Lawyer records`)

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
