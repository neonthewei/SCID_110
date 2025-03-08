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
    name: "29°C～35°C",
    title: "溫工藝",
    subtitle: "工藝與材料",
    description: "工藝與材料的細膩專注，恰如手工製作時的手心溫度，溫暖且貼近人心。",
    longDescription: "這是一個展現設計者與材料之間溫柔互動的展區，透過雙手傳遞溫度。",
    image: "/workbg/workbg1.png",
  },
  {
    id: "舒適巢",
    name: "32°C～38°C",
    title: "舒適巢",
    subtitle: "空間與家具",
    description: "空間與家具的溫度，源於對生活的深刻理解與關懷。",
    longDescription: "在這裡，每一件作品都致力於創造舒適的居住體驗，將溫暖注入生活空間。",
    image: "/workbg/workbg2.png",
  },
  {
    id: "冷火花",
    name: "25°C～31°C",
    title: "冷火花",
    subtitle: "科技與互動",
    description: "科技與互動的冷靜思考中，迸發出創新的火花。",
    longDescription: "這個展區展現了理性與感性的完美結合，透過互動科技，創造出既智慧又富有溫度的使用體驗。",
    image: "/workbg/workbg3.png",
  },
  {
    id: "熱對話",
    name: "35°C～41°C",
    title: "熱對話",
    subtitle: "社會與溝通",
    description: "社會與溝通的熱切對話，展現設計與社會脈動的緊密連結。",
    longDescription: "在這裡，每件作品都是一次深刻的社會對話，傳遞著設計師對社會的關懷與期待。",
    image: "/workbg/borkbg4.png",
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
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoSequence, setIsAutoSequence] = useState(false)
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
    // Auto sequence will be triggered by useEffect
  }

  const handleNextCategory = () => {
    setSlideDirection('left')
    const newIndex = (currentCategoryIndex + 1) % categories.length
    setActiveCategory(categories[newIndex].id)
    // Auto sequence will be triggered by useEffect
  }

  const runAutoSequence = () => {
    setIsAutoSequence(true)
    setIsHovered(false)
    
    // After 2 seconds, show description
    setTimeout(() => {
      if (!isMobile) {
        setIsHovered(true)
      }
      
      // After another 2 seconds, show title again
      setTimeout(() => {
        setIsHovered(false)
        setIsAutoSequence(false)
      }, 2000)
    }, 2000)
  }

  // Run auto sequence whenever activeCategory changes
  useEffect(() => {
    if (!isMobile) {
      runAutoSequence()
    }
  }, [activeCategory])

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Categories with gradient background */}
      <motion.div className="relative h-[180px] md:h-[220px]" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-30% to-gray-50 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-start p-4 pt-8 md:px-12 md:pt-6">
          {/* Mobile Category Title */}
          <div className="md:hidden text-center w-full mb-4 relative mt-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={handlePrevCategory}
                className="p-1.5 rounded-[16px] bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white hover:bg-black/20 active:scale-95 transition-all duration-200 border border-white/30"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={handleNextCategory}
                className="p-1.5 rounded-[16px] bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white hover:bg-black/20 active:scale-95 transition-all duration-200 border border-white/30"
                aria-label="Next category"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative h-[70px] md:h-[80px] overflow-hidden px-16"
                onMouseEnter={() => isMobile || isAutoSequence ? null : setIsHovered(true)}
                onMouseLeave={() => isMobile || isAutoSequence ? null : setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  {isMobile || !isHovered ? (
                    <motion.div
                      key="title"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="flex items-center justify-center gap-2 text-white/80 text-base mb-2">
                        <span>{currentCategory?.name}</span>
                        <span className="w-[1px] h-3 bg-white/30"></span>
                        <span>{currentCategory?.subtitle}</span>
                      </div>
                      <h1 className="text-3xl md:text-2xl font-bold text-white">{currentCategory?.title}</h1>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="description"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 3, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <p className="text-base text-white mb-0.5 leading-[1.4]">{currentCategory?.description}</p>
                      <p className="text-base text-white px-4 leading-[1.4]">{currentCategory?.longDescription}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
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
                className="mb-2 text-left w-full relative h-[80px] overflow-hidden"
                onMouseEnter={() => isAutoSequence ? null : setIsHovered(true)}
                onMouseLeave={() => isAutoSequence ? null : setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  {!isHovered ? (
                    <motion.div
                      key="title"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="flex items-center gap-3 text-white/80 text-base mb-2">
                        <span>{currentCategory?.name}</span>
                        <span className="w-[1px] h-4 bg-white/30"></span>
                        <span>{currentCategory?.subtitle}</span>
                      </div>
                      <h1 className="text-4xl font-bold text-white">{currentCategory?.title}</h1>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="description"
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 20, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <p className="text-base text-white mb-0.5 leading-[1.4]">{currentCategory?.description}</p>
                      <p className="text-base text-white leading-[1.4]">{currentCategory?.longDescription}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-4 w-full">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(category.id)
                      // No need to call runAutoSequence here as it will be triggered by the useEffect
                    }}
                    className={`w-[140px] px-3 py-1.5 rounded-[16px] overflow-hidden transition-all duration-300 text-base whitespace-nowrap border
                      ${
                        activeCategory === category.id
                          ? "bg-black/20 backdrop-blur-md backdrop-saturate-150 text-white border-white/50"
                          : "bg-black/10 backdrop-blur-md backdrop-saturate-150 text-gray-300 hover:bg-black/15 hover:text-white hover:border-white/40 border-white/30 font-normal"
                      }`}
                  >
                    {category.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-3 sm:gap-y-16 sm:gap-x-4 mt-4 sm:mt-8 px-6 sm:px-8 pb-12 sm:pb-16 max-w-screen-2xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredWorks.slice(0, visibleItems).map((work, index) => (
            <motion.div
              key={work.id}
              id={work.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.5,
                delay: isMobile ? index * 0.03 : index * 0.05
              }}
              className="work-card group relative"
            >
              <Link href={`/work/${work.id}`} className="block">
                <div className="aspect-[4/3] relative overflow-hidden rounded-md">
                  <Image
                    src={work.images.main || "/placeholder.svg"}
                    alt={work.title.main}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 4 ? "eager" : "lazy"}
                    className={`object-cover transition-transform duration-300 rounded-md
                      ${activeItemId === work.id ? 'scale-105 md:scale-100' : ''} 
                      md:group-hover:scale-110`}
                  />
                </div>
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: isMobile ? 0.3 : 0.5,
                    delay: isMobile ? index * 0.03 : index * 0.05
                  }}
                >
                  <p className="text-base leading-tight text-left mb-1.5 text-gray-900 font-medium">
                    {work.title.main}
                  </p>
                  {work.title.sub && (
                    <p className="text-sm leading-tight text-left text-gray-500">
                      {work.title.sub}
                    </p>
                  )}
                </motion.div>
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

