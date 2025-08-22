import { Header, Footer } from "@/components/layout"

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "TechSummit 2024: The Future of AI",
      date: "April 15-17, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      type: "Conference",
      description: "Join industry leaders and innovators for three days of cutting-edge AI discussions, workshops, and networking opportunities.",
      speakers: ["Dr. Sarah Chen", "Mark Rodriguez", "Lisa Wang"],
      price: "$599",
      capacity: "2,000 attendees",
      image: "TECH"
    },
    {
      title: "Cloud Infrastructure Masterclass",
      date: "April 22, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Online Webinar",
      type: "Workshop",
      description: "Deep dive into modern cloud architecture patterns, best practices, and hands-on implementation strategies.",
      speakers: ["Michael Thompson", "Anna Garcia"],
      price: "Free",
      capacity: "500 attendees",
      image: "CLOUD"
    },
    {
      title: "Developer Meetup: React & Next.js",
      date: "April 28, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Tech Hub NYC, New York",
      type: "Meetup",
      description: "Casual networking event for React developers featuring lightning talks, code reviews, and pizza.",
      speakers: ["Community Speakers"],
      price: "Free",
      capacity: "100 attendees",
      image: "DEV"
    },
    {
      title: "Cybersecurity Summit 2024",
      date: "May 5-6, 2024",
      time: "8:00 AM - 7:00 PM",
      location: "Austin Convention Center",
      type: "Summit",
      description: "Two-day intensive summit covering the latest in cybersecurity threats, solutions, and compliance strategies.",
      speakers: ["James Wilson", "Dr. Emily Foster", "Robert Kim"],
      price: "$799",
      capacity: "1,500 attendees",
      image: "SEC"
    }
  ]

  const pastEvents = [
    {
      title: "Data Analytics Conference 2024",
      date: "March 10-12, 2024",
      location: "Chicago, IL",
      attendees: "1,800",
      highlights: ["50+ speakers", "30 sessions", "15 workshops"],
      image: "DATA"
    },
    {
      title: "Mobile Development Workshop",
      date: "February 25, 2024",
      location: "Online",
      attendees: "750",
      highlights: ["Hands-on coding", "Expert mentorship", "Live Q&A"],
      image: "MOB"
    },
    {
      title: "Startup Pitch Competition",
      date: "February 15, 2024",
      location: "Silicon Valley, CA",
      attendees: "500",
      highlights: ["20 startups", "$100K prize", "Investor panel"],
      image: "START"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Events & Conferences</h1>
              <p className="text-xl leading-relaxed">
                Join us at industry-leading events, workshops, and meetups to learn, 
                network, and stay ahead of technology trends.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Upcoming Events</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't miss these exciting opportunities to learn from industry experts 
                and connect with like-minded professionals.
              </p>
            </div>
            
            <div className="space-y-8">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Event Image/Icon */}
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold text-lg">{event.image}</span>
                        </div>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="md:col-span-2 p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="mr-2">📅</span>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <span className="mr-2">🕐</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="mr-2">🎤</span>
                            <span>{event.speakers.join(", ")}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <span className="mr-2">👥</span>
                            <span>{event.capacity}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">💰</span>
                            <span className="font-semibold text-purple-600">{event.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Registration */}
                    <div className="p-6 bg-gray-50 flex flex-col justify-center">
                      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-3">
                        Register Now
                      </button>
                      <button className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Types of Events</h2>
              <p className="text-gray-600">We host various types of events to cater to different learning preferences</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  type: "Conferences",
                  icon: "🎤",
                  description: "Large-scale events with keynote speakers and multiple tracks",
                  features: ["Industry experts", "Networking", "Exhibition hall"]
                },
                {
                  type: "Workshops",
                  icon: "🛠️",
                  description: "Hands-on learning sessions with practical exercises",
                  features: ["Interactive sessions", "Small groups", "Take-home projects"]
                },
                {
                  type: "Meetups",
                  icon: "👥",
                  description: "Casual networking events for local tech communities",
                  features: ["Local networking", "Lightning talks", "Informal setting"]
                },
                {
                  type: "Webinars",
                  icon: "💻",
                  description: "Online sessions accessible from anywhere in the world",
                  features: ["Remote access", "Live Q&A", "Recorded sessions"]
                }
              ].map((eventType, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-3xl mb-4">{eventType.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{eventType.type}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{eventType.description}</p>
                  <div className="space-y-1">
                    {eventType.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Past Events</h2>
              <p className="text-gray-600">Take a look at some of our successful past events</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 h-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{event.image}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{event.title}</h3>
                    <div className="text-sm text-gray-600 mb-4">
                      <div className="flex items-center mb-1">
                        <span className="mr-2">📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="mr-2">📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">👥</span>
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {event.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Calendar */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Event Calendar</h2>
              <p className="text-gray-600">Stay updated with our complete event schedule</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6
                  const hasEvent = [15, 22, 28].includes(day)
                  return (
                    <div
                      key={i}
                      className={`
                        aspect-square flex items-center justify-center text-sm border rounded
                        ${day < 1 || day > 30 ? 'text-gray-300 bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}
                        ${hasEvent ? 'bg-purple-100 text-purple-800 font-semibold' : ''}
                      `}
                    >
                      {day > 0 && day <= 30 ? day : ''}
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 text-center">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  View Full Calendar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our event newsletter to get notified about upcoming events, 
              early bird discounts, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
