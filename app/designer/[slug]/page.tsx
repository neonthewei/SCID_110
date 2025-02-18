"use client"

import { getDesignerBySlug } from "@/data/designers"
import Image from "next/image"
import { useRouter } from "next/navigation"

// 這個頁面會顯示單個設計師的詳細信息
export default function DesignerDetail({ params }: { params: { slug: string } }) {
  const designer = getDesignerBySlug(params.slug)
  const router = useRouter()

  if (!designer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">找不到設計師</h1>
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full h-[60vh] mb-8 rounded-2xl overflow-hidden">
          <Image
            src={designer.image}
            alt={designer.name.zh}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">{designer.name.zh}</h1>
        <p className="text-xl text-gray-600 mb-8">{designer.name.pinyin}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {designer.works.map((work) => (
            <div key={work.id} className="group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image
                  src={work.images.main}
                  alt={work.title.main}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-bold">{work.title.main}</h2>
              <p className="text-gray-600">{work.title.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

