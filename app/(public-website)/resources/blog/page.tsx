import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of AI in Business: Trends to Watch in 2024",
      excerpt: "Explore the latest AI trends that are reshaping industries and discover how businesses can leverage artificial intelligence for competitive advantage.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Artificial Intelligence",
      readTime: "8 min read",
      image: "AI"
    },
    {
      title: "Cloud Migration Best Practices: A Complete Guide",
      excerpt: "Learn the essential strategies and best practices for successful cloud migration, including planning, execution, and post-migration optimization.",
      author: "Michael Chen",
      date: "March 10, 2024",
      category: "Cloud Computing",
      readTime: "12 min read",
      image: "CLOUD"
    },
    {
      title: "Cybersecurity in the Remote Work Era",
      excerpt: "Discover how to protect your organization's digital assets in an increasingly remote work environment with practical security measures.",
      author: "Emily Rodriguez",
      date: "March 5, 2024",
      category: "Cybersecurity",
      readTime: "6 min read",
      image: "SEC"
    },
    {
      title: "Building Scalable Web Applications with Modern Frameworks",
      excerpt: "A comprehensive guide to choosing the right framework and architecture patterns for building scalable web applications.",
      author: "David Kim",
      date: "February 28, 2024",
      category: "Web Development",
      readTime: "10 min read",
      image: "WEB"
    },
    {
      title: "Data Analytics: Turning Information into Business Intelligence",
      excerpt: "Learn how to transform raw data into actionable insights that drive business decisions and improve operational efficiency.",
      author: "Lisa Thompson",
      date: "February 22, 2024",
      category: "Data Analytics",
      readTime: "9 min read",
      image: "DATA"
    },
    {
      title: "The Rise of Low-Code/No-Code Development Platforms",
      excerpt: "Explore how low-code and no-code platforms are democratizing software development and enabling faster application delivery.",
      author: "James Wilson",
      date: "February 18, 2024",
      category: "Development",
      readTime: "7 min read",
      image: "CODE"
    }
  ]

  const categories = [
    "All", "Artificial Intelligence", "Cloud Computing", "Cybersecurity", 
    "Web Development", "Data Analytics", "Development"
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
              <p className="text-xl leading-relaxed">
                Stay updated with the latest insights, trends, and best practices 
                in technology and digital transformation.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8 mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-teal-600 text-sm">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-6 text-lg">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By {blogPosts[0].author}</span>
                    <span>•</span>
                    <span>{blogPosts[0].date}</span>
                    <span>•</span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <article key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-br from-teal-100 to-blue-100 p-6 h-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{post.image}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <div>{post.author}</div>
                        <div>{post.date}</div>
                      </div>
                      <button className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Updated</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter to get the latest blog posts and tech insights 
                delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Popular Topics</h2>
              <p className="text-gray-600">Explore our most discussed topics and trends</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {[
                "Machine Learning", "React", "AWS", "DevOps", "Blockchain", 
                "Mobile Development", "API Design", "Database", "Security", 
                "Performance", "Testing", "Microservices"
              ].map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Archive */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Archive</h2>
              <p className="text-gray-600">Browse our complete collection of articles</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { month: "March 2024", count: "8 articles" },
                  { month: "February 2024", count: "12 articles" },
                  { month: "January 2024", count: "10 articles" },
                  { month: "December 2023", count: "15 articles" }
                ].map((archive, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{archive.month}</span>
                      <span className="text-sm text-gray-500">{archive.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  )
}
