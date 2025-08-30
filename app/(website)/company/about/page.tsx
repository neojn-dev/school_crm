import { 
  HeroGradientFloating,
  HeroSplitImage,
  HeroMinimal,
  HeroCards,
  HeroFullImage,
  HeroVideoBackground,
  HeroParallax
} from "@/components/website-components/sections/hero-variants"
import { 
  FeatureGrid2x2,
  FeatureGrid3x3,
  FeatureGridStaggered,
  FeatureGridCards,
  FeatureGridMasonry
} from "@/components/website-components/sections/feature-grid-variants"
import { 
  TestimonialCarousel,
  TestimonialGrid,
  TestimonialSpotlight,
  TestimonialSocialWall
} from "@/components/website-components/sections/testimonial-variants"
import { 
  TeamGrid,
  TeamLeadershipSpotlight,
  TeamCarousel,
  TeamOrgChart
} from "@/components/website-components/sections/team-variants"
import { 
  StatsGrid,
  StatsCards,
  StatsBar,
  StatsCircular
} from "@/components/website-components/sections/stats-counters"
import { 
  CTABanner,
  CTAFloating,
  CTANewsletter,
  CTAVideo,
  CTAContact
} from "@/components/website-components/sections/cta-variants"
import {
  ContentSplitImage,
  ContentFullWidthQuote,
  ContentImageTextGrid,
  ContentVideoText,
  ContentMultiColumn
} from "@/components/website-components/sections/content-sections"
import {
  InteractiveTabs,
  InteractiveAccordion,
  InteractiveTimeline,
  InteractiveHoverCards,
  InteractiveProgress
} from "@/components/website-components/sections/interactive-elements"
import {
  VisualImageGallery,
  VisualBeforeAfter,
  VisualInfographic,
  VisualFloatingCards,
  VisualParallaxSection
} from "@/components/website-components/sections/visual-elements"
import { dummyContent, dummyImages } from "@/lib/dummy-content"
import { Users, Award, Target, Heart, Globe, Zap, Shield, Star, TrendingUp, Clock } from "lucide-react"

