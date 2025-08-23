export default function IndustriesPage() {
  const industries = [
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Transforming healthcare delivery with secure, compliant technology solutions.",
      challenges: ["Patient data security", "Regulatory compliance", "System integration", "Cost management"],
      solutions: ["Electronic Health Records", "Telemedicine platforms", "Patient portals", "Medical imaging systems"],
      stats: { clients: "50+", projects: "120+", satisfaction: "98%" }
    },
    {
      name: "Financial Services",
      icon: "🏦",
      description: "Empowering financial institutions with secure, scalable fintech solutions.",
      challenges: ["Regulatory compliance", "Cybersecurity threats", "Legacy system modernization", "Customer expectations"],
      solutions: ["Digital banking platforms", "Payment processing", "Risk management systems", "Blockchain solutions"],
      stats: { clients: "30+", projects: "85+", satisfaction: "96%" }
    },
    {
      name: "Retail & E-commerce",
      icon: "🛍️",
      description: "Driving retail innovation with omnichannel commerce and customer experience solutions.",
      challenges: ["Omnichannel integration", "Inventory management", "Customer personalization", "Supply chain optimization"],
      solutions: ["E-commerce platforms", "POS systems", "Inventory management", "Customer analytics"],
      stats: { clients: "75+", projects: "200+", satisfaction: "94%" }
    },
    {
      name: "Manufacturing",
      icon: "🏭",
      description: "Optimizing manufacturing operations with IoT, automation, and data analytics.",
      challenges: ["Production efficiency", "Quality control", "Supply chain visibility", "Equipment maintenance"],
      solutions: ["Industrial IoT", "MES systems", "Predictive maintenance", "Supply chain management"],
      stats: { clients: "40+", projects: "95+", satisfaction: "97%" }
    },
    {
      name: "Education",
      icon: "🎓",
      description: "Enhancing learning experiences with innovative educational technology solutions.",
      challenges: ["Remote learning", "Student engagement", "Administrative efficiency", "Data management"],
      solutions: ["Learning management systems", "Virtual classrooms", "Student information systems", "Educational apps"],
      stats: { clients: "60+", projects: "150+", satisfaction: "95%" }
    },
    {
      name: "Real Estate",
      icon: "🏢",
      description: "Modernizing real estate operations with property management and transaction platforms.",
      challenges: ["Property management", "Transaction processing", "Market analysis", "Customer relationship management"],
      solutions: ["Property management systems", "CRM platforms", "Virtual tours", "Market analytics"],
      stats: { clients: "35+", projects: "80+", satisfaction: "93%" }
    }
  ]

  return (
    <>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Industries We Serve</h1>
              <p className="text-xl leading-relaxed">
                We bring deep industry expertise and tailored solutions to help businesses 
                across various sectors achieve their digital transformation goals.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Industry Expertise</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                With years of experience across multiple industries, we understand the unique 
                challenges and opportunities in each sector.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{industry.name}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-violet-600">{industry.stats.clients}</div>
                      <div className="text-gray-500">Clients</div>
                    </div>
                    <div>
                      <div className="font-semibold text-violet-600">{industry.stats.projects}</div>
                      <div className="text-gray-500">Projects</div>
                    </div>
                    <div>
                      <div className="font-semibold text-violet-600">{industry.stats.satisfaction}</div>
                      <div className="text-gray-500">Satisfaction</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Industry Sections */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {industries.slice(0, 3).map((industry, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{industry.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{industry.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{industry.description}</p>
                      
                      <h4 className="font-semibold text-gray-900 mb-3">Key Challenges</h4>
                      <div className="space-y-2 mb-6">
                        {industry.challenges.map((challenge, challengeIndex) => (
                          <div key={challengeIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-gray-700 text-sm">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Our Solutions</h4>
                      <div className="space-y-2 mb-6">
                        {industry.solutions.map((solution, solutionIndex) => (
                          <div key={solutionIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-700 text-sm">{solution}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-violet-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-violet-900 mb-2">Success Metrics</h5>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-violet-600">{industry.stats.clients}</div>
                            <div className="text-xs text-violet-700">Clients Served</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-violet-600">{industry.stats.projects}</div>
                            <div className="text-xs text-violet-700">Projects Completed</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-violet-600">{industry.stats.satisfaction}</div>
                            <div className="text-xs text-violet-700">Client Satisfaction</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Industry Solutions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Cross-Industry Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Some solutions transcend industry boundaries and can benefit organizations 
                across multiple sectors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Cloud Migration", description: "Move to cloud infrastructure for scalability and cost savings", icon: "☁️" },
                { title: "Data Analytics", description: "Transform data into actionable business insights", icon: "📊" },
                { title: "Cybersecurity", description: "Protect digital assets with comprehensive security solutions", icon: "🔒" },
                { title: "Mobile Apps", description: "Engage customers and employees with mobile applications", icon: "📱" }
              ].map((solution, index) => (
                <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-3xl mb-3">{solution.icon}</div>
                  <h3 className="font-semibold mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-sm">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-violet-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Industry?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our industry-specific expertise can help solve 
              your unique business challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-violet-600 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </section>
      </>
  )
}
