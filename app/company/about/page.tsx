import { HeroSection, FeatureGrid, CTABanner } from "@/components/website-components/sections"
import { Users, Award, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="About"
        title="Who we are"
        subtitle="Purpose-driven, customer-obsessed"
        description="We build products that blend beautiful design with rock-solid engineering."
      />
      <FeatureGrid
        eyebrow="Our values"
        items={[
          { title: "Excellence", description: "Relentless pursuit of quality.", icon: <Award className="h-5 w-5" /> },
          { title: "Empathy", description: "We obsess over user outcomes.", icon: <Users className="h-5 w-5" /> },
          { title: "Focus", description: "Clarity and craft over chaos.", icon: <Target className="h-5 w-5" /> },
        ]}
      />
      <CTABanner title="Join our journey" cta={{ label: "View careers", href: "/company/careers" }} />
    </div>
  )
}


