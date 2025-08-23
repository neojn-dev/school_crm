"use client"

import Link from "next/link"
import { 
  Twitter, 
  Linkedin, 
  Github,
  Heart
} from "lucide-react"

const quickLinks = [
  { name: "About", href: "/company/about" },
  { name: "Services", href: "/services/overview" },
  { name: "Support", href: "/resources/support" },
  { name: "Privacy", href: "/legal/privacy" },
  { name: "Terms", href: "/legal/terms" }
]

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "GitHub", href: "#", icon: Github }
]

export function WebsiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Company Info */}
            <div>
              <h3 className="font-bold text-xl mb-4">NextJS Template</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                A modern, production-ready Next.js template with authentication, 
                data management, and beautiful UI components.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Get Started</h3>
              <p className="text-gray-400 mb-4">
                Ready to build something amazing?
              </p>
              <Link 
                href="/auth/signup"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 NextJS Template. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline-flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-red-500" />
              </span>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link 
                href="/legal/privacy" 
                className="text-gray-400 hover:text-white text-sm mr-4 transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/legal/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}