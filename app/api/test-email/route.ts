import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json()
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify connection
    await transporter.verify()
    console.log("✅ SMTP connection verified")

    // Send test email
    const info = await transporter.sendMail({
      from: `"NextJS Template" <${process.env.FROM_EMAIL}>`,
      to: to || "mail.gyansh@gmail.com",
      subject: subject || "Test Email from NextJS Template",
      text: message || "This is a test email to verify the email configuration is working.",
      html: `<h1>Test Email</h1><p>${message || "This is a test email to verify the email configuration is working."}</p>`,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
    })

  } catch (error: any) {
    console.error("Test email failed:", error)
    
    let errorMessage = "Failed to send test email"
    let errorDetails = error.message
    
    if (error.code === "EAUTH") {
      errorMessage = "SMTP Authentication failed"
      errorDetails = "Check your SMTP_USER and SMTP_PASS in .env file"
    } else if (error.code === "ECONNECTION") {
      errorMessage = "SMTP Connection failed"
      errorDetails = "Check your SMTP_HOST and SMTP_PORT in .env file"
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
        code: error.code,
      },
      { status: 500 }
    )
  }
}

