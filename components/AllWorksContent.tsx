"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllWorks, type WorkCategory } from "@/data/designers"

// Import background images
import frame1Bg from '@/public/frame.png'
import frame2Bg from '@/public/frame2.png'
import frame3Bg from '@/public/frame3.png'
import frame4Bg from '@/public/frame4.png'

const categories = [
  {
    id: "舒適巢",
    name: "25°S",
    title: "舒適巢",
    description: "打造溫馨舒適的生活空間",
    gradient: `bg-[url('${frame1Bg.src}')] bg-cover bg-center bg-no-repeat bg-origin-center`,
  },
  {
    id: "溫工藝",
    name: "50°S",
    title: "溫工藝",
    description: "傳統工藝與現代設計的完美融合",
    gradient: `bg-[url('${frame2Bg.src}')] bg-cover bg-center`,
  },
  {
    id: "熱對話",
    name: "80°S",
    title: "熱對話",
    description: "促進深度交流與互動",
    gradient: `bg-[url('${frame3Bg.src}')] bg-cover bg-center`,
  },
  {
    id: "冷火花",
    name: "-20°S",
    title: "冷火花",
    description: "激發創新思維的火花",
    gradient: `bg-[url('${frame4Bg.src}')] bg-cover bg-center`,
  },
]

export default function AllWorksContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || categories[0].id)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const lastScrollY = useRef(0)
  const allWorks = getAllWorks()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const currentWorks = allWorks.filter(work => work.category === activeCategory)
    if (currentWorks && currentWorks.length > 0) {
      setActiveItemId(currentWorks[0].id)
    }
  }, [activeCategory, allWorks])

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const viewHeight = window.innerHeight
            const elementCenter = rect.top + rect.height / 2
            const viewCenter = viewHeight * (scrollDirection === 'down' ? 0.7 : 0.3)
            const distanceFromCenter = Math.abs(elementCenter - viewCenter)

            if (distanceFromCenter < rect.height * 0.25) {
              setActiveItemId(entry.target.id)
            }
          } else if (entry.target.id === activeItemId) {
            const currentWorks = allWorks.filter(work => work.category === activeCategory)
            if (entry.target.id !== currentWorks[0].id || scrollDirection === 'up') {
              setActiveItemId(null)
            }
          }
        })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: scrollDirection === 'down' ? '-50% 0px -10% 0px' : '-10% 0px -50% 0px'
      }
    )

    const elements = document.querySelectorAll('.work-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeCategory, activeItemId, scrollDirection, allWorks])

  const currentCategoryIndex = categories.findIndex((c) => c.id === activeCategory)
  const currentCategory = categories.find((c) => c.id === activeCategory)
  const filteredWorks = allWorks.filter(work => work.category === activeCategory)

  const handlePrevCategory = () => {
    const newIndex = (currentCategoryIndex - 1 + categories.length) % categories.length
    setActiveCategory(categories[newIndex].id)
  }

  const handleNextCategory = () => {
    const newIndex = (currentCategoryIndex + 1) % categories.length
    setActiveCategory(categories[newIndex].id)
  }

  return (
    <div className="min-h-screen">
      {/* Categories with gradient background */}
      <motion.div className="relative h-[260px]" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        {/* Full gradient background */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeCategory}
            className={`absolute inset-0 bg-gradient-to-r ${currentCategory?.gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Add some decorative elements in background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute right-20 top-20 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute left-1/2 bottom-0 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 via-30% via-white/30 via-60% to-white pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-start p-4 pt-12 md:px-12 md:pt-10">
          {/* Mobile Category Title */}
          <div className="md:hidden text-center w-full mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">{currentCategory?.title}系列</h1>
            <p className="text-white/80 text-base">{currentCategory?.description}</p>
          </div>

          {/* Mobile Category Selector */}
          <div className="flex items-center justify-between gap-4 md:hidden w-full">
            <button
              onClick={handlePrevCategory}
              className="p-2 rounded-full bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white hover:bg-black/20 transition-colors border border-white/30"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 px-6 py-3 rounded-full font-semibold text-center bg-black/15 backdrop-blur-md backdrop-saturate-150 text-white border border-white/30"
            >
              {currentCategory?.name}
            </motion.div>

            <button
              onClick={handleNextCategory}
              className="p-2 rounded-full bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white hover:bg-black/20 transition-colors border border-white/30"
              aria-label="Next category"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Category Tabs */}
          <div className="hidden md:flex flex-col items-start justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8 text-left w-full"
              >
                <h1 className="text-3xl font-bold text-white mb-2">{currentCategory?.title}系列</h1>
                <p className="text-white/80 text-lg">{currentCategory?.description}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-4 w-full">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-[120px] px-4 py-2 rounded-[20px] overflow-hidden transition-all duration-300 text-lg whitespace-nowrap border
                      ${
                        activeCategory === category.id
                          ? "bg-black/20 backdrop-blur-md backdrop-saturate-150 text-white border-white/50"
                          : "bg-black/10 backdrop-blur-md backdrop-saturate-150 text-gray-300 hover:bg-black/15 hover:text-white hover:border-white/40 border-white/30 font-normal"
                      }`}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-8 px-4 sm:px-8 md:px-12 pb-12 sm:pb-16">
        <AnimatePresence mode="wait">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              id={work.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="work-card group relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-2xl"
            >
              <Link href={`/work/${work.id}`} className="block w-full h-full">
                <Image
                  src={work.images.main || "/placeholder.svg"}
                  alt={work.title.main}
                  fill
                  className={`object-cover transition-transform duration-500 rounded-2xl
                    ${activeItemId === work.id ? 'scale-110 md:scale-100' : ''} 
                    md:group-hover:scale-110`}
                />
                <div 
                  className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end
                    md:inset-x-0 md:bottom-0 md:items-start md:justify-end"
                >
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 
                    ${activeItemId === work.id ? 'opacity-100 md:opacity-0' : 'opacity-0'} 
                    md:group-hover:opacity-100 ${
                    work.category === '舒適巢' ? 'from-[#8CBB28]/70 to-transparent' :
                    work.category === '溫工藝' ? 'from-[#DA6615]/70 to-transparent' :
                    work.category === '熱對話' ? 'from-[#C3206D]/70 to-transparent' :
                    'from-[#3DB5E9]/70 to-transparent'
                  }`} />
                  
                  <div className={`relative w-full px-4 pt-32 pb-3 md:px-4 md:pt-32 md:pb-3 md:flex md:flex-col md:items-start transition-transform duration-300 
                    ${activeItemId === work.id ? 'translate-y-0' : 'translate-y-4'} 
                    md:group-hover:translate-y-0`}>
                    <div className={`w-full md:px-4 px-3 py-2
                      ${activeItemId === work.id ? 'opacity-100 md:opacity-0' : 'opacity-0'} 
                      md:group-hover:opacity-100`}>
                      <p className="text-lg leading-tight text-center text-white mb-1">
                        {work.title.main}
                      </p>
                      {work.title.sub && (
                        <p className="text-white/80 text-sm leading-tight text-center">
                          {work.title.sub}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

