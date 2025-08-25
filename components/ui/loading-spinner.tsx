"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8", 
  lg: "w-12 h-12"
}

const containerSizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24"
}

export function LoadingSpinner({ size = "md", text, className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl",
          containerSizeClasses[size]
        )}
      >
        <Loader2 className={cn("text-white animate-spin", sizeClasses[size])} />
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export function AuthLoadingPage({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-4 py-6">
      <div className="container-custom">
        <div className="text-center">
          <LoadingSpinner size="lg" text={text} />
        </div>
      </div>
    </div>
  )
}

export function AppLoadingPage({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  )
}
