import Image from "next/image"
import { getDesignerBySlug } from "@/data/designers"
import { notFound } from "next/navigation"

// 這個頁面會顯示單個設計師的詳細信息
export default function DesignerDetail({ params }: { params: { slug: string } }) {
  const designer = getDesignerBySlug(params.slug)

  if (!designer) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-[3/4]">
            <Image
              src={designer.image}
              alt={designer.nameZh}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{designer.nameZh}</h1>
            <p className="text-xl text-gray-600 mb-6">{designer.nameEn}</p>
            <div className="prose max-w-none">
              <p>{designer.bio}</p>
            </div>
            {designer.works && designer.works.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">作品集</h2>
                <div className="grid grid-cols-2 gap-4">
                  {designer.works.map((work) => (
                    <div key={work.id} className="relative aspect-square">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white">
                        <p className="text-sm font-medium">{work.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

