import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.formLibrary.deleteMany()
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
      employeeId: `T${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Mathematics', 'Science', 'English', 'History', 'Arts']),
      subject: faker.helpers.arrayElement(['Algebra', 'Physics', 'Literature', 'World History', 'Painting']),
      yearsOfExperience: faker.number.int({ min: 1, max: 25 }),
      salary: faker.number.float({ min: 30000, max: 80000, multipleOf: 1000 }),
      hireDate: faker.date.past({ years: 10 }),
      isActive: faker.datatype.boolean(),
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
      employeeId: `D${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Cardiology', 'Neurology', 'Pediatrics', 'Surgery', 'Emergency']),
      specialization: faker.helpers.arrayElement(['Interventional Cardiology', 'Pediatric Neurology', 'General Surgery']),
      licenseNumber: `MD${faker.string.alphanumeric(8).toUpperCase()}`,
      yearsOfExperience: faker.number.int({ min: 2, max: 30 }),
      salary: faker.number.float({ min: 80000, max: 300000, multipleOf: 1000 }),
      isActive: faker.datatype.boolean(),
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
      employeeId: `E${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Software', 'Hardware', 'Civil', 'Mechanical', 'Electrical']),
      specialization: faker.helpers.arrayElement(['Full Stack Development', 'Machine Learning', 'Structural Design']),
      engineeringType: faker.helpers.arrayElement(['Software', 'Hardware', 'Civil', 'Mechanical', 'Electrical']),
      yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
      salary: faker.number.float({ min: 60000, max: 150000, multipleOf: 1000 }),
      isActive: faker.datatype.boolean(),
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
      employeeId: `L${faker.string.numeric(6)}`,
      department: faker.helpers.arrayElement(['Corporate', 'Criminal', 'Family', 'Real Estate', 'Intellectual Property']),
      practiceArea: faker.helpers.arrayElement(['Corporate Law', 'Criminal Defense', 'Family Law', 'Real Estate Law']),
      barNumber: `BAR${faker.string.alphanumeric(8).toUpperCase()}`,
      yearsOfExperience: faker.number.int({ min: 3, max: 25 }),
      salary: faker.number.float({ min: 70000, max: 200000, multipleOf: 1000 }),
      isActive: faker.datatype.boolean(),
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

  // Create sample Form Library entries
  const formLibraries = []
  for (let i = 0; i < 10; i++) {
    const user = faker.helpers.arrayElement(users)
    const formLibrary = {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      category: faker.helpers.arrayElement(['Basic', 'Advanced', 'Specialized']),
      isActive: faker.datatype.boolean(),
      sortOrder: i + 1,
      fieldType: faker.helpers.arrayElement([
        'input', 'select', 'textarea', 'checkbox', 'radio', 'file', 'date', 'time', 
        'datetime-local', 'month', 'week', 'number', 'range', 'color', 'search', 
        'tel', 'url', 'password', 'email', 'switch', 'slider', 'rating', 'tags'
      ]),
      isRequired: faker.datatype.boolean(),
      textField: faker.lorem.words(2),
      emailField: faker.internet.email(),
      passwordField: faker.internet.password(),
      phoneField: faker.phone.number().substring(0, 20),
      urlField: faker.internet.url(),
      searchField: faker.lorem.word(),
      textareaField: faker.lorem.paragraph(),
      richTextField: faker.lorem.paragraphs(2),
      numberField: faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }),
      integerField: faker.number.int({ min: 1, max: 1000 }),
      rangeField: faker.number.int({ min: 0, max: 100 }),
      sliderValue: faker.number.float({ min: 0, max: 100 }),
      dateField: faker.date.past(),
      timeField: faker.date.recent().toTimeString().slice(0, 5),
      dateTimeField: faker.date.recent(),
      monthField: faker.date.recent().toISOString().slice(0, 7),
      weekField: `2024-W${faker.number.int({ min: 1, max: 52 }).toString().padStart(2, '0')}`,
      singleSelect: faker.helpers.arrayElement(['Option A', 'Option B', 'Option C', 'Option D']),
      multiSelect: JSON.stringify(faker.helpers.arrayElements(['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'], { min: 1, max: 3 })),
      radioSelection: faker.helpers.arrayElement(['Radio A', 'Radio B', 'Radio C']),
      checkboxGroup: JSON.stringify(faker.helpers.arrayElements(['Check 1', 'Check 2', 'Check 3'], { min: 1, max: 2 })),
      switchField: faker.datatype.boolean(),
      checkboxField: faker.datatype.boolean(),
      colorField: faker.internet.color(),
      ratingField: faker.number.float({ min: 1, max: 5, multipleOf: 0.5 }),
      tagsField: JSON.stringify(faker.helpers.arrayElements(['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], { min: 1, max: 3 })),
      autocompleteField: faker.lorem.word(),
      comboboxField: faker.lorem.word(),
      multiInputField: JSON.stringify(faker.helpers.arrayElements(['input1', 'input2', 'input3'], { min: 1, max: 2 })),
      fieldSize: faker.helpers.arrayElement(['sm', 'md', 'lg']),
      fieldWidth: faker.helpers.arrayElement(['full', 'half', 'third', 'quarter']),
      inputMode: faker.helpers.arrayElement(['text', 'numeric', 'decimal', 'email', 'tel', 'url', 'search']),
      step: faker.number.float({ min: 0.01, max: 10, multipleOf: 0.01 }),
      multiple: faker.datatype.boolean(),
      placeholder: faker.lorem.words(2),
      helpText: faker.lorem.sentence(),
      cssClass: faker.helpers.arrayElement(['form-control', 'input-group', 'custom-field', 'enhanced-input']),
      userId: user.id,
    }
    formLibraries.push(formLibrary)
  }

  const createdFormLibraries = await prisma.formLibrary.createMany({
    data: formLibraries,
  })

  console.log(`✅ Created ${createdFormLibraries.count} Form Library records`)

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
