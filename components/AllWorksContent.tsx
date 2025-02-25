"use client"
import Image from "next/image"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllWorks, type WorkCategory } from "@/data/designers"
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: "溫工藝",
    name: "50°S",
    title: "溫工藝",
    description: "傳統工藝與現代設計的完美融合",
    image: "/frame1.png",
  },
  {
    id: "舒適巢",
    name: "25°S",
    title: "舒適巢",
    description: "打造溫馨舒適的生活空間",
    image: "/frame0.png",
  },
  {
    id: "冷火花",
    name: "-20°S",
    title: "冷火花",
    description: "激發創新思維的火花",
    image: "/ggg.png",
  },
  {
    id: "熱對話",
    name: "80°S",
    title: "熱對話",
    description: "促進深度交流與互動",
    image: "/kkk.png",
  },
]

export default function AllWorksContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl || categories[0].id)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [isMobile, setIsMobile] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const lastScrollY = useRef(0)
  const allWorks = getAllWorks()
  const [visibleItems, setVisibleItems] = useState<number>(12); // Initial number of items to show
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  // Filter works based on active category
  const filteredWorks = useMemo(() => {
    return activeCategory
      ? allWorks.filter(work => work.category === activeCategory)
      : allWorks
  }, [activeCategory, allWorks])

  // 檢查 localStorage 中的分類
  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory')
    if (savedCategory) {
      setActiveCategory(savedCategory)
      // 清除 localStorage，避免影響下次正常訪問
      localStorage.removeItem('selectedCategory')
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      if (isMobile !== isMobileView) {
        setIsMobile(isMobileView)
        setActiveItemId(null)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

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
    if (currentWorks && currentWorks.length > 0 && !activeItemId) {
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
            const viewCenter = viewHeight / 2
            const distanceFromCenter = Math.abs(elementCenter - viewCenter)

            if (distanceFromCenter < rect.height * 0.5) {
              setActiveItemId(entry.target.id)
            }
          } else {
            if (entry.target.id === activeItemId) {
              setActiveItemId(null)
            }
          }
        })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    const elements = document.querySelectorAll('.work-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeCategory, activeItemId])

  // Load more items when scrolling
  useEffect(() => {
    if (inView) {
      setVisibleItems(prev => Math.min(prev + 8, filteredWorks.length));
    }
  }, [inView, filteredWorks.length]);

  const currentCategoryIndex = categories.findIndex((c) => c.id === activeCategory)
  const currentCategory = categories.find((c) => c.id === activeCategory)

  const handlePrevCategory = () => {
    setSlideDirection('right')
    const newIndex = (currentCategoryIndex - 1 + categories.length) % categories.length
    setActiveCategory(categories[newIndex].id)
  }

  const handleNextCategory = () => {
    setSlideDirection('left')
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
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={currentCategory?.image || ""}
              alt={currentCategory?.title || ""}
              fill
              className="object-cover md:object-center object-left"
              style={{ 
                objectPosition: isMobile ? "25% center" : "center"
              }}
            />
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-white mb-2">{currentCategory?.title}系列</h1>
                <p className="text-white/80 text-base">{currentCategory?.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Category Selector */}
          <div className="flex items-center justify-between gap-4 md:hidden w-full">
            <button
              onClick={handlePrevCategory}
              className="p-2 rounded-full bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white hover:bg-black/20 active:scale-95 transition-all duration-200 border border-white/30"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 px-6 py-3 rounded-full font-semibold text-center bg-black/15 backdrop-blur-md backdrop-saturate-150 text-white border border-white/30">
              {currentCategory?.name}
            </div>

            <button
              onClick={handleNextCategory}
              className="p-2 rounded-full bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white hover:bg-black/20 active:scale-95 transition-all duration-200 border border-white/30"
              aria-label="Next category"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Category Tabs */}
          <div className="hidden md:flex flex-col items-start justify-center w-full md:px-12 lg:pl-12 xl:pl-16 pt-6">
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
                    className={`w-[160px] px-4 py-2 rounded-[20px] overflow-hidden transition-all duration-300 text-lg whitespace-nowrap border
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
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-16 pb-12 sm:pb-16 max-w-screen-2xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredWorks.slice(0, visibleItems).map((work, index) => (
            <motion.div
              key={work.id}
              id={work.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.5,  // Faster animation on mobile
                delay: isMobile ? index * 0.03 : index * 0.05  // Shorter delay on mobile
              }}
              className="work-card group relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl"
            >
              <Link href={`/work/${work.id}`} className="block w-full h-full">
                <Image
                  src={work.images.main || "/placeholder.svg"}
                  alt={work.title.main}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 4 ? "eager" : "lazy"}
                  className={`object-cover transition-transform duration-300 rounded-xl
                    ${activeItemId === work.id ? 'scale-105 md:scale-100' : ''} 
                    md:group-hover:scale-110`}
                />
                <div 
                  className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end
                    md:inset-x-0 md:bottom-0 md:items-start md:justify-end"
                >
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 
                    ${isMobile && activeItemId === work.id ? 'opacity-100' : 'opacity-0'} 
                    md:group-hover:opacity-100 from-black/80 to-transparent`} />
                  
                  <div className={`relative w-full px-4 pt-32 pb-3 md:px-4 md:pt-32 md:pb-3 md:flex md:flex-col md:items-start transition-transform duration-300 
                    ${isMobile && activeItemId === work.id ? 'translate-y-0' : 'translate-y-8'} 
                    md:group-hover:translate-y-0`}>
                    <div className={`w-full md:px-4 px-3 py-2 transition-opacity duration-300
                      ${isMobile && activeItemId === work.id ? 'opacity-100' : 'opacity-0'} 
                      md:group-hover:opacity-100`}>
                      <p className="text-lg leading-tight text-center mb-1 text-white font-medium">
                        {work.title.main}
                      </p>
                      {work.title.sub && (
                        <p className="text-sm leading-tight text-center text-gray-300">
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
      
      {/* Load more trigger */}
      {visibleItems < filteredWorks.length && (
        <div ref={ref} className="h-10 w-full" />
      )}
    </div>
  )
}

