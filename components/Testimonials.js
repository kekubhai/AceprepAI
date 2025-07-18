import { useSlideIn } from "@/app/hooks/useSlideIn"
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const [ref, isVisible] = useSlideIn()

  const testimonials = [
    { 
      name: 'Sarah Chen', 
      role: 'Senior Software Engineer',
      company: 'Google',
      content: 'AcePrep AI transformed my interview preparation. The AI feedback was incredibly detailed and helped me identify areas I never knew I needed to improve. Landed my dream job at Google!',
      avatar: '👩‍💻',
      rating: 5,
      improvement: '+40% confidence'
    },
    { 
      name: 'Michael Rodriguez', 
      role: 'Product Manager',
      company: 'Meta',
      content: 'The mock interviews felt so realistic. The AI coach helped me practice behavioral questions and technical scenarios. The progress tracking showed my improvement over time.',
      avatar: '👨‍💼',
      rating: 5,
      improvement: '+60% success rate'
    },
    { 
      name: 'Emily Johnson', 
      role: 'Data Scientist',
      company: 'Netflix',
      content: 'What impressed me most was the personalized learning path. The AI adapted to my weak points and provided targeted exercises. The salary negotiation training was a game-changer.',
      avatar: '👩‍🔬',
      rating: 5,
      improvement: '+25% salary'
    },
    { 
      name: 'David Kim', 
      role: 'UX Designer',
      company: 'Apple',
      content: 'The video interview practice helped me master my body language and presentation skills. The real-time feedback on my communication style was incredibly valuable.',
      avatar: '👨‍🎨',
      rating: 5,
      improvement: '+3 job offers'
    },
    { 
      name: 'Lisa Thompson', 
      role: 'DevOps Engineer',
      company: 'Amazon',
      content: 'I was nervous about technical interviews, but AcePrep AI\'s coding challenges and system design practice gave me the confidence I needed. The detailed analytics were amazing.',
      avatar: '👩‍⚙️',
      rating: 5,
      improvement: '+50% preparation time'
    },
    { 
      name: 'James Wilson', 
      role: 'Marketing Director',
      company: 'Spotify',
      content: 'The industry-specific preparation was exactly what I needed. The AI understood marketing interview patterns and helped me craft compelling stories about my achievements.',
      avatar: '👨‍📈',
      rating: 5,
      improvement: '+35% response rate'
    }
  ]

  return (
    <section id="testimonials" ref={ref} className={`py-24 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-800 mb-6">
            ⭐ Trusted by 10,000+ Professionals
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success stories from
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              our amazing users
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how AcePrep AI has helped professionals land their dream jobs at top companies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-blue-500 opacity-50" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
              
              {/* Improvement Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full text-sm font-medium text-green-800 mb-6">
                {testimonial.improvement}
              </div>
              
              {/* Profile */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Users Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

