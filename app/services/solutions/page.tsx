import { Header, Footer } from "@/components/layout"

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Enterprise Resource Planning (ERP)",
      description: "Streamline your business operations with integrated ERP solutions that connect all departments and processes.",
      benefits: ["Improved efficiency", "Real-time visibility", "Cost reduction", "Better decision making"],
      image: "ERP"
    },
    {
      title: "Customer Relationship Management (CRM)",
      description: "Enhance customer relationships and boost sales with our comprehensive CRM platform.",
      benefits: ["Better customer insights", "Increased sales", "Improved retention", "Automated workflows"],
      image: "CRM"
    },
    {
      title: "E-commerce Platform",
      description: "Build and scale your online business with our feature-rich e-commerce solutions.",
      benefits: ["Mobile-responsive design", "Secure payments", "Inventory management", "Analytics dashboard"],
      image: "E-COM"
    },
    {
      title: "Business Intelligence (BI)",
      description: "Transform your data into actionable insights with our advanced BI and analytics platform.",
      benefits: ["Data visualization", "Predictive analytics", "Custom reports", "Real-time monitoring"],
      image: "BI"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Our Solutions</h1>
              <p className="text-xl leading-relaxed">
                Comprehensive business solutions designed to solve complex challenges 
                and drive growth across various industries.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {solutions.map((solution, index) => (
                <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">{solution.title}</h2>
                    <p className="text-gray-600 mb-6 text-lg">{solution.description}</p>
                    <div className="space-y-3 mb-6">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                  <div className={`bg-gray-100 rounded-lg p-8 h-80 flex items-center justify-center ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-lg font-bold">{solution.image}</span>
                      </div>
                      <p className="text-gray-600">{solution.title} Interface</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Industry-Specific Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our solutions are tailored to meet the unique needs and challenges 
                of different industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { industry: "Healthcare", icon: "🏥", description: "HIPAA-compliant solutions for patient management and medical records" },
                { industry: "Finance", icon: "🏦", description: "Secure financial platforms with regulatory compliance and risk management" },
                { industry: "Retail", icon: "🛍️", description: "Omnichannel retail solutions with inventory and customer management" },
                { industry: "Manufacturing", icon: "🏭", description: "Industrial IoT and supply chain optimization solutions" },
                { industry: "Education", icon: "🎓", description: "Learning management systems and educational technology platforms" },
                { industry: "Real Estate", icon: "🏢", description: "Property management and real estate transaction platforms" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.industry}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Implementation Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven implementation methodology ensures smooth deployment 
                and successful adoption of your new solution.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Assessment</h3>
                  <p className="text-gray-600 text-sm">
                    Analyze current systems and identify requirements
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Customization</h3>
                  <p className="text-gray-600 text-sm">
                    Tailor the solution to your specific business needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Deployment</h3>
                  <p className="text-gray-600 text-sm">
                    Deploy and integrate with existing systems
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-600 font-bold text-lg">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-gray-600 text-sm">
                    Provide training and ongoing support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
              <p className="text-xl max-w-2xl mx-auto">
                Our solutions deliver measurable business value and ROI for our clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">40%</div>
                <div className="text-emerald-100">Average Cost Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">60%</div>
                <div className="text-emerald-100">Productivity Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25%</div>
                <div className="text-emerald-100">Revenue Growth</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">90%</div>
                <div className="text-emerald-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
