import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight">AcePrep</span>
        </Link>
        <nav className="flex gap-6">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
          <Link href="/testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Testimonials</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
