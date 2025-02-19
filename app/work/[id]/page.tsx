"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getWorkById, getDesignerByWorkId } from "@/data/designers"

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
    <div className="min-h-screen bg-white">
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
            <p className="text-gray-700 leading-relaxed">
              {work.description}
            </p>
          </div>

          {/* Additional Images Grid */}
          {work.images.details.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">作品細節</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {work.images.details.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${work.title.main} detail ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">專案資訊</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">類別</dt>
                  <dd className="mt-1 text-lg text-gray-900">{work.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">設計師</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    {designer.name.zh}
                    <span className="text-gray-500 text-base ml-2">
                      {designer.name.pinyin}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">相關連結</h2>
              <div className="space-y-3">
                <Link 
                  href={`/designer/${designer.id}`}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <span className="mr-2">作者介紹</span>
                  <ArrowLeft className="w-4 h-4 rotate-[225deg]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 導購專刊 CTA */}
      <div className="container mx-auto px-4 mt-20 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl h-[110px]">
            <div className="flex h-full flex-col md:flex-row items-center">
              {/* 圖片容器 */}
              <div className="w-[120px] relative aspect-[3/4] ml-5">
                <Image
                  src="/book.png"
                  alt="2024年度專刊《TEMPO_BOND 棒_節奏》"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* 文字內容 */}
              <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-5 gap-4">
                <div className="text-center md:text-left">
                  <h2 className="text-white text-lg font-bold leading-none mb-1">
                    想一窺作品背後的秘辛？
                  </h2>
                  <p className="text-gray-300 text-sm">
                    購買我們的2024年度專刊《TEMPO_BOND 棒_節奏》!
                  </p>
                </div>
                <Link 
                  href="/buy-catalog"
                  className="inline-flex items-center px-5 py-1.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 group whitespace-nowrap text-sm"
                >
                  <span className="mr-2">手刀前往</span>
                  <ArrowLeft className="w-4 h-4 rotate-[225deg] transform transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

