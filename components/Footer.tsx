import React from "react";

export default function Footer() {
  return (
    <footer className="py-10 bg-gradient-to-t from-white via-blue-50 to-purple-50 border-t border-blue-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} <span className="font-bold text-blue-700">AcePrep</span>. All rights reserved.</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
