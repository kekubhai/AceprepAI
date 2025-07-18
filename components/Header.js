import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AcePrep AI
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Contact
            </a>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
              Get Started
              <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button className="w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

