"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface HeroSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  backgroundImageUrl?: string
}

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImageUrl
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="relative container-custom py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-xl font-semibold text-gray-800">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-6 text-lg text-gray-600">
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex items-center gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold bg-white/80 backdrop-blur hover:bg-white shadow-sm hover:shadow transition-all"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-primary opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-gradient-primary opacity-20 rounded-full blur-3xl" />
    </section>
  )
}


