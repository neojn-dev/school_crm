import { HeroSection, FeatureGrid, CTABanner } from "@/components/website-components/sections"
import { Rocket, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="Modern Website Starter"
        title="Build stunning websites with reusable blocks"
        subtitle="Beautiful UI, smooth animations, and production-ready patterns"
        description="Compose pages from a large library of polished components: heroes, feature grids, testimonials, galleries, tables, and more."
        primaryCta={{ label: "Explore Components", href: "/company/about" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      <FeatureGrid
        eyebrow="Why this template"
        title="Everything you need to move fast"
        items={[
          { title: "Performance-first", description: "Optimized for speed and SEO.", icon: <Zap className="h-5 w-5" /> },
          { title: "Secure by default", description: "Auth and best practices included.", icon: <Shield className="h-5 w-5" /> },
          { title: "Developer joy", description: "Great DX and clear code.", icon: <Rocket className="h-5 w-5" /> },
        ]}
      />

      <CTABanner
        title="Need a custom section or layout?"
        description="Extend the library or compose new blocks effortlessly."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </div>
  )
}
