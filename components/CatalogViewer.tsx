'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

interface CatalogViewerProps {
  images: {
    url: string
    alt: string
  }[]
}

export default function CatalogViewer({ images }: CatalogViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      handlePrevious()
    } else if (info.offset.x < -swipeThreshold) {
      handleNext()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <div className="w-full mt-16">
      {/* 主要預覽圖 */}
      <div className="relative aspect-square w-full md:w-2/3 lg:w-1/2 mx-auto overflow-hidden touch-pan-x">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="relative w-full h-full cursor-grab active:cursor-grabbing touch-pan-x select-none"
            style={{ touchAction: "pan-x" }}
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-cover pointer-events-none"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
        {/* 固定在容器右下角的頁碼 */}
        <div className="absolute bottom-4 right-4 z-10 text-sm text-white bg-black/50 rounded-full w-12 h-6 flex items-center justify-center md:hidden">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* 桌面版縮圖列表 */}
      <div className="hidden md:block max-w-4xl mx-auto mt-3">
        <motion.div 
          className="flex justify-center gap-2 overflow-x-auto py-1 px-4 no-scrollbar"
          initial={false}
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`flex-shrink-0 relative w-16 aspect-square rounded-2xl overflow-hidden
                ${currentIndex === index 
                  ? 'ring-2 ring-black' 
                  : 'hover:ring-2 hover:ring-gray-300'}
                transition-all duration-200`}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <motion.div
              className="relative w-full h-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
            >
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 