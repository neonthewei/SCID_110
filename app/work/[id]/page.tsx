"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useCallback, useEffect, useRef } from "react"
import { getWorkById, getDesignerByWorkId, getAllWorks, type Work } from "@/data/designers"
import WorkFooter from "@/components/WorkFooter"

// 定義分類主題色映射
const categoryColors = {
  "舒適巢": "#8CBB28",
  "溫工藝": "#DA6615",
  "熱對話": "#C3206D",
  "冷火花": "#3DB5E9"
} as const

// 定義分類圖片映射
const categoryImages = {
  "舒適巢": "/reserve/reserve_bg_3.png",
  "溫工藝": "/reserve/reserve_bg_4.png",
  "熱對話": "/reserve/reserve_bg_2.png",
  "冷火花": "/reserve/reserve_bg_1.png"
} as const

// 旋轉圖片組件
const RotatingImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  return (
    <div className={`absolute ${className}`}>
      <div className="w-full h-full animate-slow-spin">
        <Image
          src={src}
          alt={alt}
          width={180}
          height={180}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default function WorkDetail({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromDesigner = searchParams.get('from') === 'designer'
  const designerId = searchParams.get('id')
  const work = getWorkById(params.id)
  const designer = work ? getDesignerByWorkId(params.id) : undefined

  // 處理返回按鈕點擊事件
  const handleBackClick = useCallback(() => {
    if (fromDesigner) {
      router.push(`/designer`)
    } else {
      // 如果有作品分類，保存到localStorage
      if (work && work.category) {
        localStorage.setItem('selectedCategory', work.category)
      }
      // 導航到作品總覽頁面
      router.push('/all-works')
    }
  }, [fromDesigner, router, work])

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev === 1 ? 0 : 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // 獲取當前作品分類的主題色
  const themeColor = work ? categoryColors[work.category] : "#9AB534"

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev === 0 ? 1 : 0))
  }, [])

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev === 1 ? 0 : 1))
  }, [])

  if (!work || !designer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">找不到作品</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Top-right Category Image - Inside overflow container */}
      <div className="absolute top-0 right-0 overflow-visible pointer-events-none">
        <RotatingImage 
          src={categoryImages[work.category]} 
          alt={work.category} 
          className="top-0 right-24 w-[420px] h-[420px] md:w-[560px] md:h-[520px] z-0 -mt-48 -mr-60 md:-mt-72 md:-mr-60 pointer-events-auto"
        />
      </div>
      
      {/* Main content container */}
      <div className="relative z-10">
        {/* Navigation */}
        <div className="container py-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-black hover:text-gray-600 transition-colors duration-200"
            aria-label="返回"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleBackClick()}
          >
            <ArrowLeft className="mr-2" size={24} />
          </button>
        </div>

        {/* Product Display Section */}
        <div className="container pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 lg:mb-0">
              <Image 
                src={work.images.main} 
                alt={work.title.main} 
                fill 
                className="object-contain"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center h-full">
              <div>
                <h1 className="text-[28px] md:text-[32px] font-medium mb-2 leading-tight" style={{ color: themeColor }}>
                  {work.title.main}
                </h1>
                <h2 className="text-[14px] md:text-[15px] mb-2 md:mb-6" style={{ color: themeColor }}>
                  {work.title.sub}
                </h2>
                <p className="text-[15px] text-[#9D9D9D] leading-[1.8] mb-6 md:mb-8">
                  {work.description}
                </p>
                
                {/* Divider - visible only on mobile */}
                <div className="h-px w-full bg-gray-200 my-6 md:hidden"></div>
                
                {/* Designer Info */}
                <div className="flex flex-wrap items-center gap-4 mb-2 md:mb-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={designer.image || "/placeholder.svg"}
                      alt={designer.name.zh}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] text-[#9D9D9D]">{designer.name.zh}</span>
                    <span className="text-[15px] text-[#9D9D9D]">{designer.name.pinyin}</span>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="flex items-center gap-6 ml-auto mt-2 md:mt-0">
                    <Link 
                      href="#" 
                      className="text-[#9D9D9D] hover:text-black transition-colors"
                      aria-label="Email"
                      tabIndex={0}
                    >
                      <Mail className="w-[18px] h-[18px]" />
                    </Link>
                    <Link 
                      href="#" 
                      className="text-[#9D9D9D] hover:text-black transition-colors"
                      aria-label="Instagram"
                      tabIndex={0}
                    >
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Link>
                    <Link 
                      href="#" 
                      className="text-[#9D9D9D] hover:text-black transition-colors"
                      aria-label="Behance"
                      tabIndex={0}
                    >
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5S Design Concept Section */}
        <div className="pt-[100px] pb-32">
          <div className="container">
            <h2 className="text-[24px] font-medium mb-8" style={{ color: themeColor }}>5°S 設計概念</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Design Concept Text */}
              <div className="prose max-w-none order-2 lg:order-1">
                <p className="text-[15px] text-[#9D9D9D] leading-[1.8] mb-6">
                  園藝是一項精細、細膩的活動，相較於一般農業工作件於工具的精確操作要求更高。
                  近期環保意識興起與趨，火焰除草在世界各地興起，因為火焰除草的快速與有機性，減廢及
                  用於大面積農地除草。
                </p>
                <p className="text-[15px] text-[#9D9D9D] leading-[1.8] mb-6">
                  然而，透過調整火焰的結構設計，可以使火焰的精確度提高，也可以改變焰焰的形狀。此
                  產品希望透過改良火焰噴頭的結構設計，設計出針對園藝這類需要精細控制的火焰除草工具。
                </p>
                <p className="text-[15px] text-[#9D9D9D] leading-[1.8]">
                  變噴頭的結構設計，設計出針對園藝這類需要精細控制的火焰除草工具。
                </p>
              </div>
              
              {/* Design Concept Image */}
              <div 
                className="relative w-full order-1 lg:order-2" 
                style={{ aspectRatio: '1200/600' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Left click area */}
                <div 
                  className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer" 
                  onClick={() => setCurrentImageIndex(prev => (prev === 0 ? 1 : 0))}
                  role="button"
                  aria-label="Previous image"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setCurrentImageIndex(prev => (prev === 0 ? 1 : 0));
                    }
                  }}
                />
                
                {/* Right click area */}
                <div 
                  className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer" 
                  onClick={() => setCurrentImageIndex(prev => (prev === 1 ? 0 : 1))}
                  role="button"
                  aria-label="Next image"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setCurrentImageIndex(prev => (prev === 1 ? 0 : 1));
                    }
                  }}
                />

                {work.images.details.slice(0, 2).map((detail, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={detail.image}
                      alt={detail.caption || "Design concept"}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))}

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {[0, 1].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 導購專刊 CTA */}
        {false && (
          <div className="container mb-12 relative z-10">
            <div className="max-w-3xl mx-auto relative">
              <div className="bg-white rounded-2xl h-[150px] md:h-[110px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out translate-y-10 hover:scale-[1.02] origin-center hover:border-gray-200">
                <div className="flex flex-row items-center h-full py-4 md:py-0 px-4 md:px-0">
                  {/* 圖片容器 */}
                  <div className="w-[120px] md:w-[120px] relative aspect-[3/4] md:ml-5 flex-shrink-0">
                    <Image
                      src="/book.png"
                      alt="2024年度專刊《TEMPO_BOND 棒_節奏》"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  
                  {/* 文字內容 */}
                  <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between pl-5 md:px-5 w-full">
                    <div className="text-left md:text-left mb-4 md:mb-0 w-full md:w-auto">
                      <h2 className="text-gray-900 text-[16px] md:text-lg font-bold leading-tight md:leading-none mb-1">
                        想一窺作品背後的秘辛？
                      </h2>
                      <p className="text-[#9D9D9D] text-[13px] md:text-sm">
                        購買我們的2024年度專刊《TEMPO_BOND 棒_節奏》!
                      </p>
                    </div>
                    <Link 
                      href="/buy-catalog"
                      className="w-full md:w-auto flex items-center justify-center h-8 md:h-10 px-4 md:px-6 bg-black text-white hover:bg-gray-800 transition duration-300 rounded-xl md:rounded-2xl group whitespace-nowrap text-xs md:text-sm mt-auto md:mt-0"
                      aria-label="購買專刊"
                      tabIndex={0}
                    >
                      <span className="mr-1.5 md:mr-2">手刀前往</span>
                      <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-[225deg] transform transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Footer with rotating image */}
      <WorkFooter 
        workId={params.id} 
        categoryImage={categoryImages[work.category]} 
        categoryName={work.category} 
      />
    </div>
  )
}

// 輔助函數：獲取上一個作品的 ID
function getPreviousWorkId(currentId: string): string {
  const allWorks = getAllWorks()
  const currentIndex = allWorks.findIndex((work: Work) => work.id === currentId)
  if (currentIndex === -1) return currentId
  const prevIndex = (currentIndex - 1 + allWorks.length) % allWorks.length
  return allWorks[prevIndex].id
}

// 輔助函數：獲取下一個作品的 ID
function getNextWorkId(currentId: string): string {
  const allWorks = getAllWorks()
  const currentIndex = allWorks.findIndex((work: Work) => work.id === currentId)
  if (currentIndex === -1) return currentId
  const nextIndex = (currentIndex + 1) % allWorks.length
  return allWorks[nextIndex].id
}

