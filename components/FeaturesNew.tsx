import React from "react";
import { Brain, Target, Zap, Shield, BarChart3, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI evaluates your responses across technical skills, communication, and project experience."
    },
    {
      icon: Target,
      title: "Role-Specific Questions",
      description: "Get tailored interview questions based on your target position and experience level."
    },
    {
      icon: BarChart3,
      title: "Performance Insights",
      description: "Detailed analytics with visual breakdowns of your strengths and areas for improvement."
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Real-time scoring and feedback to help you improve with every practice session."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your interview data is encrypted and secure. Practice with complete confidence."
    },
    {
      icon: Users,
      title: "Expert-Level Evaluation",
      description: "Get evaluated by AI trained on senior hiring manager standards and best practices."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ml-3">
              AcePrep?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to ace your next interview, powered by cutting-edge AI and designed for modern professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:border-purple-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to transform your interview skills?
            </h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've already improved their interview performance with AcePrep.
            </p>
            <a 
              href="/sign-up" 
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg"
            >
              Start Practicing Today
              <Zap className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
