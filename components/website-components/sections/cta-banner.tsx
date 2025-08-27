"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface CTABannerProps {
  title: string
  description?: string
  cta: { label: string; href: string }
}

export function CTABanner({ title, description, cta }: CTABannerProps) {
  return (
    <section className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            {description && <p className="mt-2 text-white/90">{description}</p>}
          </div>
          <div>
            <Link
              href={cta.href}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold shadow hover:shadow-md transition"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


