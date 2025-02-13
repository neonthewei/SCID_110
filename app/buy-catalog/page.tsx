import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CatalogViewer from '@/components/CatalogViewer'

const previewImages = [
  {
    url: '/placeholder.svg',
    alt: '專刊內頁預覽 - 目錄'
  },
  {
    url: '/placeholder.svg',
    alt: '專刊內頁預覽 - 作品集'
  },
  {
    url: '/placeholder.svg',
    alt: '專刊內頁預覽 - 設計師專訪'
  },
  {
    url: '/placeholder.svg',
    alt: '專刊內頁預覽 - 團隊介紹'
  }
]

const productImages = [
  {
    url: '/placeholder.svg',
    alt: 'TEMPO_BOND 棒_節奏 專刊封面'
  },
  {
    url: '/placeholder.svg',
    alt: 'TEMPO_BOND 棒_節奏 專刊背面'
  },
  {
    url: '/placeholder.svg',
    alt: 'TEMPO_BOND 棒_節奏 專刊側面'
  }
]

export default function BuyCatalogPage() {
  const isSoldOut = false // 控制販售狀態，預設為 false（立即購買）

  return (
    <main className="pb-8 -mt-16">
      {/* 商品圖片區塊 */}
      <div>
        <CatalogViewer images={productImages} />
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 max-w-[1200px] mt-4">
        {/* 商品內容區 */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-xl font-medium text-gray-800">
              2024 畢業展覽年度專刊
              <br />
              《TEMPO_BOND 棒_節奏》
            </h1>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              匯聚91件匠心巨作，由每位設計師親自整合作品內容，展現新銳設計師的創意火花！
              刊物中不但能看到作品背後的製作秘辛，還包含了知名設計師的訪談及團隊工作幕後過程，
              揭開四年裡我們累積的不同養分，讓我們翻開「棒節奏」，一起探索樣貌的無限可能。
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800">售價 $999</span>
            </div>

            <Button 
              className={`w-full py-5 text-lg rounded-2xl ${
                isSoldOut 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800 text-white'
              }`}
              disabled={isSoldOut}
            >
              {isSoldOut ? '已結束販售' : '立即購買'}
            </Button>

            <div className="text-sm text-gray-500 space-y-0.5">
              <p>* 運費將於結帳時計算</p>
              <p>* 預計出貨時間：訂購後 7-14 個工作天</p>
            </div>
          </div>
        </div>
      </div>

      {/* 專刊預覽區域 */}
      <div className="mt-24">
        <h2 className="text-lg text-gray-800 text-center mb-6">內容搶先看</h2>
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 max-w-[800px] space-y-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 