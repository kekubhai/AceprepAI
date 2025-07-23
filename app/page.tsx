'use client'

import { useState, useEffect } from 'react'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Header from './dashboard/_components/Header'
import BackgroundDecoration from '../components/BackgroundDec'
import Hero from '../components/Hero'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className={`min-h-screen bg-gradient-to-br from-purple-50 to-white ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 overflow-hidden`}>
      <BackgroundDecoration />
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Contact />
      
    </main>
  )
}

