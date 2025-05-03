"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MilanExhibition() {
  return (
    <div className="min-h-screen pb-24 relative bg-white">
      {/* Hero Section with Gradient and Image */}
      <div className="relative w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
        {/* Background Image */}
        <div className="relative w-full z-0">
          <Image
            src="/milan.jpg"
            alt="Milan Exhibition"
            layout="responsive"
            width={1440}
            height={404}
            className="object-contain"
            priority
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

        {/* Gradient bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 z-20"
          style={{
            background:
              "linear-gradient(90deg, #D25B83 0%, #D8D82C 20%, #71AE2D 40%, #5BADB7 60%, #60B2CF 80%, #FFFFFF 100%)",
          }}
        />

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
                米蘭展區 Milano, Italy
              </h1>
              <p className="text-[14px] sm:text-[18px] opacity-90 sm:opacity-100 text-center sm:text-left">
                2025 米蘭設計週展出作品
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-2 md:px-6 lg:px-32 py-6 sm:py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left Column - Exhibition Details */}
            <div className="w-full md:w-[350px] flex-shrink-0">
              <div className="max-w-[280px] mx-auto sm:max-w-none bg-white/50 rounded-lg p-4 sm:p-0 sm:bg-transparent">
                <div className="space-y-4 sm:space-y-0">
                  <div className="sm:pb-2">
                    <div className="flex items-center">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">
                        日期
                      </h3>
                      <p className="text-[#9D9D9D] text-[13px] sm:text-sm">
                        2025.04.08-2025.04.13
                      </p>
                    </div>
                  </div>
                  <div className="sm:pb-2">
                    <div className="flex items-center">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">
                        時間
                      </h3>
                      <p className="text-[#9D9D9D] text-[13px] sm:text-sm">
                        13:30-16:00
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">
                        地點
                      </h3>
                      <div className="text-[#9D9D9D] text-[13px] sm:text-sm">
                        <span className="block sm:inline">
                          Via Marco Aurelio
                        </span>
                        <span className="block text-[#9D9D9D]/80 mt-0.5 sm:mt-0 sm:inline sm:before:content-['_']">
                          （20127 Milano Mi, Italy）
                        </span>
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
                Home is not merely a place of shelter baut an ongoing action. It
                shifts with the movement of our footsteps, grows with the
                passage of light and shadow, and extends through the
                interweaving of perception. Home is not a static structure but a
                way of interacting with the world - an ever-unfolding journey
                through time and space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="px-2 md:px-6 lg:px-32 py-6 sm:py-16">
        <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-64">
          {/* 主內容加上左右間距 */}
          <div className="space-y-12">
            {/* 第一行：左圖右文 */}
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-0">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[12/7] w-full">
                  <Image
                    src="/milan/AA2D6087-1604-4F48-93A1-4CA7083861A2.jpg"
                    alt="展品照1"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <div className="text-[#7D7D7D] text-[15px] leading-relaxed">
                  實踐工設將透過作品呈現學生對於材質應用、工藝美學與設計思維的深度探索，並展現如何將傳統技藝與前瞻性設計概念相融合，以回應全球當代社會的需求與未來挑戰。
                </div>
              </div>
            </div>
            {/* 第二行：左圖右文 */}
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-0">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[12/7] w-full">
                  <Image
                    src="/milan/DSC_2929.jpg"
                    alt="展品照2"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <div className="text-[#7D7D7D] text-[15px] leading-relaxed">
                  在台灣，設計承載著土地的記憶與未來的想像，遊走於傳統與創新之間，回應著環境、材料與人的動態關係。我們以在地文化為根基，探尋家的可能性——它如何適應、如何變形、如何回應行為與感知，在日常的細微處展現無限的流動性。
                </div>
              </div>
            </div>
          </div>

          {/* 其餘圖片區塊... */}
          <div className="space-y-12">
            {/* 第四行：兩張橫向排列 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
              <div className="relative aspect-[12/7] w-full">
                <Image
                  src="/milan/DSC_2905.jpg"
                  alt="室內互動照1"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative aspect-[12/7] w-full">
                <Image
                  src="/milan/IMG_2099.jpg"
                  alt="室內互動照2"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            {/* 第五行：三張橫向排列（固定高度 350px） */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 items-stretch">
              {/* 左邊：展品細節1 */}
              <div className="relative h-[350px] w-full sm:col-span-1">
                <Image
                  src="/milan/DSC_1854.jpg"
                  alt="展品細節1"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {/* 中間：展品細節3（寬度加大 col-span-2） */}
              <div className="relative h-[350px] w-full sm:col-span-2">
                <Image
                  src="/milan/777C7205-251D-4851-BF64-91D6B7C72EFF.jpg"
                  alt="展品細節3"
                  fill
                  className="object-cover rounded-lg"
                  style={{ objectPosition: "center" }}
                />
              </div>
              {/* 右邊：展品細節2 */}
              <div className="relative h-[350px] w-full sm:col-span-1">
                <Image
                  src="/milan/7297BB0D-0627-4D33-836B-556B3E6B4288.jpg"
                  alt="展品細節2"
                  fill
                  className="object-cover rounded-lg"
                  style={{ objectPosition: "20% 50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
