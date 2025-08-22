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
  AlertCircle
} from "lucide-react"
import { Header, Footer } from "@/components/website-components"
import { useRouter } from "next/navigation"

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["ROLE1", "ROLE2", "ROLE3"]),
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
      role: "ROLE1",
      agreeToTerms: false,
      marketingEmails: false
    }
  })

  const watchedFields = watch()

  // Check if all required fields for step 2 are valid
  const isStep2Valid = watchedFields.role && watchedFields.agreeToTerms

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
          role: data.role,
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
        router.push("/auth/signin?message=account_created")
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

  const handleRoleChange = (roleValue: string) => {
    setValue("role", roleValue as "ROLE1" | "ROLE2" | "ROLE3")
    // Trigger validation after role change
    trigger("role")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
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
                    <span className="font-bold text-2xl text-gray-900">Join Us</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Create your account
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Start your journey with us today
                  </p>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
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
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
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
                  className="flex items-center gap-2 mb-8"
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
                  className="space-y-6"
                >
                  <AnimatePresence mode="wait">
                    {currentStep === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {/* Username Field */}
                        <div className="space-y-2">
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
                        <div className="space-y-2">
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
                        <div className="space-y-2">
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
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
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
                        className="space-y-6"
                      >
                        {/* Role Selection */}
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-gray-700">
                            Choose Your Role
                          </Label>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { value: "ROLE1", label: "Developer", description: "Full access to development tools" },
                              { value: "ROLE2", label: "Designer", description: "Access to design and prototyping tools" },
                              { value: "ROLE3", label: "Manager", description: "Team management and analytics" }
                            ].map((role) => (
                              <label
                                key={role.value}
                                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                  watchedFields.role === role.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={role.value}
                                  checked={watchedFields.role === role.value}
                                  onChange={() => handleRoleChange(role.value)}
                                  className="sr-only"
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{role.label}</div>
                                  <div className="text-sm text-gray-600">{role.description}</div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 ${
                                  watchedFields.role === role.value
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}>
                                  {watchedFields.role === role.value && (
                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                  )}
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Terms and Marketing */}
                        <div className="space-y-4">
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
                        href="/auth/signin"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>

            {/* Right Side - Benefits & Visual */}
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
                        <Star className="h-16 w-16 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Join the Future
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Be part of something amazing
                      </p>
                    </motion.div>

                    {/* Benefits List */}
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Stats */}
                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-3 gap-4 pt-6"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">Free</div>
                        <div className="text-xs text-gray-500">Forever</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">Unlimited</div>
                        <div className="text-xs text-gray-500">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">24/7</div>
                        <div className="text-xs text-gray-500">Support</div>
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

      <Footer />
    </div>
  )
}
