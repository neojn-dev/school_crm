"use client"

import { Header, Footer } from "@/components/layout"
import { motion } from "framer-motion"
import { 
  Users, 
  Award, 
  Target, 
  TrendingUp, 
  Globe, 
  Clock,
  CheckCircle,
  Star,
  Zap,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Customer Success",
    description: "Your success is our success. We're committed to helping you achieve your goals.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Zap,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from product quality to customer service.",
    color: "from-yellow-500 to-orange-500"
  }
]

const milestones = [
  {
    year: "2010",
    title: "Company Founded",
    description: "Started as a small startup with a big vision to transform business technology."
  },
  {
    year: "2015",
    title: "First Major Client",
    description: "Secured our first enterprise client, marking the beginning of our growth journey."
  },
  {
    year: "2018",
    title: "International Expansion",
    description: "Opened offices in Europe and Asia to serve our growing global customer base."
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Recognized as a leader in our industry with over 500 team members worldwide."
  }
]

const stats = [
  { number: "500+", label: "Team Members", icon: Users, color: "text-blue-600" },
  { number: "10K+", label: "Happy Customers", icon: Star, color: "text-yellow-600" },
  { number: "50+", label: "Countries Served", icon: Globe, color: "text-green-600" },
  { number: "13+", label: "Years of Excellence", icon: Clock, color: "text-purple-600" }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                About Our Company
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                We're Building the
                <br />
                <span className="text-gradient-primary">Future of Technology</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                From humble beginnings to global impact, we've been at the forefront of 
                digital transformation for over a decade, helping businesses innovate and succeed.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="btn-primary text-lg px-8 py-4 group">
                  Learn More
                  <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4 group">
                  Watch Our Story
                  <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          />
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our <span className="text-gradient-primary">Story</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every great company has a story. Ours is one of innovation, perseverance, 
                and unwavering commitment to our customers' success.
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2010, our company began as a small startup with a big vision. 
                  We believed that technology could be used to solve real-world problems 
                  and make people's lives better.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Over the years, we've grown from a team of 5 to over 500 employees 
                  across multiple offices worldwide. But our core values remain the same: 
                  innovation, integrity, and customer success.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we serve thousands of customers globally and continue to push 
                  the boundaries of what's possible in our industry.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-white text-3xl font-bold">NT</span>
                    </div>
                    <p className="text-gray-600 font-medium">Company Image Placeholder</p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-green-400 rounded-full opacity-70"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our <span className="text-gradient-primary">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do and shape our company culture.
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group"
                >
                  <div className="card-elevated h-full p-8 text-center border-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <value.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our <span className="text-gradient-primary">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key milestones that have shaped our company and driven our success.
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center gap-8 ${
                      index % 2 === 1 ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className={`text-4xl font-bold text-gradient-primary mb-2 ${
                        index % 2 === 1 ? 'text-right' : 'text-left'
                      }`}>
                        {milestone.year}
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 text-gray-900 ${
                        index % 2 === 1 ? 'text-right' : 'text-left'
                      }`}>
                        {milestone.title}
                      </h3>
                      <p className={`text-gray-600 leading-relaxed ${
                        index % 2 === 1 ? 'text-right' : 'text-left'
                      }`}>
                        {milestone.description}
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-primary rounded-full shadow-lg"></div>
                      {index < milestones.length - 1 && (
                        <div className="absolute top-4 left-2 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent"></div>
                      )}
                    </div>
                    
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Mission
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you're a customer, partner, or potential team member, 
                we invite you to be part of our journey to create positive change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 group">
                  Get Started
                  <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary group">
                  Contact Us
                  <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
