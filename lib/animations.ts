// Lightweight animation utilities to replace heavy framer-motion usage
// for simple animations that don't require complex orchestration

export const fadeInUp = "animate-in fade-in slide-in-from-bottom-4 duration-500"
export const fadeIn = "animate-in fade-in duration-500"
export const slideInLeft = "animate-in slide-in-from-left-4 duration-500"
export const slideInRight = "animate-in slide-in-from-right-4 duration-500"

// Staggered animation delays
export const staggerDelay = {
  1: "animation-delay-100",
  2: "animation-delay-200", 
  3: "animation-delay-300",
  4: "animation-delay-400",
  5: "animation-delay-500",
}

// Loading spinner animation (CSS-based)
export const spinAnimation = "animate-spin"

// Scale animations
export const scaleIn = "animate-in zoom-in-95 duration-300"
export const scaleOut = "animate-out zoom-out-95 duration-200"

// Hover effects (CSS-based)
export const hoverScale = "hover:scale-[1.02] transition-transform duration-200"
export const hoverLift = "hover:-translate-y-1 hover:shadow-lg transition-all duration-200"

// Form field animations
export const fieldError = "animate-in slide-in-from-top-2 duration-200"
export const fieldSuccess = "animate-in slide-in-from-bottom-2 duration-200"
