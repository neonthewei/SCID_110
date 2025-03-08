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
    name: "29°S～35°S",
    title: "溫工藝",
    subtitle: "工藝與材料",
    description: "用雙手傳遞溫暖，塑造希望的形狀。這不僅是藝術，更是一種人與物之間的流動——",
    longDescription: "從手心到物品，讓關懷不再只是語言，而是得以觸摸的溫度。",
    image: "/workbg/workbg1.png",
  },
  {
    id: "舒適巢",
    name: "19°S～25°S",
    title: "舒適巢",
    subtitle: "家居與兒童",
    description: "室溫穩定而舒適，均勻地散布於空間中，帶來安心與放鬆。",
    longDescription: "指尖觸碰木質與織物，感受微妙的溫差變化，讓身體自然沉浸在柔和與安穩之中。",
    image: "/workbg/workbg2.png",
  },
  {
    id: "冷火花",
    name: "5°S、130～140°S",
    title: "冷火花",
    subtitle: "科技與載具",
    description: "冰冷的材質勾勒出理性的輪廓，內裡卻蘊含精密的技術與人性化的考量。",
    longDescription: "每次觸碰都能感受到隱藏其中的細緻，讓科技與生活在低調與溫暖之間達成微妙的平衡。",
    image: "/workbg/workbg3.png",
  },
  {
    id: "熱對話",
    name: "85°S～100°S",
    title: "熱對話",
    subtitle: "社會與推測",
    description: "有價值的對話不僅是交換觀點，更是讓思維層層加溫。",
    longDescription: "文化的演進、議題的探索、未來的推測，皆在不斷升溫的對話中翻騰、交融。",
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

  const runAutoSequence = () => {
    // Function kept for backward compatibility
    // No implementation needed as we're removing auto sequence
  }

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

        <div className="relative z-10 h-full flex flex-col items-center justify-start p-4 pt-8 md:px-[5%] md:pt-6">
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
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
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
          <div className="hidden md:flex flex-col items-start justify-center w-full md:px-[5%] lg:px-[5%] xl:px-[5%] pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-2 text-left w-full relative h-[80px] overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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
                    }}
                    onMouseEnter={() => {
                      if (!isMobile && category.id === activeCategory) {
                        setIsHovered(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setIsHovered(false)
                      }
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

      {/* Works Grid Container */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-3 sm:gap-y-16 sm:gap-x-4 mt-4 sm:mt-8 pb-12 sm:pb-16 w-full">
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
                    <p className="text-base leading-tight text-left mb-1.5 text-gray-900 font-normal">
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
    </div>
  )
}

