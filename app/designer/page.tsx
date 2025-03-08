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
  const [showFilter, setShowFilter] = useState(false)
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high' | null>(null)

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
  ).sort((a, b) => {
    if (!sortOrder) return 0;
    
    const getTemperature = (designer: any) => {
      if (!designer.works[0]) return 0;
      switch (designer.works[0].category) {
        case '熱對話': return 80;
        case '溫工藝': return 50;
        case '舒適巢': return 25;
        case '冷火花': return -20;
        default: return 0;
      }
    };

    const tempA = getTemperature(a);
    const tempB = getTemperature(b);

    return sortOrder === 'high-to-low' ? tempB - tempA : tempA - tempB;
  });

  const handleDesignerClick = (designerId: string) => {
    if (window.innerWidth < 640) {
      setActiveDesignerId(activeDesignerId === designerId ? null : designerId)
    }
  }

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterButton = document.getElementById('filter-button');
      const filterMenu = document.getElementById('filter-menu');
      
      if (!filterButton?.contains(event.target as Node) && 
          !filterMenu?.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="mx-auto max-w-[1160px] relative z-[30]">
        <div className="px-8 sm:px-8 md:px-16 lg:px-24 pt-8 pb-20 text-center">
          <motion.div
            key="header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            {/* Search Input and Filter Button */}
            <div className="flex gap-2">
              <div className="relative w-full sm:w-[280px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="搜尋設計師"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 text-sm bg-white"
                />
              </div>
              <div className="relative">
                <button
                  id="filter-button"
                  type="button"
                  onClick={() => setShowFilter(!showFilter)}
                  className={`inline-flex items-center justify-center h-[42px] px-3.5 rounded-2xl border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${showFilter ? 'bg-gray-50' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
            {filteredDesigners.map((designer) => (
              <motion.div
                key={designer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="group"
                onClick={() => {
                  if (window.innerWidth < 640) {
                    handleDesignerClick(designer.id)
                  }
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 640) {
                    setActiveDesignerId(designer.id)
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 640) {
                    setActiveDesignerId(null)
                  }
                }}
              >
                <div className="bg-white transform transition-all duration-300 w-full mx-auto rounded-lg overflow-hidden relative aspect-[3/4]">
                  <Image
                    src={designer.image || "/placeholder.svg?height=600&width=400"}
                    alt={designer.name.zh}
                    fill
                    className="object-cover transition-transform duration-300 sm:group-hover:scale-105"
                  />
                  <div 
                    className={`absolute inset-0 transition-all duration-500 bg-gradient-to-r
                      ${designer.works[0] && designer.works[0].category === '舒適巢' ? 'from-[#8CBB28]/50' : 
                        designer.works[0] && designer.works[0].category === '溫工藝' ? 'from-[#DA6615]/50' :
                        designer.works[0] && designer.works[0].category === '熱對話' ? 'from-[#C3206D]/50' :
                        'from-[#3DB5E9]/50'}
                      ${designer.works[1] ? 
                        designer.works[1].category === '舒適巢' ? 'to-[#8CBB28]/50' : 
                        designer.works[1].category === '溫工藝' ? 'to-[#DA6615]/50' :
                        designer.works[1].category === '熱對話' ? 'to-[#C3206D]/50' :
                        'to-[#3DB5E9]/50'
                        : 
                        designer.works[0].category === '舒適巢' ? 'to-[#8CBB28]/50' : 
                        designer.works[0].category === '溫工藝' ? 'to-[#DA6615]/50' :
                        designer.works[0].category === '熱對話' ? 'to-[#C3206D]/50' :
                        'to-[#3DB5E9]/50'
                      }
                      ${activeDesignerId === designer.id ? 'sm:opacity-100 opacity-100' : 'sm:group-hover:opacity-100 opacity-0'}
                      h-3/4 bottom-0 top-auto [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_10%,black_70%_100%,transparent_100%)]`}
                  />
                  <div className="absolute bottom-4 left-4 right-4 transform">
                    <div className="h-[48px] relative">
                      <div className={`absolute inset-0 ${
                        activeDesignerId === designer.id ? 'sm:opacity-0 opacity-0' : 'sm:group-hover:opacity-0 opacity-100'
                      } flex flex-col justify-center items-center text-white bg-black/15 backdrop-blur-md backdrop-saturate-150 rounded-xl border border-white/30 h-[48px]`}>
                        <h2 className="text-base font-normal leading-none">
                          {designer.name.zh}
                        </h2>
                      </div>
                      <div className={`absolute inset-0 grid grid-cols-2 gap-2 ${
                        activeDesignerId === designer.id ? 'sm:opacity-100 opacity-100' : 'sm:group-hover:opacity-100 opacity-0'
                      }`}>
                        {designer.works[0] && (
                          <Link
                            href={`/work/${designer.works[0].id}?from=designer&id=${designer.id}`}
                            className="flex items-center justify-center h-full px-4 py-2 bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white rounded-xl font-normal text-base transition-[background] duration-300 hover:bg-black/20 border border-white/30"
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
                            className="flex items-center justify-center h-full px-4 py-2 bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white rounded-xl font-normal text-base transition-[background] duration-300 hover:bg-black/20 border border-white/30"
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
        </div>

        <div className="mt-24">
          {/* 畢業班指導老師 Section */}
          <div className="mb-32">
            <div className="relative mb-8 px-8 sm:px-12 md:px-16 lg:px-24">
              <h2 className="text-[#7D7D7D] text-base pb-4 text-left">畢業班指導老師<span className="text-[#9D9D9D] text-xs block sm:inline sm:ml-1">(按姓氏筆畫為序，首位為主導老師)</span></h2>
              <div className="absolute bottom-0 left-8 right-8 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 h-[1px] bg-gradient-to-r from-[#B3346F] via-[#A5297F] to-[#FFFFFF]"></div>
            </div>
            <div className="flex flex-col gap-4">
              {/* First Row */}
              <div className="flex flex-wrap gap-6 px-12 sm:px-8 md:px-16 lg:px-24 lg:min-w-[1200px]">
                {[
                  { name: { zh: "何信坤", en: "Quen Ho" }, img: "/teacher/teacher1.png" },
                  { name: { zh: "丑宛茹", en: "Wan-Ru Chou" }, img: "/teacher/teacher2.png" },
                  { name: { zh: "朱旭正", en: "Hsu-Cheng Chu" }, img: "/teacher/teacher3.png" },
                  { name: { zh: "林曉瑛", en: "Sally Lin" }, img: "/teacher/teacher4.png" },
                  { name: { zh: "孫崇實", en: "Chung-Shih Sun" }, img: "/teacher/teacher9.png" }
                ].map((advisor, index) => (
                  <div key={index} className={`flex items-center gap-4 w-full ${index === 0 ? 'sm:w-[150px]' : 'sm:w-[180px]'}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={advisor.img}
                        alt={`${advisor.name.zh} ${advisor.name.en}`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#9D9D9D] text-sm">{advisor.name.zh}</span>
                      <span className="text-[#9D9D9D] text-sm">{advisor.name.en}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Second Row */}
              <div className="flex flex-wrap gap-6 px-12 sm:px-8 md:px-16 lg:px-24">
                {[
                  { name: { zh: "徐景亭", en: "Gina Hsu" }, img: "/teacher/teacher5.png" },
                  { name: { zh: "陳禧冠", en: "Shi-Kuan Chen" }, img: "/teacher/teacher6.png" },
                  { name: { zh: "宮保睿", en: "Paul Gong" }, img: "/teacher/teacher7.png" },
                  { name: { zh: "曾熙凱", en: "Shi-Kai Tseng" }, img: "/teacher/teacher8.png" }
                ].map((advisor, index) => (
                  <div key={index} className={`flex items-center gap-4 w-full ${index === 0 ? 'sm:w-[150px]' : 'sm:w-[180px]'}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={advisor.img}
                        alt={`${advisor.name.zh} ${advisor.name.en}`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#9D9D9D] text-sm">{advisor.name.zh}</span>
                      <span className="text-[#9D9D9D] text-sm">{advisor.name.en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative px-8 sm:px-12 md:px-16 lg:px-24">
              <h2 className="text-[#7D7D7D] text-base pb-4 text-left">執行團隊</h2>
              <div className="absolute bottom-0 left-8 right-8 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 h-[1px] bg-gradient-to-r from-[#B3346F] via-[#A5297F] to-[#FFFFFF]"></div>
            </div>
          </div>

          <div className="mt-12 flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-16 lg:gap-x-80">
              {/* Column 1: 3 teams */}
              <div className="space-y-6 lg:-ml-0 w-[300px]">
                {/* 總幹事 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">總幹事</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">余美欣</span>
                        <span className="text-[#9D9D9D] text-sm">Mei-Hsin Yu</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">曾柏偉</span>
                        <span className="text-[#9D9D9D] text-sm">Bo-Wei Zeng</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 主視覺設計與執行 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">主視覺設計</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">蔡宜靜</span>
                        <span className="text-[#9D9D9D] text-sm">Yi-Ching Tsai</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">王虹勻</span>
                        <span className="text-[#9D9D9D] text-sm">Hung-Yun Wang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">陳宗楠</span>
                        <span className="text-[#9D9D9D] text-sm">Zong-Nan Chen</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">王可安</span>
                        <span className="text-[#9D9D9D] text-sm">Ko-An Wang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">范頌恩</span>
                        <span className="text-[#9D9D9D] text-sm">Song-En Fan</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">方恩銘</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 畢業專刊設計 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">專刊設計</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">施念真</span>
                        <span className="text-[#9D9D9D] text-sm">Nian-Zhen Shih</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">鄭雅云</span>
                        <span className="text-[#9D9D9D] text-sm">Ya-Yun Cheng</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">丁芷萌</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">李語彤</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">梁丁元</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">趙雅寧</span>
                        <span className="text-[#9D9D9D] text-sm">Ya-Ning Chao</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 2: 2 teams */}
              <div className="space-y-6 lg:-ml-24 w-[300px]">
                {/* 展場布置與設計 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">展場設計</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">許芯瑜</span>
                        <span className="text-[#9D9D9D] text-sm">Kuo-Tsung Chen</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">黃皓予</span>
                        <span className="text-[#9D9D9D] text-sm">Hao-Yu Huang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">成品宜</span>
                        <span className="text-[#9D9D9D] text-sm">Pin-Yi Cheng</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">余宥璋</span>
                        <span className="text-[#9D9D9D] text-sm">You-Zhang Yu</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">林瑜樺</span>
                        <span className="text-[#9D9D9D] text-sm">Lin-Yu-Hua</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">陳竹筠</span>
                        <span className="text-[#9D9D9D] text-sm">Jhu-Yun Chen</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">郭啟恩</span>
                        <span className="text-[#9D9D9D] text-sm">Chi-En Kuo</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">陳詠芯</span>
                        <span className="text-[#9D9D9D] text-sm">Wing-Sum Chan</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">謝宇昕</span>
                        <span className="text-[#9D9D9D] text-sm">Yu-Hsin Hsieh</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">謝函穎</span>
                        <span className="text-[#9D9D9D] text-sm">Han-Ying Hsieh</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">龔佳茵</span>
                        <span className="text-[#9D9D9D] text-sm">Chia-Yin Kung</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 文案撰寫、翻譯與校稿 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">文案編輯</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">林希宸</span>
                        <span className="text-[#9D9D9D] text-sm">Hsi-Chen Lin</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">楊文儀</span>
                        <span className="text-[#9D9D9D] text-sm">Wen-Yi Yang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">何之翔</span>
                        <span className="text-[#9D9D9D] text-sm">Chih-Hsiang Ho</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">陳文龍</span>
                        <span className="text-[#9D9D9D] text-sm">Chan Man Lung</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">劉睿珊</span>
                        <span className="text-[#9D9D9D] text-sm">Ruei-Shan Liu</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 3: 4 teams */}
              <div className="space-y-6 w-[300px] lg:translate-x-[-11rem]">
                {/* 公關活動企劃與執行 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">公關企劃</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">蔡幸奴</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">陳育楷</span>
                        <span className="text-[#9D9D9D] text-sm">Yu-Kai Chen</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">王闐蒙</span>
                        <span className="text-[#9D9D9D] text-sm">Ta-Meng Wang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">方怡文</span>
                        <span className="text-[#9D9D9D] text-sm">Yi-Wen Fang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">夏禹璐</span>
                        <span className="text-[#9D9D9D] text-sm">Yu-Lu Xia</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">蕭卉芯</span>
                        <span className="text-[#9D9D9D] text-sm">Hui-Hsin Shaw</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">蘇瑾萱</span>
                        <span className="text-[#9D9D9D] text-sm">Chin-Hsuan Su</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 攝影與影像紀錄 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">攝影紀錄</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">林芸秀</span>
                        <span className="text-[#9D9D9D] text-sm">Yun-Shiu Lin</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">許哲嘉</span>
                        <span className="text-[#9D9D9D] text-sm">Che-Chia Hsu</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">郭宗成</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">張哲維</span>
                        <span className="text-[#9D9D9D] text-sm">Zhe-Wei Zhang</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">謝秉良</span>
                        <span className="text-[#9D9D9D] text-sm">Bing-Laing Shie</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 網站設計與規劃 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm break-keep whitespace-pre-line leading-5">網站設計</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">戴抒瑜</span>
                        <span className="text-[#9D9D9D] text-sm">Shu-Yu Tai</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">葉芯妤</span>
                        <span className="text-[#9D9D9D] text-sm">Xin-Yu Ye</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">林冠宇</span>
                        <span className="text-[#9D9D9D] text-sm">Kuan-Yu Lin</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">林峻維</span>
                        <span className="text-[#9D9D9D] text-sm">Chun-Wei Lin</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 總務 */}
                <div className="pb-6 border-b border-dashed border-[#9D9D9D]/50">
                  <div className="flex">
                    <h3 className="text-[#7D7D7D] w-28 flex-shrink-0 text-left text-sm">總務</h3>
                    <ul className="space-y-2 min-w-[200px]">
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">陳胤羽</span>
                        <span className="text-[#9D9D9D] text-sm">Yin-Yu Chen</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-[#9D9D9D] text-sm">魏丹葳</span>
                        <span className="text-[#9D9D9D] text-sm">Dan-Wei Wei</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[20]">
        {filteredDesigners.map((designer) => (
          <div key={designer.id}>
            {/* Left background image */}
            <img 
              src={`/reserve/${
                designer.works[0]?.category === '冷火花' ? 'reserve_bg_1.png' :
                designer.works[0]?.category === '熱對話' ? 'reserve_bg_2.png' :
                designer.works[0]?.category === '舒適巢' ? 'reserve_bg_3.png' :
                'reserve_bg_4.png'
              }`}
              alt=""
              className={`bg-image-container bg-image-left transition-opacity duration-500 animate-slow-spin-reverse ${
                activeDesignerId === designer.id ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Right background image */}
            <img 
              src={`/reserve/${
                designer.works[1]?.category === '冷火花' ? 'reserve_bg_1.png' :
                designer.works[1]?.category === '熱對話' ? 'reserve_bg_2.png' :
                designer.works[1]?.category === '舒適巢' ? 'reserve_bg_3.png' :
                'reserve_bg_4.png'
              }`}
              alt=""
              className={`bg-image-container bg-image-right transition-opacity duration-500 animate-slow-spin ${
                activeDesignerId === designer.id ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ))}
        {/* Default background images when no designer is selected */}
        <img 
          src="/reserve/reserve_bg_1.png" 
          alt="" 
          className={`bg-image-container bg-image-left transition-opacity duration-500 animate-slow-spin-reverse ${
            activeDesignerId ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img 
          src="/reserve/reserve_bg_2.png" 
          alt="" 
          className={`bg-image-container bg-image-right transition-opacity duration-500 animate-slow-spin ${
            activeDesignerId ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  )
}

