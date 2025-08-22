"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube,
  Github,
  ArrowUp,
  Heart,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  company: [
    { name: "About Us", href: "/company/about" },
    { name: "Our Mission", href: "/company/mission" },
    { name: "Leadership", href: "/company/leadership" },
    { name: "Careers", href: "/company/careers" },
    { name: "Press Kit", href: "/company/press" },
    { name: "Contact", href: "/company/contact" }
  ],
  services: [
    { name: "What We Do", href: "/services/overview" },
    { name: "Solutions", href: "/services/solutions" },
    { name: "Industries", href: "/services/industries" },
    { name: "Case Studies", href: "/services/case-studies" },
    { name: "Pricing", href: "/services/pricing" },
    { name: "API Docs", href: "/docs/api" }
  ],
  resources: [
    { name: "Blog", href: "/resources/blog" },
    { name: "News", href: "/resources/news" },
    { name: "Events", href: "/resources/events" },
    { name: "Support", href: "/resources/support" },
    { name: "Documentation", href: "/docs" },
    { name: "Community", href: "/community" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Cookie Policy", href: "/legal/cookies" },
    { name: "GDPR", href: "/legal/gdpr" },
    { name: "Security", href: "/legal/security" },
    { name: "Compliance", href: "/legal/compliance" }
  ]
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter, color: "hover:text-blue-400" },
  { name: "LinkedIn", href: "#", icon: Linkedin, color: "hover:text-blue-600" },
  { name: "Facebook", href: "#", icon: Facebook, color: "hover:text-blue-700" },
  { name: "Instagram", href: "#", icon: Instagram, color: "hover:text-pink-500" },
  { name: "YouTube", href: "#", icon: Youtube, color: "hover:text-red-600" },
  { name: "GitHub", href: "#", icon: Github, color: "hover:text-gray-700" }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 blur"></div>
                </div>
                <span className="font-bold text-2xl">Template</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We help companies innovate, scale, and succeed in the digital age with 
                cutting-edge solutions and world-class support.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">hello@company.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">123 Business St, City, ST 12345</span>
                </div>
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-700/50"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Get the latest insights, product updates, and industry news delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="btn-primary px-6 py-3 rounded-xl">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-6 border-t border-gray-700/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 Company Name. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="h-4 w-4 text-red-500 inline" />
              <span className="hidden sm:inline">and</span>
              <Sparkles className="h-4 w-4 text-yellow-500 inline" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-lg hover:bg-gray-800/50 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 flex items-center justify-center group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 text-white group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </footer>
  )
}
