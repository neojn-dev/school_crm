"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FeatureItem {
  title: string
  description: string
  icon?: ReactNode
}

interface FeatureGridProps {
  eyebrow?: string
  title?: string
  description?: string
  items: FeatureItem[]
  columns?: 2 | 3 | 4
}

export function FeatureGrid({ eyebrow, title, description, items, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns]

  return (
    <section className="container-custom py-16 lg:py-20">
      <div className="max-w-2xl mx-auto text-center">
        {eyebrow && <div className="text-blue-600 font-semibold text-sm">{eyebrow}</div>}
        {title && <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{title}</h2>}
        {description && <p className="mt-3 text-lg text-gray-600">{description}</p>}
      </div>
      <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${gridCols}`}>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {item.icon && (
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                {item.icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


