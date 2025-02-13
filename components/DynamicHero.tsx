"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const gradients = [
  "from-green-400 via-teal-400 to-blue-500",
  "from-pink-400 via-purple-400 to-indigo-500",
  "from-orange-400 via-red-400 to-pink-500",
  "from-yellow-400 via-orange-400 to-red-500",
]

export default function DynamicHero() {
  const [currentGradient, setCurrentGradient] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length)
    }, 5000) // Change gradient every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`w-full h-[50vh] bg-gradient-to-r ${gradients[currentGradient]}`}
      animate={{ opacity: [0.5, 1] }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="container mx-auto h-full flex items-center justify-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          創新設計，啟發未來
        </motion.h1>
      </div>
    </motion.div>
  )
}

