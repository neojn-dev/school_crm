import nodemailer from "nodemailer"
import { config } from "@/lib/config"

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
})

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${config.app.url}/auth/verify?token=${token}`
  
  await transporter.sendMail({
    from: config.email.from,
    to: email,
    subject: `Verify your email for ${config.app.name}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2>Verify your email address</h2>
        <p>Thank you for signing up for ${config.app.name}! Please click the link below to verify your email address:</p>
        <a href="${verifyUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #6b7280;">${verifyUrl}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${config.app.url}/auth/reset-password?token=${token}`
  
  await transporter.sendMail({
    from: config.email.from,
    to: email,
    subject: `Reset your password for ${config.app.name}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2>Reset your password</h2>
        <p>You requested a password reset for your ${config.app.name} account. Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Reset Password
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
      </div>
    `,
  })
}
