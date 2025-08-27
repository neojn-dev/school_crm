"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Share2, 
  Check, 
  X,
  Plus,
  Minus,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Gift,
  Tag,
  Percent
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ============ PRODUCT CARD BLOCK ============
interface ProductCardBlockProps {
  content: {
    product: {
      id: string
      name: string
      price: number
      originalPrice?: number
      currency: string
      image: string
      images?: string[]
      rating: number
      reviewCount: number
      description: string
      badge?: {
        text: string
        type: 'sale' | 'new' | 'bestseller' | 'limited'
      }
      inStock: boolean
      stockCount?: number
    }
    style: 'minimal' | 'detailed' | 'compact' | 'featured'
    layout: 'vertical' | 'horizontal'
    showQuickActions: boolean
  }
  settings?: {
    showWishlist: boolean
    showCompare: boolean
    showQuickView: boolean
    hoverEffects: boolean
  }
  onAddToCart?: (productId: string) => void
  onWishlist?: (productId: string) => void
  onQuickView?: (productId: string) => void
}

export function ProductCardBlock({ content, settings, onAddToCart, onWishlist, onQuickView }: ProductCardBlockProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { product } = content

  const cardClasses = cn(
    "group relative bg-white rounded-lg overflow-hidden transition-all duration-300",
    {
      'shadow-sm hover:shadow-lg': settings?.hoverEffects,
      'border border-gray-200': content.style !== 'minimal',
      'p-4': content.style === 'detailed',
      'p-2': content.style === 'compact',
      'p-6': content.style === 'featured',
    },
    {
      'flex': content.layout === 'horizontal',
      'flex-col': content.layout === 'vertical',
    }
  )

  const renderBadge = () => {
    if (!product.badge) return null

    const badgeClasses = cn(
      "absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full z-10",
      {
        'bg-red-500 text-white': product.badge.type === 'sale',
        'bg-green-500 text-white': product.badge.type === 'new',
        'bg-yellow-500 text-white': product.badge.type === 'bestseller',
        'bg-purple-500 text-white': product.badge.type === 'limited',
      }
    )

    return (
      <span className={badgeClasses}>
        {product.badge.text}
      </span>
    )
  }

  const renderRating = () => (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              star <= product.rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            )}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">({product.reviewCount})</span>
    </div>
  )

  const renderPrice = () => (
    <div className="flex items-center space-x-2">
      <span className="text-lg font-bold text-gray-900">
        {product.currency}{product.price}
      </span>
      {product.originalPrice && product.originalPrice > product.price && (
        <span className="text-sm text-gray-500 line-through">
          {product.currency}{product.originalPrice}
        </span>
      )}
    </div>
  )

  const renderQuickActions = () => {
    if (!content.showQuickActions) return null

    return (
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {settings?.showWishlist && (
          <button
            onClick={() => {
              setIsWishlisted(!isWishlisted)
              onWishlist?.(product.id)
            }}
            className={cn(
              "p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all",
              isWishlisted ? "text-red-500" : "text-gray-600"
            )}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
          </button>
        )}
        {settings?.showQuickView && (
          <button
            onClick={() => onQuickView?.(product.id)}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-gray-600"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
        <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-gray-600">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className={cardClasses}>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        {renderBadge()}
        {renderQuickActions()}
        
        <Image
          src={product.images?.[currentImageIndex] || product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {content.style === 'detailed' && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {renderRating()}
        
        <div className="mt-3 flex items-center justify-between">
          {renderPrice()}
          
          <button
            onClick={() => onAddToCart?.(product.id)}
            disabled={!product.inStock}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              product.inStock
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            {product.inStock ? (
              <>
                <ShoppingCart className="h-4 w-4 inline mr-2" />
                Add to Cart
              </>
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
        
        {product.stockCount && product.stockCount < 10 && (
          <p className="text-sm text-red-600 mt-2">
            Only {product.stockCount} left in stock!
          </p>
        )}
      </div>
    </div>
  )
}

export const productCardBlockConfig = {
  name: "Product Card",
  type: "product-card",
  category: "ecommerce",
  description: "Product display cards with customizable layouts and actions",
  component: "ProductCardBlock",
  defaultContent: {
    product: {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      currency: "$",
      image: "/products/headphones.jpg",
      images: ["/products/headphones.jpg", "/products/headphones-2.jpg"],
      rating: 4.5,
      reviewCount: 128,
      description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
      badge: {
        text: "20% OFF",
        type: "sale"
      },
      inStock: true,
      stockCount: 5
    },
    style: 'detailed',
    layout: 'vertical',
    showQuickActions: true
  },
  settings: {
    showWishlist: true,
    showCompare: true,
    showQuickView: true,
    hoverEffects: true
  }
}

// ============ PRICING TABLE BLOCK ============
interface PricingTableBlockProps {
  content: {
    plans: Array<{
      id: string
      name: string
      price: number
      currency: string
      period: 'month' | 'year' | 'lifetime'
      description: string
      features: Array<{
        text: string
        included: boolean
        highlight?: boolean
      }>
      popular?: boolean
      buttonText: string
      buttonStyle: 'primary' | 'secondary' | 'outline'
    }>
    style: 'simple' | 'modern' | 'cards' | 'comparison'
    columns: 2 | 3 | 4
  }
  settings?: {
    showAnnualDiscount: boolean
    highlightPopular: boolean
    showFeatureComparison: boolean
  }
  onSelectPlan?: (planId: string) => void
}

export function PricingTableBlock({ content, settings, onSelectPlan }: PricingTableBlockProps) {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')

  const containerClasses = cn(
    "grid gap-6",
    {
      'grid-cols-1 md:grid-cols-2': content.columns === 2,
      'grid-cols-1 md:grid-cols-3': content.columns === 3,
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': content.columns === 4,
    }
  )

  const planClasses = (plan: any) => cn(
    "relative rounded-lg transition-all duration-300",
    {
      'border border-gray-200 p-6': content.style === 'simple',
      'bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg': content.style === 'modern',
      'bg-white rounded-xl shadow-lg p-8': content.style === 'cards',
      'border border-gray-200 p-6': content.style === 'comparison',
    },
    {
      'ring-2 ring-blue-500 border-blue-500 scale-105': plan.popular && settings?.highlightPopular,
    }
  )

  return (
    <div className="w-full">
      {/* Billing Toggle */}
      {settings?.showAnnualDiscount && (
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingPeriod('month')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billingPeriod === 'month'
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billingPeriod === 'year'
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Annual
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className={containerClasses}>
        {content.plans.map((plan) => (
          <div key={plan.id} className={planClasses(plan)}>
            {/* Popular Badge */}
            {plan.popular && settings?.highlightPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.currency}{billingPeriod === 'year' ? Math.round(plan.price * 0.8) : plan.price}
                </span>
                <span className="text-gray-600 ml-1">
                  /{billingPeriod === 'year' ? 'year' : plan.period}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm",
                    feature.included ? "text-gray-900" : "text-gray-500",
                    feature.highlight && "font-semibold"
                  )}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => onSelectPlan?.(plan.id)}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-medium transition-colors",
                {
                  'bg-blue-600 text-white hover:bg-blue-700': plan.buttonStyle === 'primary',
                  'bg-gray-600 text-white hover:bg-gray-700': plan.buttonStyle === 'secondary',
                  'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white': plan.buttonStyle === 'outline',
                }
              )}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const pricingTableBlockConfig = {
  name: "Pricing Table",
  type: "pricing-table",
  category: "ecommerce",
  description: "Pricing comparison tables with feature lists",
  component: "PricingTableBlock",
  defaultContent: {
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 9.99,
        currency: "$",
        period: "month",
        description: "Perfect for individuals getting started",
        features: [
          { text: "Up to 5 projects", included: true },
          { text: "10GB storage", included: true },
          { text: "Email support", included: true },
          { text: "Advanced analytics", included: false },
          { text: "Priority support", included: false }
        ],
        buttonText: "Get Started",
        buttonStyle: "outline"
      },
      {
        id: "pro",
        name: "Pro",
        price: 19.99,
        currency: "$",
        period: "month",
        description: "Best for growing businesses",
        features: [
          { text: "Unlimited projects", included: true },
          { text: "100GB storage", included: true },
          { text: "Priority email support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Phone support", included: false }
        ],
        popular: true,
        buttonText: "Start Free Trial",
        buttonStyle: "primary"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 49.99,
        currency: "$",
        period: "month",
        description: "For large organizations",
        features: [
          { text: "Unlimited everything", included: true },
          { text: "1TB storage", included: true },
          { text: "24/7 phone support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Custom integrations", included: true }
        ],
        buttonText: "Contact Sales",
        buttonStyle: "secondary"
      }
    ],
    style: 'modern',
    columns: 3
  },
  settings: {
    showAnnualDiscount: true,
    highlightPopular: true,
    showFeatureComparison: true
  }
}

// ============ SHOPPING CART BLOCK ============
interface ShoppingCartBlockProps {
  content: {
    items: Array<{
      id: string
      name: string
      price: number
      quantity: number
      image: string
      variant?: string
    }>
    currency: string
    style: 'minimal' | 'detailed' | 'sidebar'
    showShipping: boolean
    showTax: boolean
    shippingCost: number
    taxRate: number
  }
  settings?: {
    allowQuantityChange: boolean
    showRemove: boolean
    showContinueShopping: boolean
  }
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  onRemoveItem?: (itemId: string) => void
  onCheckout?: () => void
}

export function ShoppingCartBlock({ 
  content, 
  settings, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: ShoppingCartBlockProps) {
  const subtotal = content.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = content.showShipping ? content.shippingCost : 0
  const tax = content.showTax ? subtotal * content.taxRate : 0
  const total = subtotal + shipping + tax

  const containerClasses = cn(
    "bg-white rounded-lg",
    {
      'border border-gray-200 p-4': content.style === 'minimal',
      'border border-gray-200 p-6': content.style === 'detailed',
      'w-80 h-full overflow-y-auto p-6': content.style === 'sidebar',
    }
  )

  return (
    <div className={containerClasses}>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {content.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          content.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                {item.variant && (
                  <p className="text-sm text-gray-600">{item.variant}</p>
                )}
                <p className="text-sm font-medium text-gray-900">
                  {content.currency}{item.price}
                </p>
              </div>
              
              {/* Quantity Controls */}
              {settings?.allowQuantityChange && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {/* Remove Button */}
              {settings?.showRemove && (
                <button
                  onClick={() => onRemoveItem?.(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Cart Summary */}
      {content.items.length > 0 && (
        <>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{content.currency}{subtotal.toFixed(2)}</span>
            </div>
            
            {content.showShipping && (
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{content.currency}{shipping.toFixed(2)}</span>
              </div>
            )}
            
            {content.showTax && (
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{content.currency}{tax.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>{content.currency}{total.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            
            {settings?.showContinueShopping && (
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Continue Shopping
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export const shoppingCartBlockConfig = {
  name: "Shopping Cart",
  type: "shopping-cart",
  category: "ecommerce",
  description: "Shopping cart with item management and checkout",
  component: "ShoppingCartBlock",
  defaultContent: {
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "/products/headphones.jpg",
        variant: "Black, Large"
      },
      {
        id: "2",
        name: "Smartphone Case",
        price: 29.99,
        quantity: 2,
        image: "/products/case.jpg"
      }
    ],
    currency: "$",
    style: 'detailed',
    showShipping: true,
    showTax: true,
    shippingCost: 9.99,
    taxRate: 0.08
  },
  settings: {
    allowQuantityChange: true,
    showRemove: true,
    showContinueShopping: true
  }
}

