"use client"

import Link from "next/link"
import { Building2, Shield, Heart } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 flex-shrink-0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-2 sm:space-y-0">
          {/* Left Side - Brand and Copyright */}
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">
              © 2024 AdminPanel. All rights reserved.
            </span>
          </div>

          {/* Center - Status */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
          </div>

          {/* Right Side - Links and Version */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Link href="/help" className="hover:text-blue-600 transition-colors">
              Help
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <span className="text-xs">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}