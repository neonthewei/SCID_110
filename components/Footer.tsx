'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const Footer = () => {
  const pathname = usePathname()
  const isBookTourPage = pathname === '/book-tour'
  const isBuyCatalogPage = pathname === '/buy-catalog'
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const checkHeight = () => {
      const minHeight = 900; // 修改閾值與 page.tsx 一致
      setIsSticky(window.innerHeight >= minHeight);
    };

    if (isBookTourPage) {
      checkHeight();
      window.addEventListener('resize', checkHeight);
      return () => window.removeEventListener('resize', checkHeight);
    }
  }, [isBookTourPage]);

  return (
    <footer className={`
      w-full py-6 bg-neutral-100 border-t border-neutral-200 backdrop-blur-sm z-50
      ${isBookTourPage ? (isSticky ? 'md:fixed md:bottom-0 md:left-0 md:right-0' : 'relative') : 'relative'}
      ${isBuyCatalogPage ? 'hidden md:block' : ''}
    `}>
      <div className="container mx-auto px-4">
        {/* Content */}
        <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center">
          {/* Address and Email */}
          <div className="text-neutral-700 font-light flex items-center gap-6 whitespace-nowrap">
            <span className="text-sm font-medium text-neutral-900">Shih Chien University</span>
            <span className="text-sm text-neutral-400">|</span>
            <span className="text-sm">No. 70, Dazhi St., Zhongshan Dist., Taipei City, 104</span>
            <span className="text-sm text-neutral-400">|</span>
            <a 
              href="mailto:scid@g2.usc.edu.tw" 
              className="text-sm text-neutral-900 hover:text-blue-600 transition-colors duration-300"
            >
              scid@g2.usc.edu.tw
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-neutral-700 whitespace-nowrap">
            <Link 
              href="#" 
              className="text-sm tracking-wider hover:text-neutral-900 transition-all duration-300"
            >
              FACEBOOK
            </Link>
            <Link 
              href="#" 
              className="text-sm tracking-wider hover:text-neutral-900 transition-all duration-300"
            >
              INSTAGRAM
            </Link>
            <Link 
              href="#" 
              className="text-sm tracking-wider hover:text-neutral-900 transition-all duration-300"
            >
              YOUTUBE
            </Link>
            <Link 
              href="#" 
              className="text-sm tracking-wider hover:text-neutral-900 transition-all duration-300"
            >
              BEHANCE
            </Link>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="md:hidden flex flex-col items-center">
          {/* Address and Email */}
          <div className="text-neutral-700 font-light flex flex-col items-center">
            <span className="text-sm font-medium text-neutral-900 mb-1">Shih Chien University</span>
            <div className="flex items-center gap-2 text-xs text-center">
              <span>No. 70, Dazhi St., Zhongshan Dist.</span>
              <span className="text-neutral-400">|</span>
              <span>Taipei City, 104</span>
            </div>
            <a 
              href="mailto:scid@g2.usc.edu.tw" 
              className="text-xs text-neutral-900 hover:text-blue-600 transition-colors duration-300 mt-1"
            >
              scid@g2.usc.edu.tw
            </a>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-neutral-300 my-4"></div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 text-neutral-700">
            <Link href="#" className="text-xs tracking-wider hover:text-neutral-900 transition-all duration-300">
              FACEBOOK
            </Link>
            <Link href="#" className="text-xs tracking-wider hover:text-neutral-900 transition-all duration-300">
              INSTAGRAM
            </Link>
            <Link href="#" className="text-xs tracking-wider hover:text-neutral-900 transition-all duration-300">
              YOUTUBE
            </Link>
            <Link href="#" className="text-xs tracking-wider hover:text-neutral-900 transition-all duration-300">
              BEHANCE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 