"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ShihChienExhibition() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "o" || event.key === "O") {
        setShowContent((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen pb-24 relative bg-gray-50">
      {/* Hero Section with Gradient and Image */}
      <div className="relative h-[40vh] sm:h-[50vh] bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Shih.png"
            alt="Shih Chien Exhibition"
            fill
            className="object-cover"
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
                實踐展區 Shih Chien, Taipei
              </h1>
              <p className="text-[14px] sm:text-[18px] opacity-90 sm:opacity-100 text-center sm:text-left">
                2025 實踐大學工業產品設計學系畢業展
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
                        2025.4.24 - 5.7 / 2025.5.14 - 5.18
                      </p>
                    </div>
                  </div>
                  <div className="sm:pb-2">
                    <div className="flex items-center">
                      <h3 className="text-[#7D7D7D] w-[64px] sm:w-16 flex-shrink-0 text-left text-[13px] sm:text-sm font-medium">
                        時間
                      </h3>
                      <p className="text-[#9D9D9D] text-[13px] sm:text-sm">
                        10:00 ～ 17:00
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
                          實踐大學 台北校區M棟B1
                        </span>
                        <span className="block text-[#9D9D9D]/80 mt-0.5 sm:mt-0 sm:inline sm:before:content-['_']">
                          （崇實路入口）
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
                實踐大學設計學院畢業展，展現新一代設計師的創意與實力，
                融合傳統工藝與現代設計思維，打造獨特的設計視覺饗宴。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Information Section */}
      <div className="px-2 md:px-6 lg:px-32 py-6 sm:py-16">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-lg sm:text-2xl font-bold text-[#7D7D7D] mb-6 sm:mb-8">
            交通資訊
          </h2>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Left Column - Transportation Details */}
            <div className="w-full md:w-[40%]">
              <div className="space-y-4 max-w-[420px]">
                {/* MRT Information */}
                <div className="bg-white rounded-[16px] p-7">
                  <h3 className="font-semibold text-[20px] mb-4">捷運</h3>
                  <p className="text-[#666] text-[15px] leading-relaxed">
                    搭乘捷運建議於
                    <span className="text-[#D25B83] font-medium">
                      「大直站－1號出口」
                    </span>
                    出站。
                    <br />
                    步行方式請參照右圖。
                  </p>
                </div>

                {/* Bus Information */}
                <div className="bg-white rounded-[16px] p-7">
                  <h3 className="font-semibold text-[20px] mb-4">公車</h3>
                  <p className="text-[#666] text-[15px] leading-relaxed">
                    搭乘{" "}
                    <span className="text-[#D25B83] font-medium">247、287</span>{" "}
                    或內湖幹線，至
                    <span className="text-[#D25B83] font-medium">
                      「大直國小站」
                    </span>
                    或
                    <span className="text-[#D25B83] font-medium">
                      「捷運大直站」
                    </span>
                    下車。
                  </p>
                </div>

                {/* Google Maps Button */}
                <Link
                  href="https://maps.google.com/?q=實踐大學台北校區"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                >
                  <button className="w-full bg-black hover:bg-gray-900 text-white py-3 px-6 rounded-[16px] transition duration-300 flex items-center justify-center">
                    <span className="mr-2">前往Google 地圖</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Map Image */}
            <div className="w-full md:w-[60%] mt-6 md:mt-0 md:flex md:items-start">
              <div className="relative aspect-[4/3] w-full md:-mt-8">
                <Image
                  src="/地圖 RGB.png"
                  alt="Transportation Map to Exhibition"
                  fill
                  className="object-contain rounded-none sm:rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Virtual Tour Section */}
      {showContent && (
        <div className="px-2 md:px-6 lg:px-32 py-6 sm:py-16">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-lg sm:text-2xl font-bold text-[#7D7D7D] mb-6 sm:mb-8">
              3D 虛擬展場
            </h2>
            <div className="relative aspect-[16/9] w-full">
              <iframe
                src="https://my.matterport.com/show/?m=Srdq49wjRh4"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0 rounded-none sm:rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Grid Section */}
      {showContent && (
        <div className="px-2 md:px-6 lg:px-32 py-6 sm:py-16">
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
      )}
    </div>
  );
}
