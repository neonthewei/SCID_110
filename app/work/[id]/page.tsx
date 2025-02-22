"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getWorkById, getDesignerByWorkId, getAllWorks, type Work } from "@/data/designers"

export default function WorkDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromDesigner = searchParams.get('from') === 'designer'
  const designerId = searchParams.get('id')
  const work = getWorkById(params.id)
  const designer = work ? getDesignerByWorkId(params.id) : undefined

  if (!work || !designer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">找不到作品</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-100">
        <Image 
          src={work.images.main} 
          alt={work.title.main} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0">
          <div className="container mx-auto px-4 py-6">
            <button
              onClick={() => fromDesigner ? router.push(`/designer`) : router.back()}
              className="flex items-center text-white hover:text-gray-200 transition-colors duration-200 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full"
            >
              <ArrowLeft className="mr-2" size={20} />
              {fromDesigner ? '返回設計師' : '返回作品總覽'}
            </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-black/30 backdrop-blur-md mb-4">
                {work.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {work.title.main}
              </h1>
              <p className="text-xl text-white/90">{work.title.sub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl">
          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-[13px] sm:text-sm text-[#9D9D9D] leading-[1.8] sm:leading-relaxed">
              {work.description}
            </p>
          </div>
        </div>

        {/* Additional Images Grid */}
        {work.images.details.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {work.images.details.slice(0, 2).map((detail, index) => (
                <div key={index} className="space-y-2 sm:space-y-4">
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={detail.image}
                      alt={detail.caption}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-[13px] sm:text-sm text-[#9D9D9D] leading-relaxed">
                     {detail.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-3xl">
          {/* Designer Info */}
          <div className="mt-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={designer.image || "/placeholder.svg"}
                  alt={designer.name.zh}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#9D9D9D] text-sm">{designer.name.zh}</span>
                <span className="text-[#9D9D9D] text-sm">{designer.name.pinyin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 導購專刊 CTA */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white rounded-2xl h-auto md:h-[110px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out translate-y-10 hover:scale-[1.02] origin-center hover:border-gray-200">
            <div className="flex flex-row items-center h-full py-0 px-4 md:px-0">
              {/* 圖片容器 */}
              <div className="w-[120px] md:w-[120px] relative aspect-[3/4] md:ml-5 flex-shrink-0">
                <Image
                  src="/book.png"
                  alt="2024年度專刊《TEMPO_BOND 棒_節奏》"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* 文字內容 */}
              <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between pl-5 md:px-5 w-full">
                <div className="text-left md:text-left mb-2.5 md:mb-0 w-full md:w-auto">
                  <h2 className="text-gray-900 text-[15px] md:text-lg font-bold leading-tight md:leading-none mb-1">
                    想一窺作品背後的秘辛？
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm">
                    購買我們的2024年度專刊《TEMPO_BOND 棒_節奏》!
                  </p>
                </div>
                <Link 
                  href="/buy-catalog"
                  className="w-full md:w-auto flex items-center justify-center h-8 md:h-10 px-4 md:px-6 bg-black text-white hover:bg-gray-800 transition duration-300 rounded-xl md:rounded-2xl group whitespace-nowrap text-xs md:text-sm"
                >
                  <span className="mr-1.5 md:mr-2">手刀前往</span>
                  <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-[225deg] transform transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 輔助函數：獲取上一個作品的 ID
function getPreviousWorkId(currentId: string): string {
  const allWorks = getAllWorks()
  const currentIndex = allWorks.findIndex((work: Work) => work.id === currentId)
  if (currentIndex === -1) return currentId
  const prevIndex = (currentIndex - 1 + allWorks.length) % allWorks.length
  return allWorks[prevIndex].id
}

// 輔助函數：獲取下一個作品的 ID
function getNextWorkId(currentId: string): string {
  const allWorks = getAllWorks()
  const currentIndex = allWorks.findIndex((work: Work) => work.id === currentId)
  if (currentIndex === -1) return currentId
  const nextIndex = (currentIndex + 1) % allWorks.length
  return allWorks[nextIndex].id
}

