"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  showLabels?: boolean
  showValues?: boolean
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  showLabels = true,
  showValues = true,
  disabled = false,
  className = "",
  size = "md"
}: RangeSliderProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  }

  const thumbSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseFloat(e.target.value), localValue[1] - step)
    const newValue: [number, number] = [newMin, localValue[1]]
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseFloat(e.target.value), localValue[0] + step)
    const newValue: [number, number] = [localValue[0], newMax]
    setLocalValue(newValue)
    onChange(newValue)
  }

  const trackStyle = {
    background: `linear-gradient(to right, 
      #e5e7eb 0%, 
      #e5e7eb ${getPercentage(localValue[0])}%, 
      #3b82f6 ${getPercentage(localValue[0])}%, 
      #3b82f6 ${getPercentage(localValue[1])}%, 
      #e5e7eb ${getPercentage(localValue[1])}%, 
      #e5e7eb 100%)`
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Min: {min}</span>
          <span>Max: {max}</span>
        </div>
      )}
      
      <div className="relative">
        <div
          className={cn(
            "relative rounded-full bg-gray-200",
            sizeClasses[size],
            disabled && "opacity-50"
          )}
          style={trackStyle}
        >
          {/* Min Handle */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[0]}
            onChange={handleMinChange}
            disabled={disabled}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none",
              "w-full h-full",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg",
              "[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg",
              "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5",
              "z-10"
            )}
            style={{
              left: `${getPercentage(localValue[0])}%`,
              width: `${100 - getPercentage(localValue[0])}%`
            }}
          />
          
          {/* Max Handle */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={handleMaxChange}
            disabled={disabled}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none",
              "w-full h-full",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg",
              "[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg",
              "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5",
              "z-20"
            )}
            style={{
              left: 0,
              width: `${getPercentage(localValue[1])}%`
            }}
          />
        </div>
      </div>
      
      {showValues && (
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <span className="font-medium">{localValue[0]}</span>
          <span className="font-medium">{localValue[1]}</span>
        </div>
      )}
      
      {step > 1 && (
        <div className="text-xs text-gray-500 mt-1 text-center">
          Step: {step}
        </div>
      )}
    </div>
  )
}
