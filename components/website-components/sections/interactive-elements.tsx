"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronRight, Calendar, MapPin, Users, Award, Target, Zap } from "lucide-react"
import Image from "next/image"

// Interactive Element 1: Tabs Component
export function InteractiveTabs({
  eyebrow,
  title,
  subtitle,
  tabs
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  tabs: Array<{
    id: string
    label: string
    content: React.ReactNode
    icon?: React.ReactNode
  }>
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

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

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.content}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// Interactive Element 2: Accordion Component
export function InteractiveAccordion({
  eyebrow,
  title,
  subtitle,
  items
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: Array<{
    id: string
    title: string
    content: string
    icon?: React.ReactNode
  }>
}) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

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

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center">
                  {item.icon && (
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                      {item.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Interactive Element 3: Timeline Component
export function InteractiveTimeline({
  eyebrow,
  title,
  subtitle,
  events
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  events: Array<{
    year: string
    title: string
    description: string
    image?: string
    milestone?: boolean
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

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block" />
          
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white z-10 ${
                event.milestone ? 'bg-blue-600' : 'bg-gray-400'
              }`} />
              
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      event.milestone 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {event.year}
                    </div>
                    {event.milestone && (
                      <Award className="w-5 h-5 text-blue-600 ml-2" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  {event.image && (
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
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

// Interactive Element 4: Hover Cards Grid
export function InteractiveHoverCards({
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
    hoverContent: string
    color?: string
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 h-full relative overflow-hidden">
                {/* Front Content */}
                <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    card.color || 'bg-blue-100 text-blue-600'
                  }`}>
                    {card.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <p className="text-center leading-relaxed">
                    {card.hoverContent}
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

// Interactive Element 5: Progress Indicators
export function InteractiveProgress({
  eyebrow,
  title,
  subtitle,
  skills
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  skills: Array<{
    name: string
    percentage: number
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

        <div className="max-w-3xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {skill.name}
                </h3>
                <span className="text-sm font-medium text-gray-600">
                  {skill.percentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`h-3 rounded-full ${
                    skill.color || 'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
