import React from "react";

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Features</h2>
          <p className="text-lg text-gray-600">Everything you need to ace your next interview.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Mock Interviews</h3>
            <p className="text-gray-600">Practice with realistic, AI-generated interview questions tailored to your role and experience.</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Real-Time Feedback</h3>
            <p className="text-gray-600">Get instant, actionable feedback on your answers, communication, and confidence.</p>
          </div>
          <div className="bg-pink-50 rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Personalized Coaching</h3>
            <p className="text-gray-600">Receive tips and resources to improve your skills and land your dream job.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
