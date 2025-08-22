import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container-custom py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            NextJS Template App
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A production-ready starter template with authentication, data management, 
            and modern UI components built with Next.js 14, TypeScript, and Tailwind CSS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/signin">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs/api-reference">View API Docs</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔐 Authentication
              </CardTitle>
              <CardDescription>
                Complete auth system with signup, signin, email verification, and password reset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• NextAuth.js with Prisma adapter</li>
                <li>• Email verification via SMTP</li>
                <li>• Role-based access control</li>
                <li>• Secure password hashing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Data Management
              </CardTitle>
              <CardDescription>
                Comprehensive data handling with forms, tables, and bulk operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Advanced data tables with sorting & filtering</li>
                <li>• Excel/CSV import with validation</li>
                <li>• File upload with security</li>
                <li>• Real-time form validation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Modern UI
              </CardTitle>
              <CardDescription>
                Beautiful, accessible interface with smooth animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Tailwind CSS + shadcn/ui</li>
                <li>• Framer Motion animations</li>
                <li>• Responsive design</li>
                <li>• ARIA accessibility</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-gray-600 mb-6">
            Sign up now and explore all the features this template has to offer.
          </p>
          <Button asChild size="lg">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
