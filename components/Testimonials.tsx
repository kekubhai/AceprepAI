import React from "react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">Real stories from successful candidates.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <p className="text-gray-700 mb-4">“The AI feedback was spot on and helped me improve my answers. I landed my dream job!”</p>
            <div className="font-semibold text-blue-600">Alex P.</div>
            <div className="text-sm text-gray-500">Software Engineer</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <p className="text-gray-700 mb-4">“Mock interviews felt real and the coaching tips were invaluable.”</p>
            <div className="font-semibold text-purple-600">Maria S.</div>
            <div className="text-sm text-gray-500">Product Manager</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <p className="text-gray-700 mb-4">“I loved the personalized approach. The platform boosted my confidence!”</p>
            <div className="font-semibold text-pink-600">James L.</div>
            <div className="text-sm text-gray-500">Data Analyst</div>
          </div>
        </div>
      </div>
    </section>
  );
}
