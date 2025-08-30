"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Play, ChevronDown, Star, Users, Award } from "lucide-react"
import { useRef, useState } from "react"

interface BaseHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

// Hero Variant 1: Gradient with Floating Elements
export function HeroGradientFloating({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl"
      />
      
      <div className="relative container-custom text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6"
            >
              {eyebrow}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl font-semibold text-white/90 mb-6"
            >
              {subtitle}
            </motion.p>
          )}
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            >
              {description}
            </motion.p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  )
}

// Hero Variant 2: Split Layout with Image
export function HeroSplitImage({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps & { imageUrl?: string }) {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl font-semibold text-gray-800 mb-6">
                {subtitle}
              </p>
            )}
            
            {description && (
              <p className="text-lg text-gray-600 mb-8">
                {description}
              </p>
            )}
            
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold bg-white hover:bg-gray-50 shadow-sm hover:shadow transition-all"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                alt="Hero Image"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Hero Variant 3: Video Background
export function HeroVideoBackground({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps & { videoUrl?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative container-custom text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {eyebrow && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6">
              {eyebrow}
            </div>
          )}
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl lg:text-2xl font-semibold text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
              >
                {primaryCta.label}
              </Link>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Hero Variant 4: Parallax Scroll
export function HeroParallax({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      />
      
      <motion.div
        style={{ opacity }}
        className="relative container-custom text-center text-white z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {eyebrow && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6">
              {eyebrow}
            </div>
          )}
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl lg:text-2xl font-semibold text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              {description}
            </p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

// Hero Variant 5: Interactive Particles
export function HeroParticles({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Particle Animation Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: Math.random()
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="relative container-custom text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6"
            >
              {eyebrow}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl font-semibold text-white/90 mb-6"
            >
              {subtitle}
            </motion.p>
          )}
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            >
              {description}
            </motion.p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
      </div>
    </section>
  )
}

// Hero Variant 6: Minimal Clean
export function HeroMinimal({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4"
            >
              {eyebrow}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-6"
            >
              {subtitle}
            </motion.p>
          )}
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-500 max-w-2xl mx-auto mb-10"
            >
              {description}
            </motion.p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="px-8 py-3 border border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Hero Variant 7: Cards Layout
export function HeroCards({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps) {
  const features = [
    { icon: <Star className="w-6 h-6" />, title: "Premium Quality", description: "Top-tier solutions" },
    { icon: <Users className="w-6 h-6" />, title: "Expert Team", description: "Skilled professionals" },
    { icon: <Award className="w-6 h-6" />, title: "Proven Results", description: "Track record of success" }
  ]
  
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl font-semibold text-gray-800 mb-6">
                {subtitle}
              </p>
            )}
            
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                {description}
              </p>
            )}
            
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold bg-white hover:bg-gray-50 shadow-sm hover:shadow transition-all"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Hero Variant 8: Full Screen Image with Overlay
export function HeroFullImage({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseHeroProps & { imageUrl?: string }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop"
          alt="Hero Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="relative container-custom text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6"
            >
              {eyebrow}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl font-semibold text-white/90 mb-6"
            >
              {subtitle}
            </motion.p>
          )}
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
            >
              {description}
            </motion.p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  )
}
