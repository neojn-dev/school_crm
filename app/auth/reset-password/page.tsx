"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Eye, 
  EyeOff, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Key,
  AlertCircle
} from "lucide-react"
import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(/(?=.*[@$!%*?&])/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

const passwordRequirements = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "lowercase", label: "One lowercase letter", regex: /(?=.*[a-z])/ },
  { id: "uppercase", label: "One uppercase letter", regex: /(?=.*[A-Z])/ },
  { id: "number", label: "One number", regex: /(?=.*\d)/ },
  { id: "special", label: "One special character", regex: /(?=.*[@$!%*?&])/ },
]

const features = [
  {
    icon: Shield,
    title: "Strong Security",
    description: "Your new password meets enterprise security standards"
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Get back to your account immediately"
  },
  {
    icon: Key,
    title: "Unique & Secure",
    description: "Generated with industry best practices"
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

function ResetPasswordPageContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const watchedPassword = watch("password")

  // Check if token is present
  useEffect(() => {
    if (!token) {
      setError("No reset token provided. Please use the link from your email.")
    }
  }, [token])

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      setError("No reset token provided")
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to reset password")
      }
    } catch (error) {
      console.error('Network error:', error)
      setError("Network error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setValue("password", value)
  }

  const getRequirementStatus = (regex: RegExp) => {
    return regex.test(password)
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
                  Password Reset Successfully!
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Your password has been updated and you can now sign in with your new credentials.
                </p>
                <p className="text-gray-500 max-w-md mx-auto">
                  For security reasons, you've been logged out of all devices. Please sign in again with your new password.
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
                  asChild
                  className="w-full md:w-auto h-12 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                >
                  <Link href="/auth/signin">
                    Sign In Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    <Link href="/">
                      Go to Homepage
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

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 p-6 bg-green-50 rounded-2xl border border-green-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Security Notice</h3>
                </div>
                <p className="text-green-700 text-sm">
                  Your password has been securely updated. For your protection, we recommend using a password manager 
                  and enabling two-factor authentication on your account.
                </p>
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
      
      <main className="flex-1 flex items-center justify-center p-4 py-12">
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
                    <span className="font-bold text-2xl text-gray-900">New Password</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Create a new password
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Choose a strong password to secure your account
                  </p>
                </motion.div>

                {/* Token Validation */}
                {!token && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-red-800">Invalid Reset Link</h3>
                        <p className="text-red-700 text-sm">
                          This password reset link is invalid or has expired. Please request a new password reset.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        asChild
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        <Link href="/auth/forgot-password">
                          Request New Reset Link
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  style={{ opacity: !token ? 0.5 : 1 }}
                >
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline"> {error}</span>
                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <AlertCircle className="h-5 w-5" />
                      </span>
                    </motion.div>
                  )}
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        className="pl-10 pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                        {...register("password")}
                        onChange={handlePasswordChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-3"
                  >
                    <Label className="text-sm font-semibold text-gray-700">
                      Password Requirements
                    </Label>
                    <div className="space-y-2">
                      {passwordRequirements.map((requirement) => {
                        const isMet = getRequirementStatus(requirement.regex)
                        return (
                          <div
                            key={requirement.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                              isMet 
                                ? 'bg-green-50 border border-green-200' 
                                : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isMet ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {isMet && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            <span className={`text-sm ${
                              isMet ? 'text-green-700' : 'text-gray-600'
                            }`}>
                              {requirement.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        className="pl-10 pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || !token}
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
                        Reset Password
                        <CheckCircle className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {/* Back to Sign In */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center pt-4"
                  >
                    <Link
                      href="/auth/signin"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Back to Sign In
                    </Link>
                  </motion.div>
                </motion.form>

                {/* Security Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <h3 className="font-semibold text-blue-900 mb-2">🔒 Password Security Tips</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Use a unique password for each account</li>
                    <li>• Consider using a password manager</li>
                    <li>• Enable two-factor authentication</li>
                    <li>• Never share your password with anyone</li>
                  </ul>
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
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-3xl"></div>
                
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
                      <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Key className="h-16 w-16 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Secure & Strong
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Your security is our priority
                      </p>
                    </motion.div>

                    {/* Features List */}
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
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
                      className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Enterprise Security</span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Your new password will be encrypted using industry-standard algorithms and stored securely.
                      </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-3 gap-4 pt-6"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">256-bit</div>
                        <div className="text-xs text-gray-500">Encryption</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">Instant</div>
                        <div className="text-xs text-gray-500">Activation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">100%</div>
                        <div className="text-xs text-gray-500">Secure</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPageContent />
    </Suspense>
  )
}