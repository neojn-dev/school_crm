"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  Chrome,
  Sparkles,
  Shield,
  Zap,
  Heart,
  CheckCircle,
  Star,
  AlertCircle,
  Check,
  X
} from "lucide-react"
import { useRouter } from "next/navigation"

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  marketingEmails: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupForm = z.infer<typeof signupSchema>

const benefits = [
  {
    icon: Star,
    title: "Premium Features",
    description: "Access to advanced tools and analytics"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security and compliance"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance and speed"
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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
    formState
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      agreeToTerms: false,
      marketingEmails: false
    }
  })

  const watchedFields = watch()

  // Check if all required fields for step 2 are valid
  const isStep2Valid = watchedFields.agreeToTerms

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || "Failed to create account")
        return
      }

      setSuccess("Account created successfully! Please check your email to verify your account.")
      
      // Redirect to signin page after a delay
      setTimeout(() => {
        router.push("/signin?message=account_created")
      }, 3000)
      
    } catch (error) {
      setError("An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: string) => {
    setSocialLoading(provider)
    // Simulate social signup
    await new Promise(resolve => setTimeout(resolve, 2500))
    setSocialLoading(null)
    console.log(`Signing up with ${provider}`)
  }

  const nextStep = async () => {
    const isValidStep = await trigger(["username", "email", "password", "confirmPassword"])
    if (isValidStep) {
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    setCurrentStep(1)
  }



  return (
    <div className="flex items-center justify-center p-4 py-6">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-2"
            >
              <div className="max-w-md mx-auto lg:mx-0">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center lg:text-left mb-4"
                >
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Sign Up
                  </h1>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{success}</p>
                  </motion.div>
                )}

                {/* Progress Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 rounded ${
                    currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <AnimatePresence mode="wait">
                    {currentStep === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Username Field */}
                        <div className="space-y-1">
                          <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                            Username
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="username"
                              placeholder="Choose a username"
                              className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                              {...register("username")}
                            />
                          </div>
                          {errors.username && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {errors.username.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
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

                        {/* Password Field */}
                        <div className="space-y-1">
                          <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="pl-10 pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                              {...register("password")}
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
                          
                          {/* Password Requirements */}
                          {watchedFields.password && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <div className={`flex items-center gap-1.5 ${
                                  watchedFields.password.length >= 8 ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {watchedFields.password.length >= 8 ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  <span>At least 8 characters</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${
                                  /[a-z]/.test(watchedFields.password) ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {/[a-z]/.test(watchedFields.password) ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  <span>One lowercase letter</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${
                                  /[A-Z]/.test(watchedFields.password) ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {/[A-Z]/.test(watchedFields.password) ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  <span>One uppercase letter</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${
                                  /\d/.test(watchedFields.password) ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {/\d/.test(watchedFields.password) ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  <span>One number</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${
                                  /[^a-zA-Z0-9]/.test(watchedFields.password) ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {/[^a-zA-Z0-9]/.test(watchedFields.password) ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  <span>One special character</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-1">
                          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
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

                        {/* Next Step Button */}
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="w-full h-12 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Terms and Marketing */}
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="agreeToTerms"
                              checked={watchedFields.agreeToTerms}
                              onCheckedChange={(checked) => {
                                setValue("agreeToTerms", checked as boolean)
                                trigger("agreeToTerms")
                              }}
                              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer">
                              I agree to the{" "}
                              <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                Privacy Policy
                              </Link>
                            </Label>
                          </div>
                          {errors.agreeToTerms && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {errors.agreeToTerms.message}
                            </motion.p>
                          )}

                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="marketingEmails"
                              checked={watchedFields.marketingEmails}
                              onCheckedChange={(checked) => setValue("marketingEmails", checked as boolean)}
                              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="marketingEmails" className="text-sm text-gray-700 cursor-pointer">
                              Send me marketing emails about new features and updates
                            </Label>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            className="flex-1 h-12 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={isLoading || !isStep2Valid}
                            className="flex-1 h-12 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                Create Account
                                <CheckCircle className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-500">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  {/* Social Signup Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialSignup("github")}
                      disabled={socialLoading !== null}
                      className="h-12 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-200"
                    >
                      {socialLoading === "github" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Github className="mr-2 h-5 w-5" />
                          GitHub
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialSignup("google")}
                      disabled={socialLoading !== null}
                      className="h-12 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-200"
                    >
                      {socialLoading === "google" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Chrome className="mr-2 h-5 w-5" />
                          Google
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Sign In Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center pt-4"
                  >
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>

            {/* Left Side - Gradient Background */}
            <div className="order-1 lg:order-1 hidden lg:block">
              <div className="h-full min-h-[600px] bg-gradient-to-b from-green-500 via-emerald-600 to-blue-600 rounded-2xl"></div>
            </div>
          </div>
        </div>
    </div>
  )
}
