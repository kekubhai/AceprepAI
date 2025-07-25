import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight font-geist">
              AcePrep
            </span>
            <span className="ml-2 w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm animate-pulse"></span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {[
            { name: "Features", href: "/features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Testimonials", href: "/testimonials" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors text-[15px] rounded-lg hover:bg-gray-50/80"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium text-[15px] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-[15px] rounded-lg shadow-sm hover:shadow-md transition-all hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}