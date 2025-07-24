import React from "react";

const testimonials = [
  {
    quote: "The AI feedback was spot on and helped me improve my answers. I landed my dream job!",
    name: "Alex P.",
    title: "Software Engineer",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    quote: "Mock interviews felt real and the coaching tips were invaluable.",
    name: "Maria S.",
    title: "Product Manager",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    quote: "I loved the personalized approach. The platform boosted my confidence!",
    name: "James L.",
    title: "Data Analyst",
    color: "text-pink-600",
    bg: "bg-pink-50"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">What Our Users Say</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Real stories from successful candidates.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className={`rounded-3xl shadow-lg border p-10 flex flex-col items-center ${t.bg} border-blue-100 hover:shadow-xl transition-shadow`}>
              <svg className="w-8 h-8 mb-4 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 15.59A5.97 5.97 0 0 1 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6c-1.3 0-2.5-.42-3.48-1.13l-2.35.72z"></path></svg>
              <p className="text-gray-700 mb-6 text-center text-lg">“{t.quote}”</p>
              <div className={`font-semibold ${t.color}`}>{t.name}</div>
              <div className="text-sm text-gray-500">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