export default function AboutPage() {
  // Sample data for components
  const heroData = {
    eyebrow: "About Us",
    title: "Building the Future Together",
    subtitle: "Innovation meets excellence",
    description: "We're a team of passionate innovators, designers, and engineers committed to creating solutions that make a real difference in the world.",
    primaryCta: { label: "Join Our Team", href: "/company/careers" },
    secondaryCta: { label: "Our Story", href: "#story" }
  }

  const valuesData = {
    eyebrow: "Our Values",
    title: "What Drives Us Forward",
    subtitle: "The principles that guide everything we do",
    items: dummyContent.company.about.values.map((value, index) => ({
      ...value,
      icon: [<Users key="users" className="w-6 h-6" />, <Award key="award" className="w-6 h-6" />, <Target key="target" className="w-6 h-6" />, <Heart key="heart" className="w-6 h-6" />, <Globe key="globe" className="w-6 h-6" />, <Zap key="zap" className="w-6 h-6" />][index]
    }))
  }

  const teamData = {
    eyebrow: "Leadership",
    title: "Meet Our Leaders",
    subtitle: "The visionaries behind our success",
    members: dummyContent.company.team
  }

  const statsData = {
    eyebrow: "By the Numbers",
    title: "Our Impact",
    subtitle: "Measurable results that speak for themselves",
    stats: [
      { label: "Years of Experience", value: 15, suffix: "+", icon: <Clock className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
      { label: "Projects Completed", value: 500, suffix: "+", icon: <Target className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
      { label: "Happy Clients", value: 200, suffix: "+", icon: <Users className="w-6 h-6" />, color: "bg-purple-100 text-purple-600" },
      { label: "Team Members", value: 50, suffix: "+", icon: <Star className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-600" }
    ]
  }

  const testimonialsData = {
    eyebrow: "Client Stories",
    title: "What Our Clients Say",
    subtitle: "Real feedback from real partnerships",
    testimonials: dummyContent.testimonials
  }

  // Additional data for new components
  const companyTimelineData = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Started as a small team with big dreams in a garage, focusing on innovative web solutions.",
      milestone: true
    },
    {
      year: "2012",
      title: "First Major Client",
      description: "Secured our first enterprise client, marking the beginning of our growth journey.",
      milestone: false
    },
    {
      year: "2015",
      title: "Team Expansion",
      description: "Grew to 20+ team members and opened our first official office space.",
      milestone: true
    },
    {
      year: "2018",
      title: "Industry Recognition",
      description: "Won our first industry award for innovation in digital transformation.",
      milestone: false
    },
    {
      year: "2021",
      title: "Global Reach",
      description: "Expanded internationally with clients across 15+ countries.",
      milestone: true
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Leading the industry in AI-powered solutions and automation.",
      milestone: true
    }
  ]

  const skillsData = [
    { name: "Innovation & Creativity", percentage: 95, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Technical Excellence", percentage: 92, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { name: "Client Satisfaction", percentage: 98, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { name: "Team Collaboration", percentage: 90, color: "bg-gradient-to-r from-orange-500 to-red-500" }
  ]

  const officeGalleryImages = [
    { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop", alt: "Office Space 1", caption: "Our modern workspace" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop", alt: "Office Space 2", caption: "Collaboration areas" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop", alt: "Office Space 3", caption: "Meeting rooms" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", alt: "Office Space 4", caption: "Creative spaces" },
    { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", alt: "Office Space 5", caption: "Relaxation zone" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop", alt: "Office Space 6", caption: "Team events" }
  ]

  const cultureTabsData = [
    {
      id: "innovation",
      label: "Innovation",
      icon: <Zap className="w-4 h-4" />,
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Driving Innovation</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We foster a culture of continuous innovation where every team member is encouraged to think outside the box and propose creative solutions. Our innovation labs and hackathons provide platforms for breakthrough ideas.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Monthly innovation challenges
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Dedicated R&D time for all developers
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Cross-functional collaboration projects
              </li>
            </ul>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" alt="Innovation" className="w-full h-full object-cover" />
          </div>
        </div>
      )
    },
    {
      id: "collaboration",
      label: "Collaboration",
      icon: <Users className="w-4 h-4" />,
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Collaboration</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our collaborative environment breaks down silos and encourages knowledge sharing across all departments. We believe that the best solutions come from diverse perspectives working together.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Open communication channels
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Regular team building activities
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Mentorship programs
              </li>
            </ul>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="Collaboration" className="w-full h-full object-cover" />
          </div>
        </div>
      )
    },
    {
      id: "growth",
      label: "Growth",
      icon: <TrendingUp className="w-4 h-4" />,
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Growth</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We invest heavily in our team's professional development through training programs, conferences, and continuous learning opportunities. Your growth is our growth.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Annual learning budget for each employee
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Conference attendance opportunities
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                Internal knowledge sharing sessions
              </li>
            </ul>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" alt="Growth" className="w-full h-full object-cover" />
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section - Gradient Floating */}
      <HeroGradientFloating {...heroData} />
      
      {/* Stats Section */}
      <StatsBar {...statsData} />
      
      {/* Values Section - Interactive Hover Cards */}
      <InteractiveHoverCards
        eyebrow="Our Values"
        title="What Drives Us Forward"
        subtitle="The principles that guide everything we do"
        cards={[
          {
            title: "Innovation",
            description: "We push boundaries and embrace new technologies to solve complex challenges.",
            icon: <Zap className="w-6 h-6" />,
            hoverContent: "Our innovation labs and R&D initiatives have led to breakthrough solutions that have transformed entire industries.",
            color: "bg-purple-100 text-purple-600"
          },
          {
            title: "Excellence",
            description: "We deliver exceptional quality in everything we do, exceeding expectations.",
            icon: <Award className="w-6 h-6" />,
            hoverContent: "Our commitment to excellence has earned us industry recognition and a 98% client satisfaction rate.",
            color: "bg-yellow-100 text-yellow-600"
          },
          {
            title: "Collaboration",
            description: "We believe in the power of teamwork and building strong partnerships.",
            icon: <Users className="w-6 h-6" />,
            hoverContent: "Our collaborative approach has resulted in successful partnerships with over 200 companies worldwide.",
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Integrity",
            description: "We operate with transparency, honesty, and ethical practices.",
            icon: <Shield className="w-6 h-6" />,
            hoverContent: "Our ethical standards and transparent practices have built lasting trust with clients and partners.",
            color: "bg-blue-100 text-blue-600"
          },
          {
            title: "Customer Focus",
            description: "Our clients' success is our success. We prioritize their needs above all.",
            icon: <Target className="w-6 h-6" />,
            hoverContent: "We've helped our clients achieve an average ROI of 300% through our tailored solutions.",
            color: "bg-red-100 text-red-600"
          },
          {
            title: "Global Impact",
            description: "We strive to make a positive impact on communities worldwide.",
            icon: <Globe className="w-6 h-6" />,
            hoverContent: "Our solutions have positively impacted over 1 million users across 50+ countries.",
            color: "bg-indigo-100 text-indigo-600"
          }
        ]}
      />
      
      {/* Story Section - Content Split Image */}
      <ContentSplitImage
        eyebrow="Our Story"
        title="From Vision to Reality"
        subtitle="15 years of innovation and growth"
        description="What started as a small team with big dreams has grown into a leading force in technology innovation. Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to excellence."
        imageUrl="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
        imageAlt="Company journey"
        primaryCta={{ label: "Read Full Story", href: "#" }}
        secondaryCta={{ label: "Company Timeline", href: "#timeline" }}
        features={[
          "Founded in 2009 with a vision to transform businesses",
          "Grown from 3 to 50+ talented professionals",
          "Served 200+ clients across 15+ countries",
          "Pioneered innovative solutions in AI and automation"
        ]}
      />

      {/* Company Timeline */}
      <InteractiveTimeline
        eyebrow="Our Journey"
        title="Milestones & Achievements"
        subtitle="Key moments that shaped our company"
        events={companyTimelineData}
      />

      {/* Mission & Vision Quote */}
      <ContentFullWidthQuote
        eyebrow="Our Mission"
        title="Empowering Innovation Through Technology"
        subtitle="We believe technology should serve humanity"
        description="Our mission is to create solutions that empower businesses and individuals to achieve their full potential while making a positive impact on society."
        quote="Technology is best when it brings people together and solves real-world problems."
        author="Sarah Johnson"
        authorRole="CEO & Founder"
        authorImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      />

      {/* Team Section - Leadership Spotlight */}
      <TeamLeadershipSpotlight {...teamData} />

      {/* Full Team Grid */}
      <TeamGrid
        eyebrow="Our Team"
        title="Meet the People Behind Our Success"
        subtitle="Talented individuals working together to create amazing solutions"
        members={dummyContent.company.team}
      />

      {/* Company Culture Tabs */}
      <InteractiveTabs
        eyebrow="Company Culture"
        title="What Makes Us Different"
        subtitle="Explore the values and practices that define our workplace"
        tabs={cultureTabsData}
      />

      {/* Skills & Expertise Progress */}
      <InteractiveProgress
        eyebrow="Our Expertise"
        title="What We Excel At"
        subtitle="Core competencies that drive our success"
        skills={skillsData}
      />

      {/* Office Gallery */}
      <VisualImageGallery
        eyebrow="Our Workspace"
        title="Where Innovation Happens"
        subtitle="Take a virtual tour of our modern, collaborative office spaces"
        images={officeGalleryImages}
      />

      {/* Before/After Transformation */}
      <VisualBeforeAfter
        eyebrow="Our Growth"
        title="Then vs Now"
        subtitle="See how we've evolved over the years"
        beforeImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
        afterImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
        beforeLabel="2009 - Our Humble Beginning"
        afterLabel="2024 - Modern Innovation Hub"
      />

      {/* Company Infographic */}
      <VisualInfographic
        eyebrow="Our Impact"
        title="By the Numbers"
        subtitle="Visualizing our journey and achievements"
        centerIcon={<Target className="w-12 h-12" />}
        items={[
          {
            title: "Global Reach",
            description: "Clients in 15+ countries",
            icon: <Globe className="w-6 h-6" />,
            color: "bg-blue-100 text-blue-600"
          },
          {
            title: "Expert Team",
            description: "50+ skilled professionals",
            icon: <Users className="w-6 h-6" />,
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Innovation",
            description: "25+ industry awards",
            icon: <Award className="w-6 h-6" />,
            color: "bg-yellow-100 text-yellow-600"
          },
          {
            title: "Excellence",
            description: "98% client satisfaction",
            icon: <Star className="w-6 h-6" />,
            color: "bg-purple-100 text-purple-600"
          }
        ]}
      />

      {/* Testimonials - Social Wall */}
      <TestimonialSocialWall {...testimonialsData} />

      {/* Video Content Section */}
      <ContentVideoText
        eyebrow="Behind the Scenes"
        title="Meet Our Team in Action"
        subtitle="See how we work and what drives us"
        description="Get an inside look at our daily operations, team dynamics, and the passion that fuels our innovation. From brainstorming sessions to product launches, discover what makes our company special."
        videoThumbnail="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
        primaryCta={{ label: "Watch Full Video", href: "#" }}
        stats={[
          { label: "Team Members", value: "50+" },
          { label: "Office Locations", value: "3" },
          { label: "Years Experience", value: "15+" },
          { label: "Projects Delivered", value: "500+"
          }
        ]}
      />

      {/* Floating Cards - Achievements */}
      <VisualFloatingCards
        eyebrow="Achievements"
        title="What We're Proud Of"
        subtitle="Milestones that mark our journey to excellence"
        cards={[
          {
            title: "Industry Leadership",
            description: "Recognized as a top technology innovator by leading industry publications and organizations.",
            icon: <Award className="w-6 h-6" />,
            delay: 0
          },
          {
            title: "Client Success",
            description: "Helped clients achieve an average ROI of 300% through our innovative solutions and strategies.",
            icon: <Target className="w-6 h-6" />,
            delay: 0.2
          },
          {
            title: "Team Excellence",
            description: "Maintained a 95% employee retention rate and consistently ranked as a top employer.",
            icon: <Users className="w-6 h-6" />,
            delay: 0.4
          }
        ]}
      />

      {/* Awards Section - Stats Circular */}
      <StatsCircular
        eyebrow="Recognition"
        title="Awards & Achievements"
        subtitle="Industry recognition for our commitment to excellence"
        stats={[
          { label: "Industry Awards", value: 25, suffix: "+", icon: <Award className="w-6 h-6" /> },
          { label: "Client Satisfaction", value: 98, suffix: "%", icon: <Star className="w-6 h-6" /> },
          { label: "Employee Retention", value: 95, suffix: "%", icon: <Users className="w-6 h-6" /> },
          { label: "Growth Rate", value: 150, suffix: "%", icon: <TrendingUp className="w-6 h-6" /> }
        ]}
      />

      {/* Parallax CTA Section */}
      <VisualParallaxSection
        eyebrow="Join Our Journey"
        title="Ready to Make an Impact?"
        subtitle="Be part of something extraordinary"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
        content={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a
              href="/company/careers"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Partner With Us
            </a>
          </div>
        }
      />

      {/* Contact CTA */}
      <CTAContact
        eyebrow="Get In Touch"
        title="Let's Start a Conversation"
        subtitle="Ready to discuss your project or join our team?"
        description="Whether you're looking to partner with us, join our team, or learn more about our services, we'd love to hear from you."
      />
    </div>
  )
}