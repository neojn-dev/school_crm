import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Join our engineering team to build scalable solutions that impact millions of users worldwide."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY / Remote",
      type: "Full-time",
      description: "Lead product strategy and roadmap for our core platform, working closely with engineering and design teams."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Austin, TX / Remote",
      type: "Full-time",
      description: "Create intuitive and beautiful user experiences that delight our customers and drive business growth."
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Seattle, WA / Remote",
      type: "Full-time",
      description: "Analyze complex datasets to derive insights that inform product decisions and business strategy."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Drive brand awareness and customer acquisition through innovative marketing campaigns and strategies."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Chicago, IL / Remote",
      type: "Full-time",
      description: "Ensure customer satisfaction and success by providing exceptional support and building strong relationships."
    }
  ]

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Market-leading compensation packages with equity options"
    },
    {
      icon: "🏥",
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance"
    },
    {
      icon: "🏖️",
      title: "Flexible PTO",
      description: "Unlimited paid time off and flexible working arrangements"
    },
    {
      icon: "📚",
      title: "Learning & Development",
      description: "Annual learning budget and professional development opportunities"
    },
    {
      icon: "🏠",
      title: "Remote Work",
      description: "Work from anywhere with flexible hybrid options"
    },
    {
      icon: "🍕",
      title: "Great Perks",
      description: "Free meals, gym membership, and team building events"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl leading-relaxed mb-8">
                Build your career with us and help shape the future of technology. 
                We're looking for passionate individuals who want to make a difference.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Open Positions
              </button>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Work With Us?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We believe that great people do great work. That's why we've created an environment 
                where innovation thrives and careers flourish.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation First</h3>
                <p className="text-gray-600">
                  Work on cutting-edge projects that push the boundaries of what's possible 
                  in technology and make a real impact.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
                <p className="text-gray-600">
                  Advance your career with mentorship programs, skill development, 
                  and leadership opportunities at every level.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaborative Culture</h3>
                <p className="text-gray-600">
                  Join a diverse, inclusive team where every voice matters and 
                  collaboration drives our success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Benefits & Perks</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer comprehensive benefits and perks designed to support your well-being 
                and help you do your best work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Open Positions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our current job openings and find the perfect role to advance your career.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                        <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                          {position.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>📍 {position.location}</span>
                        <span>🏢 {position.department}</span>
                      </div>
                      <p className="text-gray-600">{position.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Hiring Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've designed our hiring process to be transparent, efficient, and focused 
                on finding the right fit for both you and our team.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Application</h3>
                  <p className="text-gray-600 text-sm">Submit your application and resume online</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Phone Screen</h3>
                  <p className="text-gray-600 text-sm">Initial conversation with our recruiting team</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Interviews</h3>
                  <p className="text-gray-600 text-sm">Meet with team members and hiring managers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Offer</h3>
                  <p className="text-gray-600 text-sm">Receive and negotiate your offer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  )
}
