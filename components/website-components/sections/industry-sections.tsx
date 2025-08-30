"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Heart, 
  GraduationCap, 
  Building, 
  DollarSign, 
  Zap, 
  ShoppingCart,
  Factory,
  Plane,
  Truck,
  Wifi,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  Target,
  BarChart3,
  Globe,
  Shield,
  Clock,
  Lightbulb,
  Settings,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

// Industry Section 1: Industry Sectors Grid
export function IndustrySectorsGrid({
  eyebrow,
  title,
  subtitle,
  industries
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  industries: Array<{
    name: string
    description: string
    icon: React.ReactNode
    image: string
    stats: {
      clients: string
      projects: string
      experience: string
    }
    specializations: string[]
    caseStudyLink: string
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
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 h-full flex flex-col">
                {/* Header Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                    industry.color || 'bg-blue-600'
                  }`}>
                    {industry.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{industry.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {industry.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{industry.stats.clients}</div>
                      <div className="text-xs text-gray-500">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{industry.stats.projects}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{industry.stats.experience}</div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.specializations.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={industry.caseStudyLink}
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors mt-auto"
                  >
                    View Case Studies
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Industry Section 2: Market Insights Dashboard
export function IndustryMarketInsights({
  eyebrow,
  title,
  subtitle,
  insights
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  insights: Array<{
    industry: string
    marketSize: string
    growthRate: string
    keyTrends: string[]
    opportunities: string[]
    challenges: string[]
    icon: React.ReactNode
    color: string
  }>
}) {
  const [activeInsight, setActiveInsight] = useState(0)

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
          {/* Industry Tabs */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            {insights.map((insight, index) => (
              <button
                key={index}
                onClick={() => setActiveInsight(index)}
                className={`flex items-center px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeInsight === index
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{insight.icon}</span>
                {insight.industry}
              </button>
            ))}
          </div>

          {/* Active Insight Content */}
          <motion.div
            key={activeInsight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Market Overview */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mr-4 ${insights[activeInsight].color}`}>
                    {insights[activeInsight].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {insights[activeInsight].industry} Market
                    </h3>
                    <p className="text-gray-600">Industry Overview</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {insights[activeInsight].marketSize}
                    </div>
                    <div className="text-sm text-gray-600">Market Size</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {insights[activeInsight].growthRate}
                    </div>
                    <div className="text-sm text-gray-600">Growth Rate</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    Key Trends
                  </h4>
                  <ul className="space-y-2">
                    {insights[activeInsight].keyTrends.map((trend, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {trend}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Opportunities & Challenges */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-4 h-4 text-blue-500 mr-2" />
                    Market Opportunities
                  </h4>
                  <ul className="space-y-3">
                    {insights[activeInsight].opportunities.map((opportunity, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-4 h-4 text-red-500 mr-2" />
                    Key Challenges
                  </h4>
                  <ul className="space-y-3">
                    {insights[activeInsight].challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <Eye className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Industry Section 3: Client Portfolio Showcase
export function IndustryClientPortfolio({
  eyebrow,
  title,
  subtitle,
  portfolios
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  portfolios: Array<{
    industry: string
    clients: Array<{
      name: string
      logo: string
      project: string
      result: string
      testimonial?: {
        quote: string
        author: string
        role: string
      }
    }>
  }>
}) {
  const [activePortfolio, setActivePortfolio] = useState(0)

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
          {/* Portfolio Tabs */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            {portfolios.map((portfolio, index) => (
              <button
                key={index}
                onClick={() => setActivePortfolio(index)}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activePortfolio === index
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {portfolio.industry}
              </button>
            ))}
          </div>

          {/* Active Portfolio Content */}
          <motion.div
            key={activePortfolio}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios[activePortfolio].clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                >
                  {/* Client Logo */}
                  <div className="flex items-center justify-center h-16 mb-6 bg-gray-50 rounded-lg">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {client.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Project:</strong> {client.project}
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 text-sm">
                      <strong>Result:</strong> {client.result}
                    </p>
                  </div>

                  {client.testimonial && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="text-blue-800 italic text-sm mb-2">
                        "{client.testimonial.quote}"
                      </p>
                      <div className="text-xs">
                        <div className="font-semibold text-blue-900">
                          {client.testimonial.author}
                        </div>
                        <div className="text-blue-700">
                          {client.testimonial.role}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Industry Section 4: Industry Expertise Matrix
export function IndustryExpertiseMatrix({
  eyebrow,
  title,
  subtitle,
  expertiseAreas
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  expertiseAreas: Array<{
    category: string
    description: string
    skills: Array<{
      name: string
      level: number
      description: string
      projects: number
    }>
    icon: React.ReactNode
    color: string
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

        <div className="grid lg:grid-cols-2 gap-12">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mr-4 ${area.color}`}>
                  {area.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {area.category}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {area.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {area.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">{skill.projects} projects</span>
                        <span className="font-semibold">{skill.level}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: skillIndex * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full ${area.color.replace('bg-', 'bg-gradient-to-r from-').replace('-600', '-500 to-' + area.color.split('-')[1] + '-600')}`}
                      />
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Industry Section 5: Industry News & Insights
export function IndustryNewsInsights({
  eyebrow,
  title,
  subtitle,
  insights
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  insights: Array<{
    title: string
    excerpt: string
    category: string
    author: string
    date: string
    readTime: string
    image: string
    tags: string[]
    link: string
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
          {insights.map((insight, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={insight.image}
                    alt={insight.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {insight.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {insight.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {insight.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {insight.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {insight.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {insight.author}</span>
                    <Link
                      href={insight.link}
                      className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
