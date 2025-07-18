/* eslint-disable @next/next/no-img-element */
import { useSlideIn } from "@/app/hooks/useSlideIn"
import { ArrowRight, Play, Star } from 'lucide-react'
import TypingAnimation from "./ui/typing-animation"
import { RainbowButton } from "./ui/rainbow-button"

export default function Hero() {
  const [ref, isVisible] = useSlideIn()

  return (
    <section ref={ref} className={`min-h-screen flex items-center justify-center relative overflow-hidden py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 border border-blue-200">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
              #1 AI Interview Platform
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Master Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Interview Skills
                </span>
                <span className="block text-gray-900">with AI</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Prepare smarter with AI-powered mock interviews, real-time feedback, and personalized coaching. 
                Land your dream job with confidence.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <RainbowButton className="px-8 py-4 text-lg font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </RainbowButton>
              
              <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:scale-105">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white"></div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">10,000+</span> professionals prepared
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Interview Coach</h3>
                    <p className="text-sm text-gray-500">Live Session</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Recording</span>
                </div>
              </div>
              
              {/* Mock Interview Content */}
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-sm text-blue-800 font-medium">Question 3 of 5</p>
                  <p className="text-gray-700 mt-2">
                    &ldquo;Tell me about a challenging project you&rsquo;ve worked on and how you overcame obstacles.&rdquo;
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">AI Feedback Score</span>
                    <span className="text-2xl font-bold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <div className="text-lg font-bold text-purple-600">8.5</div>
                    <div className="text-xs text-gray-600">Clarity</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-lg font-bold text-blue-600">9.2</div>
                    <div className="text-xs text-gray-600">Confidence</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-lg font-bold text-green-600">8.8</div>
                    <div className="text-xs text-gray-600">Structure</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">✨</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">AI Tip</p>
                  <p className="text-xs text-gray-500">Great eye contact!</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm">📈</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Progress</p>
                  <p className="text-xs text-gray-500">+15% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

