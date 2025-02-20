'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('hoverable')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('hoverable')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div className="cursor pointer-events-none fixed top-0 left-0 z-[1000]">
      <div 
        className={`cursor__ball cursor__ball--big absolute ${isHovering ? 'scale-[2.5]' : ''}`}
        style={{ 
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
          transition: 'transform 0.1s ease-out, scale 0.3s ease-out'
        }}
      >
        <svg height="40" width="40">
          <circle cx="20" cy="20" r="18" strokeWidth="0" fill="rgba(0, 0, 0, 0.4)"></circle>
        </svg>
      </div>
      
      <div 
        className="cursor__ball cursor__ball--small absolute"
        style={{ 
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <svg height="12" width="12">
          <circle cx="6" cy="6" r="5" strokeWidth="0" fill="rgba(0, 0, 0, 0.8)"></circle>
        </svg>
      </div>
    </div>
  )
} 