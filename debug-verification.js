const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🐛 Creating test user for debugging...')
  
  // Create a test user
  const passwordHash = await bcrypt.hash('testpass123', 12)
  
  const user = await prisma.user.create({
    data: {
      username: 'debuguser',
      email: 'debug@example.com',
      passwordHash,
      role: 'ROLE1',
      // Don't set emailVerified - let it be null
    }
  })
  
  console.log(`👤 Created test user: ${user.username} (${user.email})`)
  console.log(`📧 Verification status: ${user.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}`)
  
  // Create verification token
  const token = generateRandomString(32)
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  
  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id,
      expires
    }
  })
  
  console.log('🔑 Verification token created')
  console.log(`📝 Token: ${token}`)
  console.log(`⏰ Expires: ${expires}`)
  console.log(`🔗 Verification URL: http://localhost:3000/auth/verify?token=${token}`)
  
  console.log('\n🔍 Now I will test this step by step...')
  
  // Step 1: Check initial state
  console.log('\n📊 Step 1: Initial database state')
  const initialUser = await prisma.user.findUnique({ where: { id: user.id } })
  console.log(`   User verified: ${initialUser.emailVerified ? 'YES' : 'NO'}`)
  
  const initialToken = await prisma.verificationToken.findUnique({ where: { token } })
  console.log(`   Token exists: ${initialToken ? 'YES' : 'NO'}`)
  
  // Step 2: Test API directly
  console.log('\n📡 Step 2: Testing API directly')
  const response = await fetch(`http://localhost:3000/api/auth/verify?token=${token}`)
  console.log(`   API Status: ${response.status}`)
  console.log(`   API OK: ${response.ok}`)
  
  if (response.ok) {
    const data = await response.json()
    console.log(`   API Response:`, data)
  } else {
    const errorData = await response.json()
    console.log(`   API Error:`, errorData)
  }
  
  // Step 3: Check final state
  console.log('\n📊 Step 3: Final database state')
  const finalUser = await prisma.user.findUnique({ where: { id: user.id } })
  console.log(`   User verified: ${finalUser.emailVerified ? 'YES' : 'NO'}`)
  
  const finalToken = await prisma.verificationToken.findUnique({ where: { token } })
  console.log(`   Token exists: ${finalToken ? 'YES' : 'NO'}`)
  
  console.log('\n🎯 Analysis complete!')
}

function generateRandomString(length = 32) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
