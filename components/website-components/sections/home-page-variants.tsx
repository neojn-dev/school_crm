"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { 
  Play, 
  ChevronDown, 
  Star, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Target,
  Globe,
  Heart,
  Lightbulb,
  TrendingUp,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  BarChart3,
  Settings,
  Rocket,
  Diamond,
  Sparkles,
  Crown,
  Gift,
  Flame
} from "lucide-react"

interface BaseHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

// Additional Hero Variants for Home Page

// Hero Variant 9: Interactive 3D Cards
export function HeroInteractive3D({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const features = [
    { title: "Innovation", icon: <Rocket className="w-8 h-8" />, description: "Cutting-edge solutions" },
    { title: "Quality", icon: <Star className="w-8 h-8" />, description: "Premium standards" },
    { title: "Speed", icon: <Zap className="w-8 h-8" />, description: "Lightning fast" },
    { title: "Support", icon: <Shield className="w-8 h-8" />, description: "24/7 assistance" }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6"
              >
                {eyebrow}
              </motion.div>
            )}
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6"
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl font-semibold text-white/90 mb-6"
              >
                {subtitle}
              </motion.p>
            )}
            
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-white/80 mb-8 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
            
            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Interactive 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ 
                  rotateY: 15,
                  rotateX: 10,
                  scale: 1.05,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <motion.div
                    animate={{
                      scale: hoveredCard === index ? 1.2 : 1,
                      rotate: hoveredCard === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-white mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Hero Variant 10: Morphing Shapes
export function HeroMorphingShapes({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Morphing Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
            borderRadius: ["25%", "50%", "25%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-teal-400/25 to-emerald-400/25 blur-3xl"
          animate={{
            scale: [0.8, 1.3, 0.8],
            rotate: [0, -180, -360],
            borderRadius: ["40%", "60%", "40%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto text-white"
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-emerald-400 rounded-full mr-3"
              />
              {eyebrow}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              {title}
            </motion.span>
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-semibold text-white/90 mb-8"
            >
              {subtitle}
            </motion.p>
          )}
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              {primaryCta && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={primaryCta.href}
                    className="relative px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-2xl overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">{primaryCta.label}</span>
                  </Link>
                </motion.div>
              )}
              {secondaryCta && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={secondaryCta.href}
                    className="px-10 py-5 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    {secondaryCta.label}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  )
}

// Feature Grid Variations for Home Page

interface FeatureGridProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  features: Array<{
    title: string
    description: string
    icon?: React.ReactNode
    image?: string
    color?: string
  }>
}

// Feature Grid Variant 7: Hexagon Layout
export function FeatureGridHexagon({ eyebrow, title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative max-w-4xl mx-auto">
          {/* Hexagon Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            {features.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="hexagon bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    {feature.icon && (
                      <div className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full ${feature.color || 'bg-blue-100 text-blue-600'}`}>
                        {feature.icon}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  )
}

// Feature Grid Variant 8: Floating Cards
export function FeatureGridFloating({ eyebrow, title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-custom">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm">
                {feature.image && (
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {feature.icon && (
                  <div className={`w-16 h-16 mb-6 flex items-center justify-center rounded-2xl ${feature.color || 'bg-blue-100 text-blue-600'} group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Feature Grid Variant 9: Circular Layout
export function FeatureGridCircular({ eyebrow, title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative max-w-6xl mx-auto">
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center z-10">
            <Crown className="w-12 h-12 text-white" />
          </div>

          {/* Circular Feature Layout */}
          <div className="relative w-96 h-96 mx-auto">
            {features.slice(0, 6).map((feature, index) => {
              const angle = (index * 60) - 90 // Start from top
              const radius = 180
              const x = Math.cos(angle * Math.PI / 180) * radius
              const y = Math.sin(angle * Math.PI / 180) * radius
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute w-24 h-24"
                  style={{
                    left: `calc(50% + ${x}px - 48px)`,
                    top: `calc(50% + ${y}px - 48px)`,
                  }}
                >
                  <div className={`w-full h-full rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow ${feature.color || 'bg-blue-100 text-blue-600'}`}>
                    {feature.icon}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center">
                    <h4 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                      {feature.title}
                    </h4>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Grid Variant 10: Timeline Layout
export function FeatureGridTimeline({ eyebrow, title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 ${feature.color || 'bg-blue-500 text-white'}`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="ml-8 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
