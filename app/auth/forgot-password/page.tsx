"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles,
  Shield,
  Clock,
  MessageSquare
} from "lucide-react"
import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

const features = [
  {
    icon: Shield,
    title: "Secure Process",
    description: "Your password reset is encrypted and secure"
  },
  {
    icon: Clock,
    title: "Quick Recovery",
    description: "Get back to your account in minutes"
  },
  {
    icon: MessageSquare,
    title: "Email Delivery",
    description: "Instant delivery to your inbox"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        console.error('Forgot password error:', errorData)
        // Still show success to prevent email enumeration
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Network error:', error)
      // Still show success to prevent email enumeration
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: getValues("email") }),
      })

      if (response.ok) {
        // Show success message or toast
        console.log('Password reset email resent successfully')
      } else {
        console.error('Failed to resend email')
      }
    } catch (error) {
      console.error('Network error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
        <WebsiteHeader />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  We've sent a password reset link to{" "}
                  <span className="font-semibold text-blue-600">{getValues("email")}</span>
                </p>
                <p className="text-gray-500 max-w-md mx-auto">
                  Click the link in your email to reset your password. The link will expire in 24 hours.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <Button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full md:w-auto h-12 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Resend Email
                      <Mail className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    <Link href="/auth/signin">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Sign In
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    <Link href="/auth/signup">
                      Create New Account
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
              >
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you don't see the email, check your spam folder or contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    View Help Center
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <WebsiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <WebsiteHeader />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="max-w-md mx-auto lg:mx-0">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center lg:text-left mb-8"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 blur"></div>
                    </div>
                    <span className="font-bold text-2xl text-gray-900">Reset Password</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Forgot your password?
                  </h1>
                  <p className="text-gray-600 text-lg">
                    No worries! We'll send you reset instructions.
                  </p>
                </motion.div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Send Reset Link
                        <Mail className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {/* Back to Sign In */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center pt-4"
                  >
                    <Link
                      href="/auth/signin"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Sign In
                    </Link>
                  </motion.div>
                </motion.form>

                {/* Additional Help */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Remember your password?</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Try signing in with your usual password. If you're still having trouble, we're here to help.
                  </p>
                  <Link
                    href="/auth/signin"
                    className="text-blue-700 hover:text-blue-800 font-medium text-sm transition-colors"
                  >
                    Try signing in →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Features & Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative p-8 lg:p-12">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {/* Main Visual */}
                    <motion.div
                      variants={itemVariants}
                      className="text-center mb-12"
                    >
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Mail className="h-16 w-16 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Quick & Secure
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Password recovery made simple
                      </p>
                    </motion.div>

                    {/* Features List */}
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Security Info */}
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">Security First</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Your password reset link is encrypted and will expire automatically for your security.
                      </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-3 gap-4 pt-6"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24h</div>
                        <div className="text-xs text-gray-500">Link Expiry</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">256-bit</div>
                        <div className="text-xs text-gray-500">Encryption</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">99.9%</div>
                        <div className="text-xs text-gray-500">Success Rate</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full opacity-60"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
