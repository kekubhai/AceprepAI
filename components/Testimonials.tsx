import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    rating: 5,
    quote:
      "AcePrep's AI coaching helped me land my dream job at Google. The personalized feedback was incredibly detailed and actionable."
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "Microsoft",
    rating: 5,
    quote:
      "The interview practice sessions felt so realistic. I went into my actual interview with complete confidence."
  },
  {
    name: "Priya Patel",
    role: "Data Scientist",
    company: "Netflix",
    rating: 5,
    quote:
      "Amazing platform! The AI questions were spot-on for my role. Highly recommend for anyone preparing for tech interviews."
  },
  {
    name: "Alex Rodriguez",
    role: "Frontend Developer",
    company: "Uber",
    rating: 5,
    quote:
      "Best interview prep tool I've used. The performance tracking helped me identify my weak areas and improve systematically."
  },
  {
    name: "Emily Wang",
    role: "UX Designer",
    company: "Airbnb",
    rating: 5,
    quote:
      "The real-time feedback during practice sessions was game-changing. I felt completely prepared for my design interviews."
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    company: "Amazon",
    rating: 5,
    quote:
      "Incredible AI technology! The questions adapted to my experience level perfectly. Got the job on my first try!"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Real stories from successful candidates.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl shadow-lg border p-10 flex flex-col items-center border-blue-100 hover:shadow-xl transition-shadow"
            >
              <Quote className="w-8 h-8 mb-4 text-blue-200" />
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-center text-lg">
                “{testimonial.quote}”
              </p>
              <div className="font-semibold text-gray-900">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-500">
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          ))}
        </div>
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to join them?
            </h3>
            <p className="text-gray-600 mb-6">
              Start your journey to interview success today with AI-powered practice
              sessions.
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
