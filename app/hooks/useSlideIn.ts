'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

/**
 * Custom hook for slide-in animations using Intersection Observer
 * @param options - Intersection Observer options
 * @returns A tuple containing the ref object and visibility state
 */
export function useSlideIn(options: IntersectionObserverInit = {}): [RefObject<HTMLElement>, boolean] {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, options)

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return [ref, isVisible]
}

