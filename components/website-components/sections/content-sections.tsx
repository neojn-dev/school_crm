"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Quote, ArrowRight, Play, CheckCircle, Star, Users, Award } from "lucide-react"

interface BaseContentProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  description?: string
}

// Content Section 1: Split Layout with Image
export function ContentSplitImage({
  eyebrow,
  title,
  subtitle,
  description,
  imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  imageAlt = "Content Image",
  primaryCta,
  secondaryCta,
  features,
  reversed = false
}: BaseContentProps & {
  imageUrl?: string
  imageAlt?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  features?: string[]
  reversed?: boolean
}) {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:grid-flow-col-dense' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={reversed ? 'lg:col-start-2' : ''}
          >
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p className="text-xl font-semibold text-gray-800 mb-6">
                {subtitle}
              </p>
            )}
            
            {description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>
            )}
            
            {features && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={reversed ? 'lg:col-start-1' : ''}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Content Section 2: Full Width Text with Quote
export function ContentFullWidthQuote({
  eyebrow,
  title,
  subtitle,
  description,
  quote,
  author,
  authorRole,
  authorImage
}: BaseContentProps & {
  quote?: string
  author?: string
  authorRole?: string
  authorImage?: string
}) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          
          {title && (
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className="text-xl font-semibold text-gray-800 mb-8">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              {description}
            </p>
          )}
          
          {quote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border"
            >
              <Quote className="w-12 h-12 text-blue-500 mx-auto mb-6" />
              <blockquote className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-relaxed">
                "{quote}"
              </blockquote>
              
              {(author || authorRole) && (
                <div className="flex items-center justify-center">
                  {authorImage && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={authorImage}
                        alt={author || "Author"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="text-center">
                    {author && (
                      <div className="font-semibold text-gray-900">{author}</div>
                    )}
                    {authorRole && (
                      <div className="text-gray-600">{authorRole}</div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Content Section 3: Image Text Combination Grid
export function ContentImageTextGrid({
  eyebrow,
  title,
  subtitle,
  items
}: BaseContentProps & {
  items: Array<{
    title: string
    description: string
    image: string
    link?: string
  }>
}) {
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
        
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {item.link && (
                    <Link
                      href={item.link}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Content Section 4: Video with Text Overlay
export function ContentVideoText({
  eyebrow,
  title,
  subtitle,
  description,
  videoThumbnail = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
  videoUrl,
  primaryCta,
  stats
}: BaseContentProps & {
  videoThumbnail?: string
  videoUrl?: string
  primaryCta?: { label: string; href: string }
  stats?: Array<{ label: string; value: string }>
}) {
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
            
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-6">
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p className="text-xl font-semibold text-gray-300 mb-6">
                {subtitle}
              </p>
            )}
            
            {description && (
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {description}
              </p>
            )}
            
            {stats && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                {primaryCta.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src={videoThumbnail}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-8 h-8 text-gray-900 ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Content Section 5: Multi-Column Text
export function ContentMultiColumn({
  eyebrow,
  title,
  subtitle,
  columns
}: BaseContentProps & {
  columns: Array<{
    title: string
    content: string
    icon?: React.ReactNode
  }>
}) {
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {columns.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              {column.icon && (
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-200 transition-colors">
                  {column.icon}
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {column.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {column.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
