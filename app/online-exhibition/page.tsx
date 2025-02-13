"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Bus, Train, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const exhibitionAreas = [
  {
    id: "shih-chien",
    name: "實踐展區",
    title: "實踐展區",
    description: "實踐大學設計學院畢業展",
    gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
  },
  {
    id: "milan",
    name: "米蘭展區",
    title: "米蘭展區",
    description: "米蘭設計週展出作品",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
  },
  {
    id: "young-designers",
    name: "新一代展",
    title: "新一代展",
    description: "新一代設計展展出作品",
    gradient: "from-amber-400 via-orange-500 to-pink-600",
  },
]

export default function OnlineExhibition() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState(exhibitionAreas[0].id)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentCategoryIndex = exhibitionAreas.findIndex((c) => c.id === activeCategory)
  const currentCategory = exhibitionAreas.find((c) => c.id === activeCategory)

  const handlePrevCategory = () => {
    const newIndex = (currentCategoryIndex - 1 + exhibitionAreas.length) % exhibitionAreas.length
    setActiveCategory(exhibitionAreas[newIndex].id)
  }

  const handleNextCategory = () => {
    const newIndex = (currentCategoryIndex + 1) % exhibitionAreas.length
    setActiveCategory(exhibitionAreas[newIndex].id)
  }

  return (
    <div className="min-h-screen">
      {/* Categories with gradient background */}
      <motion.div className="relative h-[160px]" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 via-[20%] to-white pointer-events-none" />

        <div className="container mx-auto relative z-10 max-w-4xl h-full flex flex-col justify-center -mt-8 p-4 sm:p-8">
          {/* Mobile Category Selector */}
          <div className="flex items-center justify-between gap-4 md:hidden px-4">
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
          <div className="hidden md:flex justify-between items-center w-full max-w-4xl mx-auto">
            {exhibitionAreas.map((area) => (
              <div key={area.id} className="relative px-2">
                <button
                  onClick={() => setActiveCategory(area.id)}
                  className={`w-[200px] px-8 py-3 rounded-full font-semibold transition-all duration-300 text-lg whitespace-nowrap border
                    ${
                      activeCategory === area.id
                        ? "bg-black/20 backdrop-blur-md backdrop-saturate-150 text-white border-white/50"
                        : "bg-black/10 backdrop-blur-md backdrop-saturate-150 text-gray-300 hover:bg-black/15 hover:text-white hover:border-white/40 border-white/30"
                    }`}
                >
                  {area.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Description */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-lg text-gray-800">{currentCategory?.title}系列</p>
            <p className="text-gray-600">{currentCategory?.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Virtual Tour Section */}
      <div className="w-full">
        {isMounted && (
          <div className="aspect-square sm:aspect-[16/9]">
            <iframe
              width="100%"
              height="100%"
              src="https://my.matterport.com/show/?m=Srdq49wjRh4"
              frameBorder="0"
              allowFullScreen
              allow="xr-spatial-tracking"
            ></iframe>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-12 text-center max-w-[1200px]">
        {/* Exhibition Photos */}
        <h2 className="text-lg text-gray-800 text-center mb-6">展場實景</h2>
        <div className="max-w-[800px] mx-auto space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src="/placeholder.svg"
              alt="Exhibition space with yellow clothing display"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src="/placeholder.svg"
              alt="Audio equipment and screens setup"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src="/placeholder.svg"
              alt="Display with hanging items"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>

        {/* Transportation Info */}
        <div className="mt-24">
          <h2 className="text-lg text-gray-800 text-center mb-6">
            交通資訊
          </h2>
          <div className="max-w-[800px] mx-auto space-y-4">
            {/* Google Maps */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.141520037223!2d121.54737687605461!3d25.057171877812776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abfed13d085b%3A0xcf61c7c0870c9b6c!2z5a6c6Ym15aSn5a24!5e0!3m2!1szh-TW!2stw!4v1709697617044!5m2!1szh-TW!2stw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            {/* Transportation Methods */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-base text-gray-800 mb-4">
                  公車 BUS
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>STEP 1</strong> 搭乘274、287至門諾醫院，至大直國小站或捷運大直站下車。
                  </p>
                  <p>
                    <strong>STEP 2</strong> 沿著安泰街行，至實踐路口後右轉，經坦克公園，國防部站抵達，即可抵達展場入口。
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-sm text-white">
                <h3 className="text-base text-white mb-4">
                  捷運 MRT
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>STEP 1</strong> 至捷運大直站，請搭乘「大直站一號出口」出站。
                  </p>
                  <p>
                    <strong>STEP 2</strong> 沿著安泰街行，至實踐路口後右轉，經坦克公園，國防部站抵達，即可抵達展場入口。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

