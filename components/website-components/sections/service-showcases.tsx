"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Star, Clock, Users, Shield, Zap, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Service {
  title: string
  description: string
  features?: string[]
  image?: string
  icon?: React.ReactNode
  price?: string
  duration?: string
  link?: string
  popular?: boolean
}

interface BaseServiceProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  services: Service[]
}

// Service Variant 1: Cards Layout
export function ServiceCards({
  eyebrow,
  title,
  subtitle,
  services
}: BaseServiceProps) {
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
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 h-full flex flex-col">
                {service.image && (
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {service.icon && !service.image && (
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-200 transition-colors">
                    {service.icon}
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                
                {service.features && (
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex items-center justify-between mt-auto">
                  {service.price && (
                    <div className="text-2xl font-bold text-gray-900">
                      {service.price}
                    </div>
                  )}
                  
                  {service.link && (
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group-hover:translate-x-1 transform duration-200"
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

// Service Variant 2: Timeline
export function ServiceTimeline({
  eyebrow,
  title,
  subtitle,
  services
}: BaseServiceProps) {
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
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line */}
              {index < services.length - 1 && (
                <div className="absolute left-1/2 top-20 w-px h-32 bg-gray-300 transform -translate-x-1/2 hidden lg:block" />
              )}
              
              <div className={`flex items-center mb-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                <div className="flex-1 lg:pr-12">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border">
                    {service.icon && (
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        {service.icon}
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    {service.features && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {service.duration && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        {service.duration}
                      </div>
                    )}
                    
                    {service.link && (
                      <Link
                        href={service.link}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        Get started
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="hidden lg:flex w-16 h-16 bg-blue-600 rounded-full items-center justify-center text-white font-bold text-lg flex-shrink-0 z-10">
                  {index + 1}
                </div>
                
                <div className="flex-1 lg:pl-12">
                  {service.image && (
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
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

// Service Variant 3: Process Flow
export function ServiceProcessFlow({
  eyebrow,
  title,
  subtitle,
  services
}: BaseServiceProps) {
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

        <div className="relative">
          {/* Flow Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 relative z-10">
                  {index + 1}
                </div>
                
                <div className="text-center">
                  {service.icon && (
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                      {service.icon}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {service.duration && (
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                  )}
                </div>
                
                {/* Arrow */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-gray-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Service Variant 4: Comparison Table
export function ServiceComparison({
  eyebrow,
  title,
  subtitle,
  services
}: BaseServiceProps) {
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

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Features</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Duration</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`hover:bg-gray-50 transition-colors ${
                    service.popular ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center">
                      {service.icon && (
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                          {service.icon}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center">
                          {service.title}
                          {service.popular && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {service.description.slice(0, 80)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-sm text-gray-600">
                      {service.features?.length || 0} features
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-sm text-gray-600">
                      {service.duration || 'Custom'}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="font-semibold text-gray-900">
                      {service.price || 'Quote'}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    {service.link && (
                      <Link
                        href={service.link}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Get started
                      </Link>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// Service Variant 5: Pricing Tiers
export function ServicePricingTiers({
  eyebrow,
  title,
  subtitle,
  services
}: BaseServiceProps) {
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

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative ${service.popular ? 'scale-105' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 h-full flex flex-col ${
                service.popular ? 'border-blue-500' : 'border-gray-200 hover:border-blue-200'
              } transition-all duration-300`}>
                {service.icon && (
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    {service.icon}
                  </div>
                )}
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {service.price}
                </div>
                
                <p className="text-gray-600 mb-8 flex-1">
                  {service.description}
                </p>
                
                {service.features && (
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                {service.link && (
                  <Link
                    href={service.link}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${
                      service.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get started
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Service Variant 6: Interactive Demos
export function ServiceInteractiveDemo({
  eyebrow,
  title,
  subtitle,
  services
}: BaseServiceProps) {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container-custom">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {services.slice(0, 4).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-blue-500">
                {service.icon && (
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                )}
                
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {service.features && (
                  <ul className="space-y-2 mb-8">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex items-center justify-between">
                  {service.link && (
                    <Link
                      href={service.link}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      Try demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                  
                  {service.price && (
                    <div className="text-xl font-bold text-blue-400">
                      {service.price}
                    </div>
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
