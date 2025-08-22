import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

export default function MissionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl leading-relaxed">
                To empower businesses and individuals through innovative technology solutions 
                that create lasting positive impact on society.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">What Drives Us</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that technology should serve humanity, not the other way around. 
                  Our mission is to create solutions that are not only innovative and efficient, 
                  but also accessible, sustainable, and beneficial to all.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the global leader in transformative technology solutions, 
                    recognized for our innovation, integrity, and positive impact on 
                    communities worldwide.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Focus Areas</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Sustainable technology development</li>
                      <li>• Digital accessibility and inclusion</li>
                      <li>• Community empowerment</li>
                      <li>• Environmental responsibility</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Our Commitment</h3>
                  <p className="text-gray-600">
                    We are committed to delivering excellence while maintaining the highest 
                    standards of ethical business practices and social responsibility.
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Our Promises</h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• Customer-first approach</li>
                      <li>• Transparent communication</li>
                      <li>• Continuous innovation</li>
                      <li>• Social impact initiatives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Measuring success not just by profits, but by the positive change we create.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
                  <p className="text-gray-600 mb-4">
                    Our solutions are used by organizations in over 50 countries, 
                    helping them achieve their goals more efficiently.
                  </p>
                  <div className="text-2xl font-bold text-blue-600">50+ Countries</div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Environmental</h3>
                  <p className="text-gray-600 mb-4">
                    We've helped our clients reduce their carbon footprint by 
                    optimizing their operations and reducing waste.
                  </p>
                  <div className="text-2xl font-bold text-green-600">30% Reduction</div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Community</h3>
                  <p className="text-gray-600 mb-4">
                    Through our community programs, we've provided technology 
                    education and resources to underserved communities.
                  </p>
                  <div className="text-2xl font-bold text-purple-600">10K+ Lives</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're a customer, partner, or potential team member, 
              we invite you to be part of our journey to create positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  )
}
