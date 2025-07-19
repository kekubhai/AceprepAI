import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-700 to-yellow-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">AcePrep-AI</h3>
            <p className="mb-4">Empowering your interview success with AI-driven preparation.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition-colors duration-300"><Facebook size={24} /></a>
              <a href="#" className="hover:text-yellow-300 transition-colors duration-300"><Twitter size={24} /></a>
              <a href="#" className="hover:text-yellow-300 transition-colors duration-300"><Instagram size={24} /></a>
              <a href="#" className="hover:text-yellow-300 transition-colors duration-300"><Linkedin size={24} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="hover:text-yellow-300 transition-colors duration-300">Features</Link></li>
              <li><Link href="#testimonials" className="hover:text-yellow-300 transition-colors duration-300">Testimonials</Link></li>
              <li><Link href="#pricing" className="hover:text-yellow-300 transition-colors duration-300">Pricing</Link></li>
              <li><Link href="#contact" className="hover:text-yellow-300 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">Career Tips</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">Interview Guide</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-300">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center">
          <p>&copy; {new Date().getFullYear()} AcePrep-AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

