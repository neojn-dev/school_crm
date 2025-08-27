import { HeroSection, CTABanner } from "@/components/website-components/sections"

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        eyebrow="Careers"
        title="Do the best work of your career"
        subtitle="We hire for talent and kindness"
        description="Remote-first, async-friendly, and focused on outcomes."
      />
      <div className="container-custom py-12 grid gap-4">
        {["Senior Engineer", "Product Designer", "Customer Success"].map((role) => (
          <div key={role} className="rounded-xl border p-5 bg-white shadow-sm hover:shadow transition">
            <div className="font-semibold text-gray-900">{role}</div>
            <div className="text-sm text-gray-600">Remote • Full-time</div>
          </div>
        ))}
      </div>
      <CTABanner title="Don't see a fit?" description="We love great generalists." cta={{ label: "Send resume", href: "/contact" }} />
    </div>
  )
}


