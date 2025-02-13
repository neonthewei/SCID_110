import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Content */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          {/* Address and Email */}
          <div className="text-neutral-600 font-light text-center md:text-left">
            <p className="text-sm sm:text-base">Shih Chien University</p>
            <p className="text-sm sm:text-base">No. 70, Dazhi St., Zhongshan Dist., Taipei City, 104</p>
            <p className="text-sm sm:text-base text-neutral-800">scid@g2.usc.edu.tw</p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-neutral-600">
            <Link 
              href="#" 
              className="hover:text-neutral-900 transition-colors duration-300 text-[10px] sm:text-xs tracking-wider"
            >
              FACEBOOK
            </Link>
            <Link 
              href="#" 
              className="hover:text-neutral-900 transition-colors duration-300 text-[10px] sm:text-xs tracking-wider"
            >
              INSTAGRAM
            </Link>
            <Link 
              href="#" 
              className="hover:text-neutral-900 transition-colors duration-300 text-[10px] sm:text-xs tracking-wider"
            >
              YOUTUBE
            </Link>
            <Link 
              href="#" 
              className="hover:text-neutral-900 transition-colors duration-300 text-[10px] sm:text-xs tracking-wider"
            >
              BEHANCE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 