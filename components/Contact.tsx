import React from "react";

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">We would love to hear from you! Reach out with any questions or feedback.</p>
        </div>
        <form className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-md">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" rows={5}></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg">Send Message</button>
        </form>
      </div>
    </section>
  );
}
