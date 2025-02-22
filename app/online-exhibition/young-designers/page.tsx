"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function YoungDesignersExhibition() {
  return (
    <div className="min-h-screen pb-24 relative bg-gray-50">
      {/* Hero Section with Gradient and Image */}
      <div className="relative h-[40vh] sm:h-[50vh] bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/young.png"
            alt="Young Designers Exhibition"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        
        {/* Gradient bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 z-20" style={{
          background: 'linear-gradient(90deg, #D25B83 0%, #D8D82C 20%, #71AE2D 40%, #5BADB7 60%, #60B2CF 80%, #FFFFFF 100%)'
        }} />
        
        {/* Content */}
        <div className="relative z-20 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white absolute bottom-6 sm:bottom-16 px-4 md:px-8 lg:px-16 w-full"
          >
            <div className="max-w-[1280px] mx-auto">
              <h1 className="text-[22px] sm:text-[36px] font-semibold mb-1 sm:mb-2 text-center sm:text-left">
                新一代展區 YODEX, Taiwan
              </h1>
              <p className="text-[14px] sm:text-[18px] opacity-90 sm:opacity-100 text-center sm:text-left">2025 新一代設計展展出作品</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 md:px-8 lg:px-16 py-6 sm:py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left Column - Exhibition Details */}
            <div className="w-full md:w-[350px] flex-shrink-0">
              <div className="max-w-[280px] mx-auto sm:max-w-none bg-white/50 rounded-lg p-4 sm:p-0 sm:bg-transparent">
                <div className="space-y-4 sm:space-y-0">
                  <div className="sm:pb-2">
                    <div className="flex items-center">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">日期</h3>
                      <p className="text-[#9D9D9D] text-[13px] sm:text-sm">2023.05.19 - 2023.05.22</p>
                    </div>
                  </div>
                  <div className="sm:pb-2">
                    <div className="flex items-center">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">時間</h3>
                      <p className="text-[#9D9D9D] text-[13px] sm:text-sm">10:00 ～ 17:00</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">地點</h3>
                      <div className="text-[#9D9D9D] text-[13px] sm:text-sm">
                        <span className="block sm:inline">南港展覽館2館1樓</span>
                        <span className="block text-[#9D9D9D]/80 mt-0.5 sm:mt-0 sm:inline sm:before:content-['_']">（A-24展區）</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px border-l border-dashed border-[#9D9D9D]/50"></div>

            {/* Right Column - Description */}
            <div className="flex-1 md:pl-8">
              <p className="text-[#9D9D9D] text-[13px] sm:text-sm leading-[1.8] sm:leading-relaxed text-center sm:text-left">
                「新一代設計展」是全世界以學生為主最大型之設計展覽，自1981年開辦，是設計新秀展現創意的最佳平台，是協助企業及設計公司發掘優秀設計人才的專業平台。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="px-4 md:px-8 lg:px-16 py-6 sm:py-16">
        <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-16">
          {/* First Image Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Left image description"
                  fill
                  className="object-cover rounded-none sm:rounded-xl"
                />
              </div>
              <p className="text-[13px] sm:text-sm text-[#9D9D9D] leading-relaxed">
                【左】圖片說明文字
              </p>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Right image description"
                  fill
                  className="object-cover rounded-none sm:rounded-xl"
                />
              </div>
              <p className="text-[13px] sm:text-sm text-[#9D9D9D] leading-relaxed">
                【右】圖片說明文字
              </p>
            </div>
          </div>

          {/* Second Image Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Left image description"
                  fill
                  className="object-cover rounded-none sm:rounded-xl"
                />
              </div>
              <p className="text-[13px] sm:text-sm text-[#9D9D9D] leading-relaxed">
                【左】圖片說明文字
              </p>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Right image description"
                  fill
                  className="object-cover rounded-none sm:rounded-xl"
                />
              </div>
              <p className="text-[13px] sm:text-sm text-[#9D9D9D] leading-relaxed">
                【右】圖片說明文字
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 