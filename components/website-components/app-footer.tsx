"use client"

import Link from "next/link"
import { Building2, Shield, Heart } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand and Copyright */}
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">
              © 2024 AdminPanel. All rights reserved.
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/help" className="hover:text-blue-600 transition-colors">
              Help & Support
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Secure</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-xs text-gray-500">
              Built with <Heart className="inline h-3 w-3 text-red-500" /> for modern business management
            </div>
            <div className="text-xs text-gray-500">
              Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
