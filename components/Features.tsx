import React from "react";
import { Sparkles, MessageCircle, UserCheck } from "lucide-react";

export default function Features() {
  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Ace your next interview with <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AI-powered prep</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              Practice, get feedback, and boost your confidence with a modern, beautiful platform designed for ambitious candidates.
            </p>
            <a href="/sign-up" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-all">
              Get Started Free
            </a>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img src="/logo.svg" alt="AcePrep Illustration" className="w-80 h-80 object-contain drop-shadow-xl rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">Platform Features</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to ace your next interview, with a beautiful, modern, and light UI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-10 flex flex-col items-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Mock Interviews</h3>
              <p className="text-gray-600 text-center">Practice with realistic, AI-generated interview questions tailored to your role and experience.</p>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-10 flex flex-col items-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Real-Time Feedback</h3>
              <p className="text-gray-600 text-center">Get instant, actionable feedback on your answers, communication, and confidence.</p>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-10 flex flex-col items-center hover:shadow-xl transition-shadow">
              <div className="bg-pink-100 text-pink-600 rounded-full p-4 mb-6">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Personalized Coaching</h3>
              <p className="text-gray-600 text-center">Receive tips and resources to improve your skills and land your dream job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">What Our Users Say</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Real stories from successful candidates.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="rounded-3xl shadow-lg border p-10 flex flex-col items-center bg-blue-50 border-blue-100 hover:shadow-xl transition-shadow">
              <svg className="w-8 h-8 mb-4 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 15.59A5.97 5.97 0 0 1 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6c-1.3 0-2.5-.42-3.48-1.13l-2.35.72z"></path></svg>
              <p className="text-gray-700 mb-6 text-center text-lg">“The AI feedback was spot on and helped me improve my answers. I landed my dream job!”</p>
              <div className="font-semibold text-blue-600">Alex P.</div>
              <div className="text-sm text-gray-500">Software Engineer</div>
            </div>
            <div className="rounded-3xl shadow-lg border p-10 flex flex-col items-center bg-purple-50 border-blue-100 hover:shadow-xl transition-shadow">
              <svg className="w-8 h-8 mb-4 text-purple-200" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 15.59A5.97 5.97 0 0 1 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6c-1.3 0-2.5-.42-3.48-1.13l-2.35.72z"></path></svg>
              <p className="text-gray-700 mb-6 text-center text-lg">“Mock interviews felt real and the coaching tips were invaluable.”</p>
              <div className="font-semibold text-purple-600">Maria S.</div>
              <div className="text-sm text-gray-500">Product Manager</div>
            </div>
            <div className="rounded-3xl shadow-lg border p-10 flex flex-col items-center bg-pink-50 border-blue-100 hover:shadow-xl transition-shadow">
              <svg className="w-8 h-8 mb-4 text-pink-200" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 15.59A5.97 5.97 0 0 1 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6c-1.3 0-2.5-.42-3.48-1.13l-2.35.72z"></path></svg>
              <p className="text-gray-700 mb-6 text-center text-lg">“I loved the personalized approach. The platform boosted my confidence!”</p>
              <div className="font-semibold text-pink-600">James L.</div>
              <div className="text-sm text-gray-500">Data Analyst</div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-8 py-6 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to get started?</h3>
            <p className="text-lg text-blue-100 mb-4">Join AcePrep and unlock your full potential today.</p>
            <a href="/sign-up" className="inline-block px-8 py-4 rounded-full bg-white text-blue-700 font-semibold text-lg shadow hover:bg-blue-50 transition-all">
              Start Free Trial
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
