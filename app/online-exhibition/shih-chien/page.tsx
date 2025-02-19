"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ShihChienExhibition() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient and Image */}
      <div className="relative h-[50vh] bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg"
            alt="Shih Chien Exhibition"
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
            className="text-white absolute bottom-16 left-28"
          >
            <h1 className="text-[36px] font-semibold mb-2">
              實踐展區 Shih Chien, Taipei
            </h1>
            <p className="text-[18px]">2025 實踐大學工業產品設計學系畢業展</p>
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Left Column - Exhibition Details */}
            <div className="w-[350px] flex-shrink-0">
              <div className="pb-2">
                <div className="flex">
                  <h3 className="text-[#7D7D7D] w-16 flex-shrink-0 text-left text-sm">日期</h3>
                  <p className="text-[#9D9D9D] text-sm">2025.04.24 - 2025.05.07</p>
                </div>
              </div>
              <div className="pb-2">
                <div className="flex">
                  <h3 className="text-[#7D7D7D] w-16 flex-shrink-0 text-left text-sm">時間</h3>
                  <p className="text-[#9D9D9D] text-sm">10:00 ～ 17:00</p>
                </div>
              </div>
              <div>
                <div className="flex">
                  <h3 className="text-[#7D7D7D] w-16 flex-shrink-0 text-left text-sm">地點</h3>
                  <p className="text-[#9D9D9D] text-sm">實踐大學 台北校區M棟B1（崇實路入口）</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px border-l border-dashed border-[#9D9D9D]/50"></div>

            {/* Right Column - Description */}
            <div className="flex-1 pl-8">
              <p className="text-[#9D9D9D] text-sm leading-relaxed">
                實踐大學設計學院畢業展，展現新一代設計師的創意與實力，
                融合傳統工藝與現代設計思維，打造獨特的設計視覺饗宴。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Virtual Tour Section */}
      <div className="container mx-auto px-4 py-16 border-t border-[#9D9D9D]/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#7D7D7D] mb-8">3D 虛擬展場</h2>
          <div className="relative aspect-[16/9] w-full">
            <iframe
              src="https://my.matterport.com/show/?m=Srdq49wjRh4"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* First Image Group */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Left image description"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-[#9D9D9D] leading-relaxed">
                【左】圖片說明文字
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Right image description"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-[#9D9D9D] leading-relaxed">
                【右】圖片說明文字
              </p>
            </div>
          </div>

          {/* Second Image Group */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Left image description"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-[#9D9D9D] leading-relaxed">
                【左】圖片說明文字
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Right image description"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-[#9D9D9D] leading-relaxed">
                【右】圖片說明文字
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 