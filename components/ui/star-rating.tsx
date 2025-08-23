"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  maxStars?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  readonly?: boolean
  className?: string
}

export function StarRating({
  value,
  onChange,
  maxStars = 5,
  size = "md",
  showValue = false,
  readonly = false,
  className = ""
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  const handleClick = (starValue: number) => {
    if (!readonly) {
      onChange(starValue)
    }
  }

  const handleMouseEnter = (starValue: number) => {
    if (!readonly) {
      setHoverValue(starValue)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= (hoverValue || value)
          const isHalf = starValue === Math.ceil(value) && value % 1 !== 0
          
          return (
            <button
              key={starValue}
              type="button"
              className={cn(
                "transition-all duration-200 cursor-pointer",
                readonly && "cursor-default",
                sizeClasses[size]
              )}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-all duration-200",
                  isFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                  !readonly && "hover:scale-110"
                )}
              />
            </button>
          )
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-gray-700">
          {value.toFixed(1)} / {maxStars}
        </span>
      )}
    </div>
  )
}
