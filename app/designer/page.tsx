"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { designers } from "@/data/designers"

// 定義漸層顏色組合
const gradients = [
  'from-purple-400 to-pink-400',
  'from-teal-400 to-blue-400',
  'from-orange-400 to-red-400',
  'from-green-400 to-teal-400',
]

export default function DesignerPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDesignerId, setActiveDesignerId] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setShowHint(false)
    }, 2000) // 2 秒後消失

    return () => clearTimeout(timer)
  }, [])

  const filteredDesigners = designers.filter(designer => 
    designer.name.zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
    designer.name.pinyin.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDesignerClick = (designerId: string) => {
    setActiveDesignerId(activeDesignerId === designerId ? null : designerId)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 pt-8 pb-20 text-center max-w-[1200px]">
        <motion.div
          key="header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="搜尋設計師"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300 text-sm"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredDesigners.map((designer) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group"
              onClick={() => {
                // 只在移動版（sm 以下）才觸發點擊效果
                if (window.innerWidth < 640) {
                  handleDesignerClick(designer.id)
                }
              }}
            >
              <div className="bg-white transform transition-all duration-300 w-full mx-auto rounded-2xl overflow-hidden relative aspect-[3/4]">
                <Image
                  src={designer.image || "/placeholder.svg?height=600&width=400"}
                  alt={designer.name.zh}
                  fill
                  className="object-cover transition-transform duration-300 sm:group-hover:scale-105"
                />
                <div 
                  className={`absolute inset-0 transition-all duration-500 delay-100 bg-gradient-to-r
                    ${designer.works[0] && designer.works[0].category === '舒適巢' ? 'from-[#8CBB28]/70' : 
                      designer.works[0] && designer.works[0].category === '溫工藝' ? 'from-[#DA6615]/70' :
                      designer.works[0] && designer.works[0].category === '熱對話' ? 'from-[#C3206D]/70' :
                      'from-[#3DB5E9]/70'}
                    ${designer.works[1] ? 
                      designer.works[1].category === '舒適巢' ? 'to-[#8CBB28]/70' : 
                      designer.works[1].category === '溫工藝' ? 'to-[#DA6615]/70' :
                      designer.works[1].category === '熱對話' ? 'to-[#C3206D]/70' :
                      'to-[#3DB5E9]/70'
                      : 
                      designer.works[0].category === '舒適巢' ? 'to-[#8CBB28]/70' : 
                      designer.works[0].category === '溫工藝' ? 'to-[#DA6615]/70' :
                      designer.works[0].category === '熱對話' ? 'to-[#C3206D]/70' :
                      'to-[#3DB5E9]/70'
                    }
                    ${activeDesignerId === designer.id ? 'sm:opacity-100 opacity-100' : 'sm:group-hover:opacity-100 opacity-0'}
                    h-3/4 bottom-0 top-auto [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_10%,black_70%_100%,transparent_100%)]`}
                />
                <div className="absolute bottom-4 left-4 right-4 transform">
                  <div className="h-[48px] relative">
                    <div className={`absolute inset-0 ${
                      activeDesignerId === designer.id ? 'sm:opacity-0 opacity-0' : 'sm:group-hover:opacity-0 opacity-100'
                    } flex flex-col justify-center items-center text-white bg-black/15 backdrop-blur-md backdrop-saturate-150 rounded-xl border border-white/30 transition-all duration-500 ease-in-out`}>
                      <h2 className="text-base font-bold leading-none">
                        {designer.name.zh}
                      </h2>
                    </div>
                    <div className={`absolute inset-0 grid grid-cols-2 gap-2 ${
                      activeDesignerId === designer.id ? 'sm:opacity-100 opacity-100' : 'sm:group-hover:opacity-100 opacity-0'
                    } transition-all duration-500 ease-in-out transform ${
                      activeDesignerId === designer.id ? 'sm:translate-y-0 translate-y-0' : 'sm:group-hover:translate-y-0 translate-y-2'
                    }`}>
                      {designer.works[0] && (
                        <Link
                          href={`/work/${designer.works[0].id}?from=designer&id=${designer.id}`}
                          className="flex items-center justify-center h-full px-4 py-2 bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white rounded-xl font-medium text-base transform transition-all duration-300 hover:bg-black/20 border border-white/30"
                        >
                          {designer.works[0].category === "舒適巢" && "25°S"}
                          {designer.works[0].category === "溫工藝" && "50°S"}
                          {designer.works[0].category === "熱對話" && "80°S"}
                          {designer.works[0].category === "冷火花" && "-20°S"}
                        </Link>
                      )}
                      {designer.works[1] && (
                        <Link
                          href={`/work/${designer.works[1].id}?from=designer&id=${designer.id}`}
                          className="flex items-center justify-center h-full px-4 py-2 bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white rounded-xl font-medium text-base transform transition-all duration-300 hover:bg-black/20 border border-white/30"
                        >
                          {designer.works[1].category === "舒適巢" && "25°S"}
                          {designer.works[1].category === "溫工藝" && "50°S"}
                          {designer.works[1].category === "熱對話" && "80°S"}
                          {designer.works[1].category === "冷火花" && "-20°S"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showHint ? 1 : 0, y: showHint ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 inset-x-0 z-50"
        >
          <div className="w-fit mx-auto px-6 py-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <p className="text-sm text-white/90 flex items-center justify-center gap-2 whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              <span className="flex-shrink-0">點擊設計師查看他/她作品</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

