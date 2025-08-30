"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Settings,
  Smartphone,
  Monitor,
  Server,
  Lock,
  Rocket,
  Heart,
  Eye,
  MessageSquare,
  ThumbsUp
} from "lucide-react"

// Service Solution Section 1: Solution Categories Grid
export function SolutionCategoriesGrid({
  eyebrow,
  title,
  subtitle,
  categories
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  categories: Array<{
    title: string
    description: string
    icon: React.ReactNode
    features: string[]
    technologies: string[]
    cta: { label: string; href: string }
    image: string
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                      category.color || 'bg-blue-600'
                    }`}>
                      {category.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={category.cta.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {category.cta.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Service Solution Section 2: Process Flow Visualization
export function SolutionProcessFlow({
  eyebrow,
  title,
  subtitle,
  processes
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  processes: Array<{
    step: number
    title: string
    description: string
    icon: React.ReactNode
    deliverables: string[]
    duration: string
  }>
}) {
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

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-blue-200 z-0" />
            
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {process.step}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                    {process.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {process.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center text-blue-600 text-sm font-medium mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {process.duration}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Deliverables:</h4>
                    <ul className="space-y-1">
                      {process.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-gray-600 text-xs">
                          • {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Service Solution Section 3: Technology Stack Showcase
export function SolutionTechnologyStack({
  eyebrow,
  title,
  subtitle,
  stacks
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  stacks: Array<{
    category: string
    description: string
    technologies: Array<{
      name: string
      logo: string
      description: string
      proficiency: number
    }>
  }>
}) {
  const [activeStack, setActiveStack] = useState(0)

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

        <div className="max-w-6xl mx-auto">
          {/* Stack Categories */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            {stacks.map((stack, index) => (
              <button
                key={index}
                onClick={() => setActiveStack(index)}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeStack === index
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {stack.category}
              </button>
            ))}
          </div>

          {/* Active Stack Content */}
          <motion.div
            key={activeStack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {stacks[activeStack].category}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {stacks[activeStack].description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stacks[activeStack].technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 mr-4">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(tech.proficiency / 20)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">
                          {tech.proficiency}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Service Solution Section 4: Case Studies Showcase
export function SolutionCaseStudies({
  eyebrow,
  title,
  subtitle,
  caseStudies
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  caseStudies: Array<{
    title: string
    client: string
    industry: string
    challenge: string
    solution: string
    results: Array<{
      metric: string
      value: string
      improvement: string
    }>
    image: string
    testimonial?: {
      quote: string
      author: string
      role: string
    }
    cta: { label: string; href: string }
  }>
}) {
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

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <div className="flex items-center mb-6">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {study.industry}
                    </div>
                    <div className="ml-3 text-gray-600">{study.client}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {study.title}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Target className="w-4 h-4 text-red-500 mr-2" />
                        Challenge
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                        Solution
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                        Results
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              {result.metric}
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                              {result.improvement}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {study.testimonial && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <p className="text-gray-800 italic mb-3">
                          "{study.testimonial.quote}"
                        </p>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">
                            {study.testimonial.author}
                          </div>
                          <div className="text-gray-600">
                            {study.testimonial.role}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Link
                      href={study.cta.href}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      {study.cta.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Service Solution Section 5: Interactive Solution Comparison
export function SolutionComparison({
  eyebrow,
  title,
  subtitle,
  solutions
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  solutions: Array<{
    name: string
    description: string
    price: string
    popular?: boolean
    features: Array<{
      name: string
      included: boolean
      description?: string
    }>
    cta: { label: string; href: string }
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

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {solution.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`bg-white rounded-2xl p-8 shadow-lg border h-full flex flex-col ${
                  solution.popular ? 'border-blue-500 shadow-blue-100' : 'hover:border-blue-200'
                } transition-all duration-300`}>
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {solution.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {solution.description}
                    </p>
                    <div className="text-3xl font-bold text-blue-600">
                      {solution.price}
                    </div>
                  </div>
                  
                  <div className="flex-grow mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Features:</h4>
                    <ul className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <span className={`${
                              feature.included ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {feature.name}
                            </span>
                            {feature.description && (
                              <p className="text-gray-500 text-sm mt-1">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href={solution.cta.href}
                    className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-colors ${
                      solution.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {solution.cta.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
