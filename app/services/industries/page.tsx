import { HeroSection } from "@/components/website-components/sections"

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      <HeroSection eyebrow="Industries" title="Sectors we serve" description="Healthcare, education, public sector, and more." />
      <div className="container-custom py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Healthcare", "Education", "Government", "Finance", "Energy", "Retail"].map((name) => (
          <div key={name} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow">
            <div className="h-32 rounded-xl bg-gray-100 mb-4" />
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">Case studies and solutions</div>
          </div>
        ))}
      </div>
    </div>
  )
}


