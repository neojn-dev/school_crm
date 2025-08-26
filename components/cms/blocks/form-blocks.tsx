"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Send, Check, X, Star } from "lucide-react"

// ============ CONTACT FORM BLOCK ============
interface ContactFormBlockProps {
  content: {
    title?: string
    description?: string
    fields: Array<{
      name: string
      label: string
      type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'
      required: boolean
      placeholder?: string
      options?: string[]
    }>
    submitText: string
    successMessage: string
    style: 'simple' | 'bordered' | 'filled' | 'modern'
  }
  settings?: {
    columns: 1 | 2
    spacing: 'tight' | 'normal' | 'loose'
    showLabels: boolean
  }
}

export function ContactFormBlock({ content, settings }: ContactFormBlockProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const inputClasses = cn(
    "w-full transition-all duration-200",
    {
      'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent': content.style === 'simple',
      'border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500': content.style === 'bordered',
      'bg-gray-100 border-0 rounded-md px-3 py-2 focus:bg-white focus:ring-2 focus:ring-blue-500': content.style === 'filled',
      'border-0 border-b-2 border-gray-300 rounded-none px-0 py-3 bg-transparent focus:border-blue-500 focus:ring-0': content.style === 'modern',
    }
  )

  const containerClasses = cn(
    "my-6 p-6 bg-white rounded-lg",
    {
      'grid grid-cols-1': settings?.columns === 1,
      'grid grid-cols-1 md:grid-cols-2': settings?.columns === 2,
    },
    {
      'gap-2': settings?.spacing === 'tight',
      'gap-4': settings?.spacing === 'normal',
      'gap-6': settings?.spacing === 'loose',
    }
  )

  if (isSubmitted) {
    return (
      <div className="my-6 p-8 bg-green-50 border border-green-200 rounded-lg text-center">
        <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">{content.successMessage}</p>
      </div>
    )
  }

  return (
    <div className="my-6">
      {content.title && (
        <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      )}
      {content.description && (
        <p className="text-gray-600 mb-6">{content.description}</p>
      )}
      
      <form onSubmit={handleSubmit} className={containerClasses}>
        {content.fields.map((field, index) => (
          <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            {settings?.showLabels && (
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder || field.label}
                required={field.required}
                rows={4}
                className={inputClasses}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                className={inputClasses}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">{field.placeholder || `Select ${field.label}`}</option>
                {field.options?.map((option, optIndex) => (
                  <option key={optIndex} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name={field.name}
                  required={field.required}
                  className="mr-2 rounded"
                  onChange={(e) => handleInputChange(field.name, e.target.checked)}
                />
                <span className="text-sm text-gray-700">{field.label}</span>
              </label>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder || field.label}
                required={field.required}
                className={inputClasses}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
        
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {content.submitText}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export const contactFormBlockConfig = {
  name: "Contact Form",
  type: "contact-form",
  category: "forms",
  description: "Customizable contact form with various field types",
  component: "ContactFormBlock",
  defaultContent: {
    title: "Get In Touch",
    description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
      { name: "subject", label: "Subject", type: "text", required: false, placeholder: "What's this about?" },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Your message here..." }
    ],
    submitText: "Send Message",
    successMessage: "Your message has been sent successfully! We'll get back to you soon.",
    style: 'simple'
  },
  settings: {
    columns: 2,
    spacing: 'normal',
    showLabels: true
  }
}

// ============ NEWSLETTER SIGNUP BLOCK ============
interface NewsletterBlockProps {
  content: {
    title: string
    description?: string
    placeholder: string
    buttonText: string
    style: 'inline' | 'stacked' | 'card'
    successMessage: string
  }
  settings?: {
    size: 'sm' | 'md' | 'lg'
    alignment: 'left' | 'center' | 'right'
  }
}

export function NewsletterBlock({ content, settings }: NewsletterBlockProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail('')
  }

  const containerClasses = cn(
    "my-6",
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    },
    {
      'p-6 bg-gray-50 rounded-lg': content.style === 'card',
    }
  )

  const formClasses = cn(
    "mt-4",
    {
      'flex flex-col sm:flex-row gap-2': content.style === 'inline',
      'flex flex-col gap-3': content.style === 'stacked',
      'flex flex-col gap-3': content.style === 'card',
    }
  )

  const inputClasses = cn(
    "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    {
      'text-sm': settings?.size === 'sm',
      'text-base': settings?.size === 'md',
      'text-lg': settings?.size === 'lg',
    },
    content.style === 'inline' && 'flex-1'
  )

  const buttonClasses = cn(
    "bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50",
    {
      'px-3 py-2 text-sm': settings?.size === 'sm',
      'px-4 py-2 text-base': settings?.size === 'md',
      'px-6 py-3 text-lg': settings?.size === 'lg',
    }
  )

  if (isSubmitted) {
    return (
      <div className={containerClasses}>
        <div className="flex items-center justify-center text-green-600">
          <Check className="h-5 w-5 mr-2" />
          <span>{content.successMessage}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <h3 className="text-xl font-bold mb-2">{content.title}</h3>
      {content.description && (
        <p className="text-gray-600 mb-4">{content.description}</p>
      )}
      
      <form onSubmit={handleSubmit} className={formClasses}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={content.placeholder}
          required
          className={inputClasses}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={buttonClasses}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            content.buttonText
          )}
        </button>
      </form>
    </div>
  )
}

export const newsletterBlockConfig = {
  name: "Newsletter Signup",
  type: "newsletter",
  category: "forms",
  description: "Email newsletter subscription form",
  component: "NewsletterBlock",
  defaultContent: {
    title: "Stay Updated",
    description: "Subscribe to our newsletter for the latest updates and insights.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
    style: 'inline',
    successMessage: "Thank you for subscribing!"
  },
  settings: {
    size: 'md',
    alignment: 'center'
  }
}

// ============ RATING BLOCK ============
interface RatingBlockProps {
  content: {
    title?: string
    maxRating: 3 | 5 | 10
    allowHalf: boolean
    size: 'sm' | 'md' | 'lg'
    color: string
    interactive: boolean
  }
  settings?: {
    showValue: boolean
    showCount: boolean
    alignment: 'left' | 'center' | 'right'
  }
}

export function RatingBlock({ content, settings }: RatingBlockProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingClick = (value: number) => {
    if (content.interactive) {
      setRating(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (content.interactive) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (content.interactive) {
      setHoverRating(0)
    }
  }

  const containerClasses = cn(
    "my-4",
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    }
  )

  const starClasses = cn(
    "transition-colors",
    {
      'w-4 h-4': content.size === 'sm',
      'w-6 h-6': content.size === 'md',
      'w-8 h-8': content.size === 'lg',
    },
    content.interactive && 'cursor-pointer hover:scale-110'
  )

  const renderStars = () => {
    const stars = []
    const displayRating = hoverRating || rating || 3.5 // Default rating for display

    for (let i = 1; i <= content.maxRating; i++) {
      const isFilled = i <= displayRating
      const isHalfFilled = content.allowHalf && i - 0.5 === displayRating

      stars.push(
        <Star
          key={i}
          className={cn(
            starClasses,
            isFilled ? `text-${content.color}-400 fill-current` : 'text-gray-300',
            isHalfFilled && 'text-yellow-400 fill-current'
          )}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      )
    }

    return stars
  }

  return (
    <div className={containerClasses}>
      {content.title && (
        <h4 className="font-medium mb-2">{content.title}</h4>
      )}
      
      <div className="flex items-center space-x-1">
        {renderStars()}
        
        {settings?.showValue && (
          <span className="ml-2 text-sm text-gray-600">
            {rating || 3.5}/{content.maxRating}
          </span>
        )}
        
        {settings?.showCount && (
          <span className="ml-2 text-sm text-gray-500">
            (124 reviews)
          </span>
        )}
      </div>
    </div>
  )
}

export const ratingBlockConfig = {
  name: "Rating",
  type: "rating",
  category: "interactive",
  description: "Star rating display or interactive rating input",
  component: "RatingBlock",
  defaultContent: {
    title: "Rate this product",
    maxRating: 5,
    allowHalf: true,
    size: 'md',
    color: 'yellow',
    interactive: true
  },
  settings: {
    showValue: true,
    showCount: true,
    alignment: 'left'
  }
}

// ============ POLL BLOCK ============
interface PollBlockProps {
  content: {
    question: string
    options: Array<{
      text: string
      votes: number
    }>
    allowMultiple: boolean
    showResults: boolean
  }
}

export function PollBlock({ content }: PollBlockProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [hasVoted, setHasVoted] = useState(false)

  const totalVotes = content.options.reduce((sum, option) => sum + option.votes, 0)

  const handleOptionSelect = (index: number) => {
    if (hasVoted) return

    if (content.allowMultiple) {
      setSelectedOptions(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setSelectedOptions([index])
    }
  }

  const handleVote = () => {
    if (selectedOptions.length > 0) {
      setHasVoted(true)
    }
  }

  return (
    <div className="my-6 p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{content.question}</h3>
      
      <div className="space-y-3">
        {content.options.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
          const isSelected = selectedOptions.includes(index)
          
          return (
            <div key={index} className="relative">
              <button
                onClick={() => handleOptionSelect(index)}
                disabled={hasVoted}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-all",
                  isSelected && !hasVoted && "border-blue-500 bg-blue-50",
                  !isSelected && !hasVoted && "border-gray-200 hover:border-gray-300",
                  hasVoted && "cursor-default"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.text}</span>
                  {(hasVoted || content.showResults) && (
                    <span className="text-sm text-gray-600">
                      {option.votes} votes ({percentage.toFixed(1)}%)
                    </span>
                  )}
                </div>
                
                {(hasVoted || content.showResults) && (
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>
      
      {!hasVoted && (
        <button
          onClick={handleVote}
          disabled={selectedOptions.length === 0}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Vote
        </button>
      )}
      
      {hasVoted && (
        <p className="mt-4 text-sm text-gray-600">
          Thank you for voting! Total votes: {totalVotes}
        </p>
      )}
    </div>
  )
}

export const pollBlockConfig = {
  name: "Poll",
  type: "poll",
  category: "interactive",
  description: "Interactive poll with voting and results",
  component: "PollBlock",
  defaultContent: {
    question: "What's your favorite programming language?",
    options: [
      { text: "JavaScript", votes: 45 },
      { text: "Python", votes: 38 },
      { text: "TypeScript", votes: 29 },
      { text: "Go", votes: 12 }
    ],
    allowMultiple: false,
    showResults: false
  }
}
