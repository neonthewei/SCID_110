import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CatalogViewer from '@/components/CatalogViewer'
import { HelpCircle } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
    <main className="pb-8 pt-0">
      {/* 商品主要區塊 - 桌面版並排，手機版堆疊 */}
      <div className="lg:container lg:mx-auto lg:px-16 max-w-[2000px] overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:gap-20 lg:items-center lg:justify-center min-h-[calc(100vh-8rem)]">
          {/* 商品圖片區塊 - 左側 */}
          <div className="flex-[1.2] lg:max-w-[600px]">
            <div className="-mx-4 lg:mx-0">
              <CatalogViewer images={productImages} />
            </div>
          </div>

          {/* 商品內容區 - 右側 */}
          <div className="flex-1 mt-8 px-4 lg:px-0 lg:mb-20 lg:min-w-[480px] lg:max-w-[520px]">
            <div className="space-y-8 pb-24 lg:pb-0">
              <div className="space-y-4">
                <h1 className="text-2xl font-medium text-gray-800">
                  2024 畢業展覽年度專刊
                  <br />
                  《TEMPO_BOND 棒_節奏》
                </h1>
                
                <p className="text-base text-gray-600 leading-relaxed">
                  匯聚91件匠心巨作，由每位設計師親自整合作品內容，展現新銳設計師的創意火花！
                  刊物中不但能看到作品背後的製作秘辛，還包含了知名設計師的訪談及團隊工作幕後過程，
                  揭開四年裡我們累積的不同養分，讓我們翻開「棒節奏」，一起探索樣貌的無限可能。
                </p>
              </div>

              {/* 桌面版價格和購買按鈕 */}
              <div className="hidden lg:block space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-medium text-gray-800">售價 $999</span>
                </div>

                <Button 
                  className={`w-full py-6 text-lg rounded-2xl ${
                    isSoldOut 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                  disabled={isSoldOut}
                >
                  {isSoldOut ? '已結束販售' : '立即購買'}
                </Button>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>* 運費將於結帳時計算</p>
                  <p>* 預計出貨時間：訂購後 7-14 個工作天</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 手機版固定在底部的購買按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:hidden z-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-medium text-gray-800">售價 $999</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[calc(100vw-32px)] p-4 bg-white rounded-xl shadow-lg mr-2" 
              side="top" 
              sideOffset={16}
              align="center"
            >
              <div className="text-sm text-gray-600 space-y-2">
                <p>* 運費將於結帳時計算</p>
                <p>* 預計出貨時間：訂購後 7-14 個工作天</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button 
          className={`w-full py-6 text-lg rounded-2xl ${
            isSoldOut 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
          disabled={isSoldOut}
        >
          {isSoldOut ? '已結束販售' : '立即購買'}
        </Button>
      </div>

      {/* 專刊預覽區域 */}
      <div className="mt-8 lg:mt-4 pb-16 lg:pb-24">
        <h2 className="text-xl text-gray-800 text-center mb-8">內容搶先看</h2>
        <div className="overflow-hidden">
          <div className="-mx-4 sm:mx-auto sm:container sm:px-8 md:px-12 lg:px-24 max-w-[1200px] space-y-6">
            {previewImages.map((image, index) => (
              <div key={index} className="relative aspect-video w-full">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 