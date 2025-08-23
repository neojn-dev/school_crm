"use client"

import { useState, useEffect } from "react"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  currency?: string
  locale?: string
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  className?: string
  showSymbol?: boolean
  precision?: number
}

export function CurrencyInput({
  value,
  onChange,
  currency = "USD",
  locale = "en-US",
  placeholder = "0.00",
  label,
  error,
  disabled = false,
  className = "",
  showSymbol = true,
  precision = 2
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Format currency for display
  const formatCurrency = (val: number) => {
    if (isNaN(val)) return ""
    
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(val)
    } catch {
      // Fallback formatting
      return `${currency} ${val.toFixed(precision)}`
    }
  }

  // Parse currency from display value
  const parseCurrency = (displayVal: string): number => {
    if (!displayVal) return 0
    
    // Remove currency symbol and non-numeric characters except decimal point
    const numericValue = displayVal.replace(/[^\d.-]/g, "")
    
    if (numericValue === "" || numericValue === "-") return 0
    
    const parsed = parseFloat(numericValue)
    return isNaN(parsed) ? 0 : parsed
  }

  // Update display value when prop value changes
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatCurrency(value))
    }
  }, [value, currency, locale, precision, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
    
    const parsedValue = parseCurrency(inputValue)
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
    setDisplayValue(formatCurrency(value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, and navigation keys
    if ([8, 9, 27, 13, 46, 37, 39, 36, 35].includes(e.keyCode)) {
      return
    }
    
    // Allow: numbers, decimal point, minus sign
    if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 46 || e.keyCode === 45) {
      return
    }
    
    // Allow: numpad numbers
    if (e.keyCode >= 96 && e.keyCode <= 105) {
      return
    }
    
    // Prevent other keys
    e.preventDefault()
  }

  const currencySymbol = showSymbol ? 
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(0).replace(/[0-9]/g, '') : ""

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      
      <div className="relative">
        {showSymbol && currencySymbol && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {currencySymbol}
          </div>
        )}
        
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
            showSymbol && currencySymbol && "pl-8",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            "transition-colors duration-200"
          )}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      <div className="text-xs text-gray-500">
        Currency: {currency} | Locale: {locale} | Precision: {precision}
      </div>
    </div>
  )
}
