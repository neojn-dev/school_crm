"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"
import { TrendingUp, Users, Award, Target, Clock, Globe, Star, Zap } from "lucide-react"

interface StatItem {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon?: React.ReactNode
  color?: string
}

interface BaseStatsProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  stats: StatItem[]
}

// Animated Counter Hook
function useAnimatedCounter(value: number, duration: number = 2000) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration })
  const isInView = useInView(nodeRef)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Intl.NumberFormat().format(Math.round(latest))
      }
    })
  }, [springValue])

  return nodeRef
}

// Individual Stat Item Component
function StatItem({ stat, index }: { stat: StatItem; index: number }) {
  const counterRef = useAnimatedCounter(stat.value)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      {stat.icon && (
        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
          stat.color || 'bg-blue-100 text-blue-600'
        } group-hover:scale-110 transition-transform`}>
          {stat.icon}
        </div>
      )}
      
      <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
        {stat.prefix}
        <span ref={counterRef}>0</span>
        {stat.suffix}
      </div>
      
      <div className="text-gray-600 font-medium">
        {stat.label}
      </div>
    </motion.div>
  )
}

// Stats Variant 1: Classic Grid
export function StatsGrid({
  eyebrow,
  title,
  subtitle,
  stats
}: BaseStatsProps) {
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual Stat Card Item Component
function StatCardItem({ stat, index }: { stat: StatItem; index: number }) {
  const counterRef = useAnimatedCounter(stat.value)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-blue-200 text-center">
        {stat.icon && (
          <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
            stat.color || 'bg-blue-100 text-blue-600'
          } group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
        )}
        
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {stat.prefix}
          <span ref={counterRef}>0</span>
          {stat.suffix}
        </div>
        
        <div className="text-gray-600 font-medium">
          {stat.label}
        </div>
      </div>
    </motion.div>
  )
}

// Stats Variant 2: Cards with Background
export function StatsCards({
  eyebrow,
  title,
  subtitle,
  stats
}: BaseStatsProps) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCardItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual Stat Bar Item Component
function StatBarItem({ stat, index }: { stat: StatItem; index: number }) {
  const counterRef = useAnimatedCounter(stat.value)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      {stat.icon && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          {stat.icon}
        </div>
      )}
      
      <div className="text-4xl lg:text-5xl font-bold mb-2">
        {stat.prefix}
        <span ref={counterRef}>0</span>
        {stat.suffix}
      </div>
      
      <div className="text-white/90 font-medium">
        {stat.label}
      </div>
    </motion.div>
  )
}

// Stats Variant 3: Horizontal Bar
export function StatsBar({
  eyebrow,
  title,
  subtitle,
  stats
}: BaseStatsProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <StatBarItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Variant 4: Circular Progress
export function StatsCircular({
  eyebrow,
  title,
  subtitle,
  stats
}: BaseStatsProps) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const counterRef = useAnimatedCounter(stat.value)
            const percentage = Math.min((stat.value / 1000) * 100, 100) // Adjust based on your needs
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: percentage / 100 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      viewport={{ once: true }}
                      style={{
                        strokeDasharray: "314.16",
                        strokeDashoffset: "314.16"
                      }}
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {stat.icon && (
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.prefix}
                  <span ref={counterRef}>0</span>
                  {stat.suffix}
                </div>
                
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Stats Variant 5: Minimal Lines
export function StatsMinimal({
  eyebrow,
  title,
  subtitle,
  stats
}: BaseStatsProps) {
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
          {stats.map((stat, index) => {
            const counterRef = useAnimatedCounter(stat.value)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-between py-8 border-b border-gray-200 last:border-b-0 group"
              >
                <div className="flex items-center space-x-4">
                  {stat.icon && (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      stat.color || 'bg-blue-100 text-blue-600'
                    } group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                  )}
                  
                  <div className="text-lg font-semibold text-gray-900">
                    {stat.label}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-gray-900">
                  {stat.prefix}
                  <span ref={counterRef}>0</span>
                  {stat.suffix}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
