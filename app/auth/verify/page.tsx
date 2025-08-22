"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Shield,
  Clock,
  MessageSquare,
  AlertCircle,
  Loader2
} from "lucide-react"
import { Header, Footer } from "@/components/layout"

const features = [
  {
    icon: Shield,
    title: "Secure Verification",
    description: "Your account is verified with bank-level security"
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Get verified in seconds, not minutes"
  },
  {
    icon: MessageSquare,
    title: "Instant Access",
    description: "Start using your account immediately"
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

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasAttemptedVerification = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("No verification token provided")
        setIsLoading(false)
        return
      }

      // Prevent multiple verification attempts using ref
      if (hasAttemptedVerification.current) {
        console.log("🔍 Frontend: Verification already attempted, skipping...")
        return
      }

      hasAttemptedVerification.current = true
      console.log("🔍 Frontend: Starting verification for token:", token)

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`, {
          method: 'GET',
        })

        console.log("🔍 Frontend: Response received:", {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
          url: response.url
        })

        if (response.ok) {
          const data = await response.json()
          console.log("🔍 Frontend: Success response data:", data)
          setError(null) // Clear any previous errors
          setIsVerified(true)
          console.log("🔍 Frontend: State updated - isVerified: true, error: null")
        } else {
          const errorData = await response.json()
          console.log("🔍 Frontend: Error response data:", errorData)
          setError(errorData.error || "Verification failed")
        }
      } catch (err) {
        console.error("🔍 Frontend: Fetch error:", err)
        setError("Network error occurred during verification")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token]) // Remove hasAttemptedVerification from dependencies

  console.log("🔍 Frontend: Rendering with state - isLoading:", isLoading, "isVerified:", isVerified, "error:", error)
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Verifying Your Email
              </h1>
              <p className="text-xl text-gray-600">
                Please wait while we verify your email address...
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              {/* Error Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <AlertCircle className="h-12 w-12 text-white" />
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Verification Failed
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {error}
                </p>
                <p className="text-gray-500 max-w-md mx-auto">
                  The verification link may be invalid, expired, or already used.
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
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    <Link href="/auth/signup">
                      Create New Account
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    <Link href="/">
                      Go to Homepage
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 p-6 bg-red-50 rounded-2xl border border-red-200"
              >
                <h3 className="font-semibold text-red-900 mb-2">💡 Need Help?</h3>
                <p className="text-red-800 text-sm mb-3">
                  If you're having trouble with email verification, try signing up again or contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    View Help Center
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
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
                  Email Verified Successfully!
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Your email address has been verified and your account is now active.
                </p>
                <p className="text-gray-500 max-w-md mx-auto">
                  Welcome to our platform! You can now access all features and start using your account.
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
                    <Link href="/pages/all-roles">
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Welcome to Our Platform!</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  You now have access to all our features including advanced analytics, team collaboration tools, 
                  and premium support. Start exploring what we have to offer!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // This should never be reached, but just in case
  return null
}
