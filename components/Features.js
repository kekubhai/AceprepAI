import { useSlideIn } from "@/app/hooks/useSlideIn"
import { BookOpen, Users, Zap, BarChart, ArrowRight, CheckCircle, TrendingUp, Brain } from 'lucide-react'

export default function Features() {
  const [ref, isVisible] = useSlideIn()

  const features = [
    { 
      icon: <Brain className="w-8 h-8" />, 
      title: 'AI-Powered Coaching', 
      description: 'Advanced AI analyzes your responses and provides personalized feedback for improvement.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      metrics: '95% accuracy'
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: 'Mock Interview Practice', 
      description: 'Realistic interview simulations with industry-specific questions and scenarios.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      metrics: '1000+ questions'
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: 'Real-time Feedback', 
      description: 'Instant analysis of your performance with actionable insights and improvement tips.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      metrics: 'Live analysis'
    },
    { 
      icon: <TrendingUp className="w-8 h-8" />, 
      title: 'Progress Analytics', 
      description: 'Comprehensive tracking of your improvement with detailed performance metrics.',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      metrics: '360° insights'
    },
  ]

  const benefits = [
    'Personalized learning paths',
    'Industry-specific preparation',
    'Confidence building exercises',
    'Performance tracking dashboard'
  ]

  return (
    <section id="features" ref={ref} className={`py-24 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
            ✨ Powered by Advanced AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ace your interviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your interview preparation with AI-powered coaching, realistic practice sessions, and actionable insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                
                {/* Metrics */}
                <div className={`inline-flex items-center px-3 py-1 ${feature.bgColor} rounded-full text-sm font-medium`}>
                  <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.metrics}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why professionals choose AcePrep AI
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex items-center space-x-4">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <span className="text-sm text-gray-500">No credit card required</span>
              </div>
            </div>
            
            {/* Right Column - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Interviews Practiced</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">AI Availability</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
                <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

