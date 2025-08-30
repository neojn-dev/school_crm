"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MessageCircle, Download, Play, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface BaseCTAProps {
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

// CTA Variant 1: Simple Banner
export function CTABanner({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xl font-semibold text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Variant 2: Floating Card
export function CTAFloating({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseCTAProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border">
            <div className="text-center">
              {eyebrow && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                  {eyebrow}
                </div>
              )}
              
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-xl font-semibold text-gray-800 mb-6">
                  {subtitle}
                </p>
              )}
              
              {description && (
                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="px-8 py-4 border border-gray-300 text-gray-800 rounded-xl font-semibold bg-white hover:bg-gray-50 shadow-sm hover:shadow transition-all"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Variant 3: Newsletter Signup
export function CTANewsletter({
  eyebrow,
  title,
  subtitle,
  description
}: BaseCTAProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xl font-semibold text-gray-300 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-gray-400 mb-10">
              {description}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitted ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Variant 4: Contact Form
export function CTAContact({
  eyebrow,
  title,
  subtitle,
  description
}: BaseCTAProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              {title}
            </h2>
            
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
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-blue-600" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-blue-600" />
                hello@company.com
              </div>
              <div className="flex items-center text-gray-600">
                <MessageCircle className="w-5 h-5 mr-3 text-blue-600" />
                Live chat available 24/7
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitted ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CTA Variant 5: Download/Resource
export function CTADownload({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta
}: BaseCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Download className="w-10 h-10 text-blue-600" />
          </div>
          
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xl font-semibold text-gray-800 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              {primaryCta.label}
            </Link>
          )}
          
          <div className="flex items-center justify-center mt-8 space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              4.9/5 rating
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              10,000+ downloads
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Variant 6: Video Demo
export function CTAVideo({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta
}: BaseCTAProps & { videoThumbnail?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {title}
            </h2>
            
            {subtitle && (
              <p className="text-xl font-semibold text-gray-300 mb-6">
                {subtitle}
              </p>
            )}
            
            {description && (
              <p className="text-lg text-gray-400 mb-8">
                {description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="px-8 py-4 border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop"
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                >
                  <Play className="w-8 h-8 text-gray-900 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              2:30 min demo
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CTA Variant 7: Social Proof
export function CTASocialProof({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta
}: BaseCTAProps) {
  const companies = [
    "https://via.placeholder.com/120x40/e5e7eb/6b7280?text=Company1",
    "https://via.placeholder.com/120x40/e5e7eb/6b7280?text=Company2",
    "https://via.placeholder.com/120x40/e5e7eb/6b7280?text=Company3",
    "https://via.placeholder.com/120x40/e5e7eb/6b7280?text=Company4",
    "https://via.placeholder.com/120x40/e5e7eb/6b7280?text=Company5",
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xl font-semibold text-gray-800 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-gray-600 mb-10">
              {description}
            </p>
          )}
          
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all transform hover:scale-105 mb-12"
            >
              {primaryCta.label}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          )}
          
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-6">Trusted by leading companies</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {companies.map((company, index) => (
                <div key={index} className="relative w-24 h-8">
                  <Image
                    src={company}
                    alt={`Company ${index + 1}`}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Variant 8: Urgency/Limited Time
export function CTAUrgency({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta
}: BaseCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-red-600 to-pink-600 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xl font-semibold text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-white/80 mb-8">
              {description}
            </p>
          )}
          
          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">59</div>
              <div className="text-xs">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">42</div>
              <div className="text-xs">Seconds</div>
            </div>
          </div>
          
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {primaryCta.label}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          )}
          
          <p className="text-sm text-white/70 mt-4">
            ⚡ Limited time offer - Don't miss out!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
