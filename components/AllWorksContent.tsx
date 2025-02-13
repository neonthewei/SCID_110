"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  {
    id: "comfort-nest",
    name: "舒適巢",
    title: "舒適巢",
    description: "打造溫馨舒適的生活空間",
    gradient: "from-amber-300 via-green-400 via-[15%] to-sky-300 to-[85%]",
  },
  {
    id: "warm-craft",
    name: "溫工藝",
    title: "溫工藝",
    description: "傳統工藝與現代設計的完美融合",
    gradient: "from-orange-400 via-yellow-300 via-green-400 via-blue-400 via-purple-400 via-pink-400 to-white",
  },
  {
    id: "hot-dialogue",
    name: "熱對話",
    title: "熱對話",
    description: "促進深度交流與互動",
    gradient: "from-orange-500 via-green-400 via-[20%] to-purple-600",
  },
  {
    id: "cold-spark",
    name: "冷火花",
    title: "冷火花",
    description: "激發創新思維的火花",
    gradient: "from-blue-300 to-blue-600 bg-[length:100%_100%]",
  },
]

const worksByCategory = {
  "warm-craft": [
    {
      id: "warm-craft-1",
      title: "重｜花 re:cHUĀn",
      subtitle: "單元編織系列燈具",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-2", title: "Nukumo", subtitle: "布料工藝燈具", image: "/placeholder.svg?height=300&width=300" },
    { id: "warm-craft-3", title: "磚專", subtitle: "複合媒材花磚家具", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-4",
      title: "MeWeve",
      subtitle: "不鏽鋼編織傢俱系列",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-5", title: "陸分", subtitle: "鋼筋&水泥家具", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-6",
      title: "「脂·美」",
      subtitle: "「脂·美」 系列家具",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-7", title: "Loopa", subtitle: "絲瓜洛塑型實驗", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-8",
      title: "Dim Series - Furniture",
      subtitle: "陰翳禮讚家具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "warm-craft-9",
      title: "幸 · 祈福包",
      subtitle: "中國結編織包",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-10", title: "MUFFA-tata", subtitle: "模具椅子", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-11",
      title: "織｜支 METO⌢l",
      subtitle: "金屬應用編織椅具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "warm-craft-12",
      title: "Appendage",
      subtitle: "器物/人/符號",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-13", title: "Atmos", subtitle: "水泥擴香氣氛燈", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-14",
      title: "浮花·嶺フワリ-ン",
      subtitle: "傳統壓花壁燈",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-15", title: "植磚觀", subtitle: "植草磚燈具組", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-16",
      title: "「脊·光」",
      subtitle: "「脊·光」 系列燈具",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "warm-craft-17", title: "茄芷", subtitle: "編織燈具", image: "/placeholder.svg?height=300&width=300" },
    { id: "warm-craft-18", title: "熔塑", subtitle: "熔接塑形家具", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "warm-craft-19",
      title: "Dim Series - Vase",
      subtitle: "陰翳禮讚花器",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "warm-craft-20",
      title: "Light and Shadow",
      subtitle: "光影燈具",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
  "comfort-nest": [
    {
      id: "comfort-nest-1",
      title: "Rolling Rescue",
      subtitle: "兒童手眼平衡遊戲",
      image: "/Group 1410123261.png",
    },
    {
      id: "comfort-nest-2",
      title: "UUUstool",
      subtitle: "羊毛氈凳子組",
      image: "/Mask group.png",
    },
    {
      id: "comfort-nest-3",
      title: "FUROSHIKI+",
      subtitle: "風呂敷式筆電保護包",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-4",
      title: "過伍關展陸樣",
      subtitle: "家庭互動大富翁",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "comfort-nest-5", title: "Petalori", subtitle: "花瓣椅子", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "comfort-nest-6",
      title: "Furry Greenie",
      subtitle: "自然主題單人沙發椅",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-7",
      title: "Tippy",
      subtitle: "兒童兩用蹺蹺椅",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-8",
      title: "自由界線-屏風",
      subtitle: "辦公家具",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "comfort-nest-9", title: "Undula", subtitle: "", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "comfort-nest-10",
      title: "Dotties",
      subtitle: "繪本互動音樂玩具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-11",
      title: "GlowAxis",
      subtitle: "模組化燈具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-12",
      title: "WWgloow",
      subtitle: "吊燈組/磁吸壁燈組",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-13",
      title: "Puzzy Animal",
      subtitle: "AI兒童動物積木拼圖",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-14",
      title: "Greenery",
      subtitle: "自然主題落地燈具組",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-15",
      title: "Perforated Glow",
      subtitle: "沖孔造型燈具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-16",
      title: "自由界線-桌子",
      subtitle: "辦公家具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-17",
      title: "NEO TERRA",
      subtitle: "自動化盆栽",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-18",
      title: "MASSAGE BENCH",
      subtitle: "雙人公園按摩椅",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-19",
      title: "都市觀察計畫＿工地",
      subtitle: "家具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "comfort-nest-20",
      title: "MUFFA-specchio",
      subtitle: "折板桌燈花器",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
  "cold-spark": [
    {
      id: "cold-spark-1",
      title: "Dynamic Joinery Luminaries",
      subtitle: "活動式榫接燈具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-2",
      title: "Petro",
      subtitle: "城市共行寵物載具",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "cold-spark-3", title: "MOTOLIFT", subtitle: "都市跑旅", image: "/placeholder.svg?height=300&width=300" },
    { id: "cold-spark-4", title: "FlexiGo", subtitle: "輕型移動載具", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "cold-spark-5",
      title: "S-Track",
      subtitle: "折疊式沙灘急救擔架",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-6",
      title: "GENESIS",
      subtitle: "年長者電輔三輪車",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-7",
      title: "DUALCON",
      subtitle: "雙模式年長代步車",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-8",
      title: "TerraAura",
      subtitle: "新型態微型電動中耕機",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-9",
      title: "NODE-Bike Helmet Sharing System",
      subtitle: "共享單車安全帽系統",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-10",
      title: "Charybdis",
      subtitle: "海洋垃圾收集器",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-11",
      title: "Compact Furniture Set",
      subtitle: "小宅居家悠閒家具組",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "cold-spark-12", title: "City Modus", subtitle: "可拆鞋", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "cold-spark-13",
      title: "RespiAid",
      subtitle: "自動救援裝置",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-14",
      title: "Kneadfit",
      subtitle: "上肢訓練器材",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-15",
      title: "SHIFF",
      subtitle: "玩轉版型冬季慢跑披風",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "cold-spark-16", title: "Augeas", subtitle: "回收材淨灘組", image: "/placeholder.svg?height=300&width=300" },
    { id: "cold-spark-17", title: "TwinAxis", subtitle: "雙軸穩定器", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "cold-spark-18",
      title: "Floaty fish",
      subtitle: "兒童救生泳衣",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-19",
      title: "EasySmile",
      subtitle: "牙科外出診療工具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "cold-spark-20",
      title: "RYOMIX",
      subtitle: "高斯波濺掃描器",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
  "hot-dialogue": [
    {
      id: "hot-dialogue-1",
      title: "COLONO",
      subtitle: "顏色音樂軌道車車",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-2",
      title: "鏈結",
      subtitle: "可調節社交距離公共家具",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-3",
      title: "社交光鐘 Social Time",
      subtitle: "未來社交健康維持家飾",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "hot-dialogue-4", title: "澡享", subtitle: "洗澡玩具", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "hot-dialogue-5",
      title: "Zooly",
      subtitle: "AI兒童環保遊樂組",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-6",
      title: "QD Head Armor",
      subtitle: "快速部署安全頭盔",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-7",
      title: "TwinAxis Cam",
      subtitle: "可拆握把相機",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-8",
      title: "Perpluvia",
      subtitle: "都市快穿雨衣",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-9",
      title: "LuminAX",
      subtitle: "居家拳擊器材解構",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-10",
      title: "Dadan!",
      subtitle: "AI生圖加速攝影溝通流程",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-11",
      title: "BEAT BUDDIES",
      subtitle: "AI兒童音樂創作機",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-12",
      title: "Avocet-Redwing",
      subtitle: "雙型態靜音吉他",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-13",
      title: "漣音",
      subtitle: "指向性居家喇叭",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-14",
      title: "BandSync",
      subtitle: "樂團模擬合成器",
      image: "/placeholder.svg?height=300&width=300",
    },
    { id: "hot-dialogue-15", title: "拍拍拍", subtitle: "兒童紀錄器", image: "/placeholder.svg?height=300&width=300" },
    {
      id: "hot-dialogue-16",
      title: "Ding! Adventure Pack",
      subtitle: "兒童探索背包",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-17",
      title: "Skin and bone",
      subtitle: "皮與骨",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-18",
      title: "Dorma舒緩星球",
      subtitle: "筋膜按摩器具套組",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hot-dialogue-19",
      title: "Gaji bag",
      subtitle: "茄芷新印象",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
}

export default function AllWorksContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || categories[0].id)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const lastScrollY = useRef(0)

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
    const currentWorks = worksByCategory[activeCategory as keyof typeof worksByCategory]
    if (currentWorks && currentWorks.length > 0) {
      setActiveItemId(currentWorks[0].id)
    }
  }, [activeCategory])

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
            const currentWorks = worksByCategory[activeCategory as keyof typeof worksByCategory]
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
  }, [activeCategory, activeItemId, scrollDirection])

  const currentCategoryIndex = categories.findIndex((c) => c.id === activeCategory)
  const currentCategory = categories.find((c) => c.id === activeCategory)

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
            {categories.map((category) => (
              <div key={category.id} className="relative px-2">
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-[200px] px-8 py-3 rounded-full font-semibold transition-all duration-300 text-lg whitespace-nowrap border
                    ${
                      activeCategory === category.id
                        ? "bg-black/20 backdrop-blur-md backdrop-saturate-150 text-white border-white/50"
                        : "bg-black/10 backdrop-blur-md backdrop-saturate-150 text-gray-300 hover:bg-black/15 hover:text-white hover:border-white/40 border-white/30"
                    }`}
                >
                  {category.name}
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

      {/* Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-8 px-4 sm:px-8 md:px-12 pb-12 sm:pb-16">
        <AnimatePresence mode="wait">
          {worksByCategory[activeCategory as keyof typeof worksByCategory].map((work: { id: string; title: string; subtitle: string; image: string }, index: number) => (
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
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
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
                    activeCategory === 'comfort-nest' ? 'from-emerald-200/90 to-transparent' :
                    activeCategory === 'warm-craft' ? 'from-amber-200/90 to-transparent' :
                    activeCategory === 'hot-dialogue' ? 'from-rose-200/90 to-transparent' :
                    'from-blue-200/90 to-transparent'
                  }`} />
                  
                  <div className={`relative w-full px-4 pt-12 pb-3 md:px-4 md:pt-12 md:pb-3 md:flex md:flex-col md:items-start transition-transform duration-300 
                    ${activeItemId === work.id ? 'translate-y-0' : 'translate-y-4'} 
                    md:group-hover:translate-y-0`}>
                    <div className={`w-full md:px-4 bg-black/20 backdrop-blur-[8px] backdrop-saturate-150 rounded-xl px-3 py-2 border border-white/30 
                      ${activeItemId === work.id ? 'opacity-100 md:opacity-0' : 'opacity-0'} 
                      md:group-hover:opacity-100`}>
                      <p className="text-lg font-semibold leading-tight text-center text-white">
                        {work.title}
                      </p>
                      {work.subtitle && (
                        <p className="text-white/80 text-sm leading-tight text-center">
                          {work.subtitle}
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

