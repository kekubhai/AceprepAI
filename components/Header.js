import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-purple-700">Ace Prep-AI</a>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-purple-700 hover:text-purple-900 transition-colors">Features</a>
          <a href="#testimonials" className="text-purple-700 hover:text-purple-900 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-purple-700 hover:text-purple-900 transition-colors">Pricing</a>
          <a href="#contact" className="text-purple-700 hover:text-purple-900 transition-colors">Contact</a>
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-md">
          <a href="#features" className="block py-2 px-4 text-purple-700 hover:bg-purple-100 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#testimonials" className="block py-2 px-4 text-purple-700 hover:bg-purple-100 transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
          <a href="#pricing" className="block py-2 px-4 text-purple-700 hover:bg-purple-100 transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <a href="#contact" className="block py-2 px-4 text-purple-700 hover:bg-purple-100 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  )
}

