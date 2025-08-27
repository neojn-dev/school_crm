import { HeroSection } from "@/components/website-components/sections"

export default function LeadershipPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="Leadership"
        title="Meet the team"
        subtitle="Experienced builders and operators"
        description="Our leadership combines deep domain expertise with a passion for great products."
      />
      <div className="container-custom py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="h-40 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 mb-4" />
            <div className="font-semibold text-gray-900">Leader {idx + 1}</div>
            <div className="text-sm text-gray-600">Role</div>
          </div>
        ))}
      </div>
    </div>
  )
}


