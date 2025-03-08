"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"

const ExhibitionOverlay = () => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  // Check if current page is the All Works page
  const isAllWorksPage = pathname === "/all-works" || pathname.startsWith("/all-works/")

  useEffect(() => {
    // Only enable the keyboard listener on the All Works page
    if (!isAllWorksPage) {
      setIsVisible(false)
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "o") {
        setIsVisible((prev) => !prev)
      } else if (isVisible) {
        // Navigate to homepage when any other key is pressed while overlay is visible
        router.push("/")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isVisible, router, isAllWorksPage, pathname])

  // Handle click on overlay to navigate to homepage
  const handleOverlayClick = () => {
    if (isVisible) {
      router.push("/")
    }
  }

  // Only render the overlay component on the All Works page
  if (!isAllWorksPage) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center cursor-pointer"
          aria-label="展覽期間暫不開放"
          role="alert"
          onClick={handleOverlayClick}
          onKeyDown={(e) => e.key !== "o" && handleOverlayClick()}
          tabIndex={0}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-white text-5xl font-bold text-center px-4 mb-6"
          >
            展覽期間暫不開放
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/70 text-lg mt-8 flex items-center"
          >
            按任意鍵或點擊畫面回到首頁
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExhibitionOverlay 