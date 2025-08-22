const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌐 Creating test user for FRONTEND testing...')
  
  // Create a test user
  const passwordHash = await bcrypt.hash('testpass123', 12)
  
  const user = await prisma.user.create({
    data: {
      username: 'frontendfresh',
      email: 'frontendfresh@example.com',
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
  
  console.log('\n⚠️  IMPORTANT: This token is FRESH and UNUSED!')
  console.log('📋 Now test the frontend:')
  console.log('1. Open the verification URL above in your browser')
  console.log('2. Check what message appears')
  console.log('3. Check browser console for logs')
  
  // Verify the token exists and user is unverified
  const checkUser = await prisma.user.findUnique({ where: { id: user.id } })
  const checkToken = await prisma.verificationToken.findUnique({ where: { token } })
  
  console.log('\n📊 Current state:')
  console.log(`   User verified: ${checkUser.emailVerified ? 'YES' : 'NO'}`)
  console.log(`   Token exists: ${checkToken ? 'YES' : 'NO'}`)
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
