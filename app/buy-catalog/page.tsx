"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CatalogViewer from "@/components/CatalogViewer";
import { HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PaymentForm from "@/components/PaymentForm";

const previewImages = [
  {
    url: "/book/1.webp",
    alt: "專刊內頁預覽 1",
  },
  {
    url: "/book/2.webp",
    alt: "專刊內頁預覽 2",
  },
  {
    url: "/book/3.webp",
    alt: "專刊內頁預覽 3",
  },
  {
    url: "/book/4.webp",
    alt: "專刊內頁預覽 4",
  },
  {
    url: "/book/5.webp",
    alt: "專刊內頁預覽 5",
  },
];

const productImages = [
  {
    url: "/book/book2.jpg",
    alt: "TEMPO_BOND 棒_節奏 專刊背面",
  },
  {
    url: "/book/book3.jpg",
    alt: "TEMPO_BOND 棒_節奏 專刊側面",
  },
];

export default function BuyCatalogPage() {
  const isSoldOut = false; // 控制販售狀態，預設為 false（立即購買）
  const orderId = `ORDER${Date.now()}`; // 生成唯一的訂單編號
  const amount = 1100; // 商品價格
  const description = "2025畢業展覽年度專刊《°Sense》"; // 商品描述
  const items = ["2025畢業展覽年度專刊《°Sense》"]; // 商品項目

  return (
    <main className="pb-8 pt-0">
      {/* 商品主要區塊 - 桌面版並排，手機版堆疊 */}
      <div className="lg:container lg:mx-auto lg:px-8 max-w-[1800px] overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center lg:justify-center min-h-[calc(100vh-6rem)]">
          {/* 商品圖片區塊 - 左側 */}
          <div className="flex-[1.5] w-full lg:max-w-[800px]">
            <div className="-mx-4 lg:mx-0 aspect-square lg:aspect-auto">
              <CatalogViewer images={productImages} />
            </div>
          </div>

          {/* 商品內容區 - 右側 */}
          <div className="flex-1 mt-4 lg:mt-8 px-4 lg:px-0 lg:mb-16 lg:min-w-[400px] lg:max-w-[480px]">
            <div className="space-y-8 pb-24 lg:pb-0">
              <div className="space-y-4">
                <h1 className="text-[22px] sm:text-[28px] font-semibold text-gray-800">
                  2025畢業展覽年度專刊《°Sense》
                  <br />
                </h1>

                <p className="text-[13px] sm:text-sm text-gray-600 sm:text-[#9D9D9D] leading-[1.8] sm:leading-relaxed whitespace-pre-line">
                  材質探索｜跨媒材 × 工藝實驗
                  <br />
                  設計思考｜觀點 × 議題 × 跨領域
                  <br />
                  創新提案｜產品 × 工藝 × 傳達
                </p>
                <p className="text-[13px] sm:text-sm text-gray-600 sm:text-[#9D9D9D] leading-[1.8] sm:leading-relaxed">
                  一本收錄了90件作品的設計刊物，從學生視角出發，充滿新鮮刺激與想法的碰撞；內頁呈現設計師們對設計的熱情，以及如火如荼的創作歷程，並收錄設計名師的專訪。期待與你們一同共感設計的溫度。
                </p>
              </div>

              {/* 桌面版價格和購買按鈕 */}
              <div className="hidden lg:block space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[16px] text-gray-500 line-through">
                      原價 $1,350
                    </span>
                    <div className="text-[22px] sm:text-[28px] font-semibold text-gray-800">
                      優惠價 $1,100
                    </div>
                  </div>
                </div>

                {!isSoldOut && (
                  <PaymentForm
                    orderId={orderId}
                    amount={amount}
                    description={description}
                    items={items}
                  />
                )}

                <div className="text-[13px] sm:text-sm text-gray-500 sm:text-[#9D9D9D] space-y-1">
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
          <div className="space-y-1">
            <span className="text-[14px] text-gray-500 line-through">
              原價 $1,350
            </span>
            <div className="text-[22px] font-semibold text-gray-800">
              優惠價 $1,100
            </div>
          </div>
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
              <div className="text-[13px] text-gray-500 space-y-2">
                <p>* 運費將於結帳時計算</p>
                <p>* 預計出貨時間：訂購後 7-14 個工作天</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {!isSoldOut && (
          <PaymentForm
            orderId={orderId}
            amount={amount}
            description={description}
            items={items}
          />
        )}
      </div>

      {/* 專刊預覽區域 */}
      <div className="mt-16 lg:mt-24 pb-16 lg:pb-32">
        <h2 className="text-xl font-medium text-gray-800 text-center mb-12">
          內容搶先看
        </h2>
        <div className="overflow-hidden">
          <div className="mx-16 sm:mx-32 lg:mx-auto lg:container lg:px-32 max-w-[1400px]">
            <div className="grid gap-8 lg:gap-16">
              {previewImages.map((image, index) => (
                <div key={index} className="relative w-full">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={1800}
                    height={1200}
                    className="w-full h-auto rounded-none sm:rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1600px) 90vw, 1800px"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
