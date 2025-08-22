const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Fixing user account...')
  
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email: 'mail.gyansh@gmail.com' }
  })
  
  if (!user) {
    console.log('❌ User not found')
    return
  }
  
  console.log(`👤 Found user: ${user.username} (${user.email})`)
  console.log(`📧 Current verification status: ${user.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}`)
  
  // Make user unverified
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: null }
  })
  
  console.log('✅ User marked as unverified')
  
  // Create new verification token
  const token = generateRandomString(32)
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  
  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id,
      expires
    }
  })
  
  console.log('🔑 New verification token created')
  console.log(`📝 Token: ${token}`)
  console.log(`⏰ Expires: ${expires}`)
  console.log(`🔗 Verification URL: http://localhost:3000/auth/verify?token=${token}`)
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
