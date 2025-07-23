import React from "react";

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-lg text-gray-600">Simple, transparent pricing for everyone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-gray-600 mb-4">Get started with basic mock interviews and feedback.</p>
            <div className="text-3xl font-bold mb-2">$0</div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold">Start Free</button>
          </div>
          <div className="bg-purple-50 rounded-2xl p-8 shadow-md border-2 border-purple-600">
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <p className="text-gray-600 mb-4">Unlock advanced AI feedback, coaching, and unlimited interviews.</p>
            <div className="text-3xl font-bold mb-2">$19<span className="text-lg font-normal">/mo</span></div>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold">Go Pro</button>
          </div>
          <div className="bg-pink-50 rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-gray-600 mb-4">Custom solutions for teams and organizations.</p>
            <div className="text-3xl font-bold mb-2">Contact Us</div>
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}
