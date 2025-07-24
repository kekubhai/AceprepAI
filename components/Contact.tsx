import React from "react";

export default function Contact() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">Contact Us</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">We'd love to hear from you! Reach out with any questions or feedback.</p>
        </div>
        <form className="max-w-xl mx-auto bg-white rounded-3xl p-10 shadow-lg border border-blue-100 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50" rows={5}></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all">Send Message</button>
        </form>
      </div>
    </section>
  );
}
