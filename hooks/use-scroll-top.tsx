import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // handle Scroll
    const handleScroll = () => {
      window.scrollY > threshold ? setScrolled(true) : setScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)
    // clean up func
    return () => window.removeEventListener('scroll', handleScroll)
  },[threshold])

  return scrolled;
}