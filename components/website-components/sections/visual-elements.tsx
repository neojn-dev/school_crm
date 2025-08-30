"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X, Play, Award, Users, Target, Zap } from "lucide-react"
import Image from "next/image"

// Visual Element 1: Image Gallery with Lightbox
export function VisualImageGallery({
  eyebrow,
  title,
  subtitle,
  images
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
}) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="max-w-4xl max-h-full">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
              {images[selectedImage].caption && (
                <p className="text-white text-center mt-4">
                  {images[selectedImage].caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Visual Element 2: Before/After Comparison
export function VisualBeforeAfter({
  eyebrow,
  title,
  subtitle,
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)

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
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {/* Before Image */}
            <div className="absolute inset-0">
              <Image
                src={beforeImage}
                alt={beforeLabel}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                {beforeLabel}
              </div>
            </div>
            
            {/* After Image */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={afterImage}
                alt={afterLabel}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                {afterLabel}
              </div>
            </div>
            
            {/* Slider */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full" />
              </div>
            </div>
            
            {/* Invisible slider input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Visual Element 3: Animated Infographic
export function VisualInfographic({
  eyebrow,
  title,
  subtitle,
  centerIcon,
  items
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  centerIcon?: React.ReactNode
  items: Array<{
    title: string
    description: string
    icon: React.ReactNode
    color?: string
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

        <div className="relative max-w-4xl mx-auto">
          {/* Center Element */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white z-10"
          >
            {centerIcon || <Target className="w-12 h-12" />}
          </motion.div>

          {/* Surrounding Items */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 pb-16">
            {items.map((item, index) => {
              const angle = (index * 360) / items.length
              const radius = 200
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  {/* Connection Line */}
                  <div 
                    className="absolute w-px bg-gray-200 origin-bottom"
                    style={{
                      height: `${radius}px`,
                      transform: `rotate(${angle + 90}deg)`,
                      left: '50%',
                      bottom: '50%'
                    }}
                  />
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow text-center relative z-10">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      item.color || 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
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

// Visual Element 4: Floating Cards Animation
export function VisualFloatingCards({
  eyebrow,
  title,
  subtitle,
  cards
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  cards: Array<{
    title: string
    description: string
    icon: React.ReactNode
    image?: string
    delay?: number
  }>
}) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
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
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: card.delay || index * 0.2, 
                duration: 0.8,
                type: "spring",
                bounce: 0.3
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border hover:border-blue-200 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  {card.image && (
                    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-200 transition-colors">
                    {card.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Visual Element 5: Parallax Sections
export function VisualParallaxSection({
  eyebrow,
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop",
  overlayColor = "from-black/70 to-black/50",
  content
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  backgroundImage?: string
  overlayColor?: string
  content?: React.ReactNode
}) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`} />
      </motion.div>

      <div className="relative container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {eyebrow && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6">
              {eyebrow}
            </div>
          )}
          
          {title && (
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className="text-xl lg:text-2xl font-semibold text-white/90 mb-8">
              {subtitle}
            </p>
          )}
          
          {content}
        </motion.div>
      </div>
    </section>
  )
}
