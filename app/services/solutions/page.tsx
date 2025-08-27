import { HeroSection, FeatureGrid } from "@/components/website-components/sections"

export default function SolutionsPage() {
  return (
    <div className="flex flex-col">
      <HeroSection eyebrow="Solutions" title="Tailored solutions" description="We adapt the stack to your needs." />
      <FeatureGrid
        items={[
          { title: "Dashboards", description: "Insightful analytics and KPIs." },
          { title: "Workflows", description: "Streamlined internal tools." },
          { title: "Websites", description: "Fast, accessible, and beautiful." },
        ]}
      />
    </div>
  )
}


