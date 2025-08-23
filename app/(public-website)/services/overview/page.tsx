export default function ServicesOverviewPage() {
  const services = [
    {
      icon: "🔧",
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business needs and requirements.",
      features: ["Web Applications", "Mobile Apps", "API Development", "System Integration"]
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to modernize your technology stack.",
      features: ["Cloud Migration", "Infrastructure Setup", "DevOps", "Monitoring & Support"]
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Transform your data into actionable insights with our advanced analytics and BI solutions.",
      features: ["Data Visualization", "Predictive Analytics", "Business Intelligence", "Data Warehousing"]
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      description: "Leverage artificial intelligence to automate processes and gain competitive advantages.",
      features: ["ML Model Development", "Natural Language Processing", "Computer Vision", "Automation"]
    },
    {
      icon: "🔒",
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and ensure compliance.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Incident Response"]
    },
    {
      icon: "💡",
      title: "Digital Transformation",
      description: "Guide your organization through digital transformation with strategic consulting and implementation.",
      features: ["Strategy Consulting", "Process Optimization", "Change Management", "Training"]
    }
  ]

  return (
    <>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">What We Do</h1>
              <p className="text-xl leading-relaxed mb-8">
                We provide comprehensive technology solutions that help businesses innovate, 
                scale, and succeed in the digital age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From custom software development to AI implementation, we offer a full range 
                of technology services to meet your business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We follow a proven methodology to ensure successful project delivery 
                and exceed client expectations.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl">🔍</span>
                  </div>
                  <h3 className="font-semibold mb-2">Discovery</h3>
                  <p className="text-gray-600 text-sm">
                    We analyze your requirements and understand your business goals
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">📋</span>
                  </div>
                  <h3 className="font-semibold mb-2">Planning</h3>
                  <p className="text-gray-600 text-sm">
                    We create detailed project plans and technical specifications
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 text-2xl">⚙️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Development</h3>
                  <p className="text-gray-600 text-sm">
                    We build and test your solution using agile methodologies
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-600 text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold mb-2">Deployment</h3>
                  <p className="text-gray-600 text-sm">
                    We deploy your solution and provide ongoing support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Technologies We Use</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We work with cutting-edge technologies and frameworks to deliver 
                modern, scalable solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes",
                "TypeScript", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Next.js"
              ].map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-600 font-semibold text-sm">{tech.slice(0, 3)}</span>
                  </div>
                  <p className="text-sm text-gray-700">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business 
              and achieve your technology goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
        </section>
      </>
  )
}
