"use client"

import { useState, useEffect } from "react"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface PercentageInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  className?: string
  showSymbol?: boolean
  precision?: number
  allowNegative?: boolean
}

export function PercentageInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 0.01,
  placeholder = "0.00",
  label,
  error,
  disabled = false,
  className = "",
  showSymbol = true,
  precision = 2,
  allowNegative = false
}: PercentageInputProps) {
  const [displayValue, setDisplayValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Format percentage for display
  const formatPercentage = (val: number) => {
    if (isNaN(val)) return ""
    
    const clampedValue = Math.max(min, Math.min(max, val))
    return `${clampedValue.toFixed(precision)}${showSymbol ? '%' : ''}`
  }

  // Parse percentage from display value
  const parsePercentage = (displayVal: string): number => {
    if (!displayVal) return 0
    
    // Remove percentage symbol and non-numeric characters except decimal point and minus
    const numericValue = displayVal.replace(/[^\d.-]/g, "")
    
    if (numericValue === "" || numericValue === "-") return 0
    
    const parsed = parseFloat(numericValue)
    if (isNaN(parsed)) return 0
    
    // Clamp value to min/max range
    return Math.max(min, Math.min(max, parsed))
  }

  // Update display value when prop value changes
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatPercentage(value))
    }
  }, [value, min, max, precision, showSymbol, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
    
    const parsedValue = parsePercentage(inputValue)
    if (parsedValue !== value) {
      onChange(parsedValue)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    // Show raw value when focused
    setDisplayValue(value.toString())
  }

  const handleBlur = () => {
    setIsFocused(false)
    // Format value when blur
    setDisplayValue(formatPercentage(value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, and navigation keys
    if ([8, 9, 27, 13, 46, 37, 39, 36, 35].includes(e.keyCode)) {
      return
    }
    
    // Allow: numbers, decimal point
    if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 46) {
      return
    }
    
    // Allow: minus sign only if negative values are allowed
    if (e.keyCode === 45 && allowNegative) {
      return
    }
    
    // Allow: numpad numbers
    if (e.keyCode >= 96 && e.keyCode <= 105) {
      return
    }
    
    // Prevent other keys
    e.preventDefault()
  }

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(newValue)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "pr-20",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            "transition-colors duration-200"
          )}
        />
        
        {/* Increment/Decrement Buttons */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            className={cn(
              "w-6 h-3 flex items-center justify-center text-xs font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-t transition-colors duration-200",
              disabled && "opacity-50 cursor-not-allowed",
              value >= max && "opacity-50 cursor-not-allowed"
            )}
          >
            ▲
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            className={cn(
              "w-6 h-3 flex items-center justify-center text-xs font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-b transition-colors duration-200",
              disabled && "opacity-50 cursor-not-allowed",
              value <= min && "opacity-50 cursor-not-allowed"
            )}
          >
            ▼
          </button>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      <div className="text-xs text-gray-500">
        Range: {min} - {max} | Step: {step} | Precision: {precision}
      </div>
    </div>
  )
}
