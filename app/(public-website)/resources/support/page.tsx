import { Header, Footer } from "@/components/website-components"

export default function SupportPage() {
  const supportOptions = [
    {
      title: "Knowledge Base",
      description: "Search our comprehensive library of articles, tutorials, and FAQs",
      icon: "📚",
      action: "Browse Articles",
      popular: true
    },
    {
      title: "Live Chat",
      description: "Get instant help from our support team during business hours",
      icon: "💬",
      action: "Start Chat",
      available: true
    },
    {
      title: "Email Support",
      description: "Send us a detailed message and we'll respond within 24 hours",
      icon: "📧",
      action: "Send Email",
      available: true
    },
    {
      title: "Phone Support",
      description: "Speak directly with our technical support specialists",
      icon: "📞",
      action: "Call Now",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share solutions",
      icon: "👥",
      action: "Join Discussion",
      members: "10K+ members"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides and product demonstrations",
      icon: "🎥",
      action: "Watch Videos",
      count: "200+ videos"
    }
  ]

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        "How do I create my first project?",
        "What are the system requirements?",
        "How do I invite team members?",
        "Where can I find my API keys?"
      ]
    },
    {
      category: "Billing & Pricing",
      questions: [
        "How does billing work?",
        "Can I change my plan anytime?",
        "What payment methods do you accept?",
        "How do I cancel my subscription?"
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        "Why is my integration not working?",
        "How do I troubleshoot API errors?",
        "What should I do if I'm experiencing downtime?",
        "How do I optimize performance?"
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">How Can We Help?</h1>
              <p className="text-xl leading-relaxed mb-8">
                Get the support you need with our comprehensive help resources, 
                expert assistance, and active community.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help articles, tutorials, or FAQs..."
                    className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button className="absolute right-2 top-2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Choose Your Support Option</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer multiple ways to get help based on your preferences and urgency.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow relative">
                  {option.popular && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  
                  {option.available && (
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 text-sm font-medium">Available Now</span>
                    </div>
                  )}
                  
                  {option.hours && (
                    <p className="text-sm text-gray-500 mb-3">{option.hours}</p>
                  )}
                  
                  {option.members && (
                    <p className="text-sm text-gray-500 mb-3">{option.members}</p>
                  )}
                  
                  {option.count && (
                    <p className="text-sm text-gray-500 mb-3">{option.count}</p>
                  )}
                  
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Quick Help</h2>
              <p className="text-gray-600">Find answers to common questions instantly</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {faqCategories.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">{category.category}</h3>
                  <div className="space-y-3">
                    {category.questions.map((question, questionIndex) => (
                      <a
                        key={questionIndex}
                        href="#"
                        className="block text-gray-600 hover:text-green-600 transition-colors text-sm"
                      >
                        {question}
                      </a>
                    ))}
                  </div>
                  <button className="mt-4 text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                    View All →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status & Updates */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">System Status</h2>
                <p className="text-gray-600">Real-time status of our services and recent updates</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* System Status */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Current Status</h3>
                  <div className="space-y-3">
                    {[
                      { service: "API Services", status: "operational", uptime: "99.9%" },
                      { service: "Web Application", status: "operational", uptime: "99.8%" },
                      { service: "Database", status: "operational", uptime: "99.9%" },
                      { service: "File Storage", status: "maintenance", uptime: "99.5%" }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{service.service}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            service.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="text-sm text-gray-600">{service.uptime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                    View Status Page →
                  </button>
                </div>
                
                {/* Recent Updates */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Updates</h3>
                  <div className="space-y-4">
                    {[
                      { date: "Mar 20", title: "New API endpoints released", type: "Feature" },
                      { date: "Mar 18", title: "Performance improvements", type: "Enhancement" },
                      { date: "Mar 15", title: "Security patch applied", type: "Security" },
                      { date: "Mar 12", title: "Bug fixes and improvements", type: "Bug Fix" }
                    ].map((update, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-xs text-gray-500 mt-1 min-w-[40px]">{update.date}</span>
                        <div>
                          <p className="text-sm text-gray-700">{update.title}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            update.type === 'Feature' ? 'bg-blue-100 text-blue-800' :
                            update.type === 'Security' ? 'bg-red-100 text-red-800' :
                            update.type === 'Enhancement' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {update.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                    View Changelog →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Still Need Help?</h2>
                <p className="text-gray-600">
                  Can't find what you're looking for? Send us a message and we'll get back to you.
                </p>
              </div>
              
              <form className="bg-white p-8 rounded-lg shadow-sm">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your issue or question in detail..."
                  ></textarea>
                </div>
                
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Support Hours */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Support Hours</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Live Chat & Phone</h3>
                <p>Monday - Friday</p>
                <p>9:00 AM - 6:00 PM EST</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p>24/7 Response</p>
                <p>Within 24 hours</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Emergency Support</h3>
                <p>Critical Issues Only</p>
                <p>24/7 Available</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
