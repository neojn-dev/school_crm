import { Header, Footer } from "@/components/website-components"

export default function LeadershipPage() {
  const leaders = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      bio: "Sarah brings over 15 years of experience in technology leadership and has been instrumental in scaling our company from startup to global enterprise.",
      image: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Michael leads our technical vision and innovation strategy, with expertise in AI, cloud computing, and scalable system architecture.",
      image: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Operating Officer",
      bio: "Emily oversees our global operations and has successfully managed our expansion into new markets while maintaining operational excellence.",
      image: "ER"
    },
    {
      name: "David Kim",
      role: "Chief Financial Officer",
      bio: "David brings financial expertise and strategic planning skills that have helped guide our sustainable growth and investment decisions.",
      image: "DK"
    },
    {
      name: "Lisa Thompson",
      role: "Chief Marketing Officer",
      bio: "Lisa leads our brand strategy and customer engagement initiatives, driving our market presence and customer satisfaction.",
      image: "LT"
    },
    {
      name: "James Wilson",
      role: "Chief People Officer",
      bio: "James focuses on building our company culture, talent acquisition, and employee development programs across all our offices.",
      image: "JW"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Our Leadership Team</h1>
              <p className="text-xl leading-relaxed">
                Meet the visionary leaders who guide our company's mission and drive 
                innovation across all aspects of our business.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">{leader.image}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{leader.name}</h3>
                        <p className="text-primary font-medium">{leader.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Philosophy */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Leadership Philosophy</h2>
                <p className="text-gray-600">
                  Our leadership team believes in empowering every team member to reach their full potential 
                  while maintaining a clear vision for the company's future.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Collaborative Leadership</h3>
                  <p className="text-gray-600 mb-6">
                    We believe that the best decisions come from diverse perspectives and collaborative thinking. 
                    Our leadership team works together to ensure all voices are heard and valued.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">Open communication at all levels</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">Data-driven decision making</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">Empowerment and accountability</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Innovation Focus</h3>
                  <p className="text-gray-600 mb-6">
                    Our leaders are committed to fostering a culture of innovation where creativity is encouraged 
                    and calculated risks are supported to drive breakthrough solutions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">Continuous learning and development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">Experimentation and iteration</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">Customer-centric innovation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Board of Directors</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our board provides strategic guidance and oversight, bringing decades of combined 
                experience from various industries and backgrounds.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Robert Anderson", role: "Chairman", company: "Former CEO, TechCorp" },
                { name: "Maria Garcia", role: "Independent Director", company: "Partner, Venture Capital" },
                { name: "John Smith", role: "Independent Director", company: "Former CTO, GlobalTech" },
                { name: "Dr. Jennifer Lee", role: "Independent Director", company: "Professor, MIT" }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-600 font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.company}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
