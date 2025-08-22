import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

export default function NewsPage() {
  const newsItems = [
    {
      title: "Company Announces $50M Series C Funding Round",
      summary: "We're excited to announce our Series C funding round led by top-tier venture capital firms to accelerate our growth and expand our global presence.",
      date: "March 20, 2024",
      category: "Company News",
      type: "Press Release",
      image: "FUND"
    },
    {
      title: "New AI-Powered Analytics Platform Launched",
      summary: "Our latest product offering combines machine learning with advanced analytics to provide unprecedented insights for enterprise customers.",
      date: "March 18, 2024",
      category: "Product Launch",
      type: "Product News",
      image: "AI"
    },
    {
      title: "Partnership with Global Tech Leader Announced",
      summary: "Strategic partnership will enable us to deliver enhanced solutions to customers worldwide while expanding our technology capabilities.",
      date: "March 15, 2024",
      category: "Partnerships",
      type: "Business News",
      image: "PART"
    },
    {
      title: "Company Named 'Best Workplace' for Third Consecutive Year",
      summary: "Recognition highlights our commitment to employee satisfaction, diversity, and creating an inclusive work environment.",
      date: "March 12, 2024",
      category: "Awards",
      type: "Recognition",
      image: "AWARD"
    },
    {
      title: "Expansion into European Markets",
      summary: "Opening new offices in London and Berlin as part of our international expansion strategy to better serve European customers.",
      date: "March 8, 2024",
      category: "Expansion",
      type: "Business News",
      image: "EU"
    },
    {
      title: "Sustainability Initiative: Carbon Neutral by 2025",
      summary: "Announcing our commitment to achieving carbon neutrality by 2025 through renewable energy adoption and sustainable practices.",
      date: "March 5, 2024",
      category: "Sustainability",
      type: "Corporate News",
      image: "GREEN"
    }
  ]

  const upcomingEvents = [
    {
      title: "Tech Conference 2024",
      date: "April 15-17, 2024",
      location: "San Francisco, CA",
      description: "Join us at the industry's leading technology conference"
    },
    {
      title: "Product Demo Webinar",
      date: "April 10, 2024",
      location: "Online",
      description: "Live demonstration of our latest AI analytics platform"
    },
    {
      title: "Developer Meetup",
      date: "April 5, 2024",
      location: "New York, NY",
      description: "Networking event for developers and tech enthusiasts"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Latest News</h1>
              <p className="text-xl leading-relaxed">
                Stay informed about our latest developments, product launches, 
                partnerships, and industry insights.
              </p>
            </div>
          </div>
        </section>

        {/* Breaking News */}
        <section className="py-8 bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Breaking
              </span>
              <p className="text-gray-800 font-medium">
                {newsItems[0].title} - 
                <a href="#" className="text-indigo-600 hover:text-indigo-700 ml-1">Read more</a>
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main News */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Latest Updates</h2>
                </div>
                
                <div className="space-y-8">
                  {newsItems.map((item, index) => (
                    <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-sm">{item.image}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                              {item.category}
                            </span>
                            <span className="text-gray-500 text-xs">{item.type}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-gray-900">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {item.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{item.date}</span>
                            <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                              Read Full Story →
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Events */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Upcoming Events</h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                    View All Events →
                  </button>
                </div>

                {/* Quick Links */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
                  <div className="space-y-2">
                    {[
                      "Press Kit",
                      "Media Contacts",
                      "Brand Guidelines",
                      "Executive Bios",
                      "Company Timeline",
                      "Investor Relations"
                    ].map((link, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Stay Informed</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest news and updates delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="w-full bg-indigo-600 text-white py-2 rounded text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">News Categories</h2>
              <p className="text-gray-600">Browse news by category</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Company News", count: "24 articles", icon: "🏢" },
                { name: "Product Updates", count: "18 articles", icon: "🚀" },
                { name: "Partnerships", count: "12 articles", icon: "🤝" },
                { name: "Awards & Recognition", count: "8 articles", icon: "🏆" },
                { name: "Industry Insights", count: "15 articles", icon: "📊" },
                { name: "Events", count: "20 articles", icon: "📅" }
              ].map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Media Resources</h2>
              <p className="text-gray-600 mb-8">
                Download our media kit for logos, brand guidelines, executive photos, 
                and other press materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Download Media Kit
                </button>
                <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                  Contact Media Team
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  )
}
