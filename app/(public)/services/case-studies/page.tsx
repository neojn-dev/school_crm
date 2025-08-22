import { Header, Footer } from "@/components/layout"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Healthcare System Digital Transformation",
      client: "Regional Medical Center",
      industry: "Healthcare",
      challenge: "The medical center needed to modernize their patient management system and improve operational efficiency while maintaining HIPAA compliance.",
      solution: "We implemented a comprehensive EHR system with integrated patient portals, appointment scheduling, and real-time analytics dashboard.",
      results: [
        "40% reduction in patient wait times",
        "60% increase in patient satisfaction scores",
        "30% improvement in operational efficiency",
        "100% HIPAA compliance maintained"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "FHIR"],
      duration: "8 months",
      image: "HCS"
    },
    {
      title: "E-commerce Platform Scaling",
      client: "Fashion Retailer Inc.",
      industry: "Retail",
      challenge: "A growing fashion retailer needed to scale their e-commerce platform to handle 10x traffic during peak seasons while maintaining performance.",
      solution: "We redesigned their architecture using microservices, implemented CDN, and optimized their database queries for better performance.",
      results: [
        "99.9% uptime during Black Friday",
        "300% increase in concurrent users handled",
        "50% faster page load times",
        "25% increase in conversion rates"
      ],
      technologies: ["Next.js", "Kubernetes", "Redis", "MongoDB", "Stripe"],
      duration: "6 months",
      image: "FRI"
    },
    {
      title: "Financial Services Modernization",
      client: "Community Bank",
      industry: "Finance",
      challenge: "A community bank needed to modernize their legacy systems and provide digital banking services to compete with larger institutions.",
      solution: "We developed a modern digital banking platform with mobile apps, online banking, and integrated payment processing.",
      results: [
        "200% increase in digital transactions",
        "45% reduction in operational costs",
        "90% customer adoption rate",
        "Zero security incidents"
      ],
      technologies: ["Angular", "Spring Boot", "Oracle", "Docker", "Plaid"],
      duration: "12 months",
      image: "CB"
    },
    {
      title: "Manufacturing IoT Implementation",
      client: "Industrial Manufacturing Co.",
      industry: "Manufacturing",
      challenge: "A manufacturing company wanted to implement IoT sensors and predictive maintenance to reduce downtime and improve efficiency.",
      solution: "We deployed IoT sensors across their production line and built a real-time monitoring dashboard with predictive analytics.",
      results: [
        "35% reduction in unplanned downtime",
        "20% increase in overall equipment effectiveness",
        "15% reduction in maintenance costs",
        "Real-time visibility across all operations"
      ],
      technologies: ["Python", "InfluxDB", "Grafana", "MQTT", "TensorFlow"],
      duration: "10 months",
      image: "IMC"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Case Studies</h1>
              <p className="text-xl leading-relaxed">
                Discover how we've helped businesses across various industries achieve 
                their digital transformation goals and drive measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Image/Visual */}
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-lg font-bold">{study.image}</span>
                        </div>
                        <p className="text-gray-600 font-medium">{study.client}</p>
                        <p className="text-sm text-gray-500">{study.industry}</p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="md:col-span-2 p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{study.title}</h2>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                          {study.industry}
                        </span>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Challenge</h3>
                          <p className="text-gray-600">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Solution</h3>
                          <p className="text-gray-600">{study.solution}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Results</h3>
                            <div className="space-y-2">
                              {study.results.map((result, resultIndex) => (
                                <div key={resultIndex} className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  <span className="text-gray-700 text-sm">{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {study.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">
                              <strong>Duration:</strong> {study.duration}
                            </div>
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

        {/* Success Metrics */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Track Record</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These numbers represent the collective impact of our solutions 
                across all client engagements.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">$50M+</div>
                <div className="text-gray-600">Cost Savings Generated</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">What Our Clients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say 
                about working with us.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold">John Davis</div>
                    <div className="text-sm text-gray-600">CTO, Regional Medical Center</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The team delivered an exceptional solution that transformed our patient care 
                  operations. The implementation was smooth and the results exceeded our expectations."
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Martinez</div>
                    <div className="text-sm text-gray-600">CEO, Fashion Retailer Inc.</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Their expertise in e-commerce scaling was exactly what we needed. Our platform 
                  now handles peak traffic seamlessly, and our conversion rates have never been higher."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                Download Case Studies
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
