import { HeroSection, FeatureGrid } from "@/components/website-components/sections"
import { Wrench, Settings, Shield } from "lucide-react"

export default function ServicesOverviewPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="Services"
        title="What we do"
        description="From discovery to delivery, we partner to ship high-impact software."
      />
      <FeatureGrid
        eyebrow="Capabilities"
        items={[
          { title: "Product", description: "Discovery, strategy, and roadmaps.", icon: <Settings className="h-5 w-5" /> },
          { title: "Engineering", description: "Full-stack web and data.", icon: <Wrench className="h-5 w-5" /> },
          { title: "Security", description: "Best practices built-in.", icon: <Shield className="h-5 w-5" /> },
        ]}
      />
    </div>
  )
}


