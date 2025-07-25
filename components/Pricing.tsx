import React from "react";

export default function Pricing() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Pricing</h2>
          <p className="text-lg text-gray-600 mb-2">AI-powered value for every candidate.</p>
          <p className="text-base text-gray-400">Simple, transparent pricing for everyone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-blue-100 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2 text-blue-700">Free</h3>
            <p className="text-gray-600 mb-4 text-center">Get started with basic mock interviews and feedback.</p>
            <div className="text-4xl font-extrabold mb-2 text-blue-700">$0</div>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow hover:opacity-90 transition-all">Start Free</button>
          </div>
          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-100 via-white to-blue-100 rounded-3xl p-12 shadow-2xl border-2 border-purple-600 scale-105 z-10 flex flex-col items-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">Most Popular</div>
            <h3 className="text-2xl font-semibold mb-2 text-purple-700">Pro</h3>
            <p className="text-gray-700 mb-4 text-center">Unlock advanced AI feedback, coaching, and unlimited interviews.</p>
            <div className="text-4xl font-extrabold mb-2 text-purple-700">$19<span className="text-lg font-normal">/mo</span></div>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow hover:opacity-90 transition-all">Go Pro</button>
          </div>
          {/* Enterprise Plan */}
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-pink-100 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2 text-pink-700">Enterprise</h3>
            <p className="text-gray-600 mb-4 text-center">Custom solutions for teams and organizations.</p>
            <div className="text-3xl font-bold mb-2 text-pink-700">Contact Us</div>
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow hover:opacity-90 transition-all">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}
