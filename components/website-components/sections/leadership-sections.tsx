"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Users, 
  Award, 
  Target, 
  TrendingUp, 
  Globe, 
  Heart, 
  Lightbulb, 
  Shield,
  ArrowRight,
  Quote,
  Linkedin,
  Twitter,
  Mail,
  Calendar,
  MapPin,
  Star,
  ChevronDown,
  ChevronRight,
  Play
} from "lucide-react"

// Leadership Section 1: Executive Profiles Grid
export function LeadershipExecutiveProfiles({
  eyebrow,
  title,
  subtitle,
  leaders
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  leaders: Array<{
    name: string
    role: string
    image: string
    bio: string
    achievements: string[]
    social?: {
      linkedin?: string
      twitter?: string
      email?: string
    }
    experience: string
    education?: string
    specialties: string[]
  }>
}) {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null)

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
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedLeader(selectedLeader === index ? null : index)}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200">
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {leader.experience}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">{leader.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {leader.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {leader.social && (
                  <div className="flex justify-center space-x-3">
                    {leader.social.linkedin && (
                      <a
                        href={leader.social.linkedin}
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.twitter && (
                      <a
                        href={leader.social.twitter}
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.email && (
                      <a
                        href={`mailto:${leader.social.email}`}
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}

                {/* Expanded Details */}
                {selectedLeader === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    {leader.education && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                        <p className="text-gray-600 text-sm">{leader.education}</p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
                      <ul className="space-y-1">
                        {leader.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start">
                            <Star className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Leadership Section 2: Organizational Chart
export function LeadershipOrgChart({
  eyebrow,
  title,
  subtitle,
  structure
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  structure: {
    ceo: {
      name: string
      role: string
      image: string
    }
    departments: Array<{
      head: {
        name: string
        role: string
        image: string
      }
      team: Array<{
        name: string
        role: string
        image: string
      }>
    }>
  }
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
          {/* CEO Level */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={structure.ceo.image}
                    alt={structure.ceo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{structure.ceo.name}</h3>
                  <p className="text-blue-600 font-medium">{structure.ceo.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connection Lines */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-8 bg-gray-300" />
          </div>
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-4xl h-px bg-gray-300" />
          </div>

          {/* Department Heads */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {structure.departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line to CEO */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-300 -mt-8" />
                
                {/* Department Head */}
                <div className="bg-white rounded-xl p-4 shadow-md border mb-6">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto rounded-full overflow-hidden mb-3">
                      <Image
                        src={dept.head.image}
                        alt={dept.head.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{dept.head.name}</h4>
                    <p className="text-blue-600 text-xs font-medium">{dept.head.role}</p>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-3">
                  {dept.team.map((member, memberIndex) => (
                    <div
                      key={memberIndex}
                      className="bg-white rounded-lg p-3 shadow-sm border"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 text-xs">{member.name}</h5>
                          <p className="text-gray-600 text-xs">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Leadership Section 3: Vision & Strategy
export function LeadershipVisionStrategy({
  eyebrow,
  title,
  subtitle,
  visionItems
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  visionItems: Array<{
    icon: React.ReactNode
    title: string
    description: string
    metrics?: {
      label: string
      value: string
    }[]
  }>
}) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="container-custom">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-white/30 transition-colors">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-white/80 leading-relaxed mb-6">
                  {item.description}
                </p>
                
                {item.metrics && (
                  <div className="space-y-2">
                    {item.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">{metric.label}</span>
                        <span className="text-white font-semibold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Leadership Section 4: Leadership Journey Timeline
export function LeadershipJourneyTimeline({
  eyebrow,
  title,
  subtitle,
  milestones
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  milestones: Array<{
    year: string
    title: string
    description: string
    leader: string
    achievement: string
    image?: string
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
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white z-10 shadow-lg" />
              
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {milestone.year}
                    </div>
                    <div className="ml-3 text-gray-600 text-sm">Led by {milestone.leader}</div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {milestone.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {milestone.description}
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">Key Achievement:</span>
                    </div>
                    <p className="text-green-700 mt-1">{milestone.achievement}</p>
                  </div>
                  
                  {milestone.image && (
                    <div className="relative h-48 rounded-lg overflow-hidden mt-4">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
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

// Leadership Section 5: Leadership Quotes Carousel
export function LeadershipQuotesCarousel({
  eyebrow,
  title,
  subtitle,
  quotes
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  quotes: Array<{
    quote: string
    author: string
    role: string
    image: string
    context?: string
  }>
}) {
  const [currentQuote, setCurrentQuote] = useState(0)

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
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border">
            <Quote className="w-12 h-12 text-blue-500 mx-auto mb-6" />
            
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <blockquote className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-relaxed">
                "{quotes[currentQuote].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={quotes[currentQuote].image}
                    alt={quotes[currentQuote].author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{quotes[currentQuote].author}</div>
                  <div className="text-blue-600 font-medium">{quotes[currentQuote].role}</div>
                </div>
              </div>
              
              {quotes[currentQuote].context && (
                <p className="text-gray-600 italic">
                  {quotes[currentQuote].context}
                </p>
              )}
            </motion.div>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentQuote ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
