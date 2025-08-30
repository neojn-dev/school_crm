"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Github, Mail, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  name: string
  role: string
  bio?: string
  image: string
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
    email?: string
  }
  skills?: string[]
  joinDate?: string
  location?: string
}

interface BaseTeamProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  members: TeamMember[]
}

// Team Variant 1: Grid with Bios
export function TeamGrid({
  eyebrow,
  title,
  subtitle,
  members
}: BaseTeamProps) {
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
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                
                {member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                )}
                
                {member.skills && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                {member.social && (
                  <div className="flex items-center justify-center space-x-3">
                    {member.social.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Link>
                    )}
                    {member.social.twitter && (
                      <Link
                        href={member.social.twitter}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </Link>
                    )}
                    {member.social.github && (
                      <Link
                        href={member.social.github}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </Link>
                    )}
                    {member.social.email && (
                      <Link
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </Link>
                    )}
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

// Team Variant 2: Carousel
export function TeamCarousel({
  eyebrow,
  title,
  subtitle,
  members
}: BaseTeamProps) {
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

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [0, -100 * members.length] }}
            transition={{
              duration: members.length * 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex space-x-8"
            style={{ width: `${(members.length + 1) * 100}%` }}
          >
            {[...members, ...members].map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border">
                  <div className="flex items-start space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      
                      <p className="text-blue-600 font-medium text-sm mb-2">
                        {member.role}
                      </p>
                      
                      {member.location && (
                        <div className="flex items-center text-gray-500 text-xs mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {member.location}
                        </div>
                      )}
                      
                      {member.bio && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {member.bio.slice(0, 120)}...
                        </p>
                      )}
                      
                      {member.social && (
                        <div className="flex items-center space-x-2">
                          {member.social.linkedin && (
                            <Link
                              href={member.social.linkedin}
                              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                            >
                              <Linkedin className="w-3 h-3" />
                            </Link>
                          )}
                          {member.social.twitter && (
                            <Link
                              href={member.social.twitter}
                              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                            >
                              <Twitter className="w-3 h-3" />
                            </Link>
                          )}
                          {member.social.github && (
                            <Link
                              href={member.social.github}
                              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors"
                            >
                              <Github className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Team Variant 3: Org Chart
export function TeamOrgChart({
  eyebrow,
  title,
  subtitle,
  members
}: BaseTeamProps) {
  const leadership = members.filter(m => 
    m.role.toLowerCase().includes('ceo') || 
    m.role.toLowerCase().includes('cto') || 
    m.role.toLowerCase().includes('chief')
  )
  
  const managers = members.filter(m => 
    m.role.toLowerCase().includes('head') || 
    m.role.toLowerCase().includes('director') || 
    m.role.toLowerCase().includes('vp')
  )
  
  const team = members.filter(m => 
    !leadership.includes(m) && !managers.includes(m)
  )

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

        <div className="space-y-16">
          {/* Leadership */}
          {leadership.length > 0 && (
            <div>
              <h3 className="text-center text-lg font-semibold text-gray-900 mb-8">Leadership</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  {leadership.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h4>
                      <p className="text-blue-600 font-medium text-sm">
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Connecting Lines */}
          {leadership.length > 0 && managers.length > 0 && (
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gray-300"></div>
            </div>
          )}

          {/* Management */}
          {managers.length > 0 && (
            <div>
              <h3 className="text-center text-lg font-semibold text-gray-900 mb-8">Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {managers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-blue-600 font-medium text-xs">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Connecting Lines */}
          {managers.length > 0 && team.length > 0 && (
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gray-300"></div>
            </div>
          )}

          {/* Team */}
          {team.length > 0 && (
            <div>
              <h3 className="text-center text-lg font-semibold text-gray-900 mb-8">Team</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {team.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-blue-600 font-medium text-xs">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Team Variant 4: Leadership Spotlight
export function TeamLeadershipSpotlight({
  eyebrow,
  title,
  subtitle,
  members
}: BaseTeamProps) {
  const leadership = members.filter(m => 
    m.role.toLowerCase().includes('ceo') || 
    m.role.toLowerCase().includes('cto') || 
    m.role.toLowerCase().includes('chief')
  ).slice(0, 4)

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
          {leadership.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start space-x-6">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-blue-400 font-semibold mb-4">
                    {member.role}
                  </p>
                  
                  {member.joinDate && (
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {member.joinDate}
                    </div>
                  )}
                  
                  {member.location && (
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {member.location}
                    </div>
                  )}
                  
                  {member.bio && (
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  )}
                  
                  {member.social && (
                    <div className="flex items-center space-x-3">
                      {member.social.linkedin && (
                        <Link
                          href={member.social.linkedin}
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </Link>
                      )}
                      {member.social.twitter && (
                        <Link
                          href={member.social.twitter}
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </Link>
                      )}
                      {member.social.github && (
                        <Link
                          href={member.social.github}
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
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
