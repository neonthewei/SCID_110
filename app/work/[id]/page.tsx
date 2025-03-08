import { Metadata } from "next"
import { generateMetadata as generatePageMetadata } from "@/utils/metadata"
import { getWorkById, getDesignerByWorkId, getAllWorks, type Work } from "@/data/designers"
import WorkDetailClient from "./work-detail-client"

// 定義分類主題色映射
const categoryColors = {
  "舒適巢": "#8CBB28",
  "溫工藝": "#DA6615",
  "熱對話": "#C3206D",
  "冷火花": "#3DB5E9"
} as const

// 定義分類圖片映射
const categoryImages = {
  "舒適巢": "/reserve/reserve_bg_3.png",
  "溫工藝": "/reserve/reserve_bg_4.png",
  "熱對話": "/reserve/reserve_bg_2.png",
  "冷火花": "/reserve/reserve_bg_1.png"
} as const

// Generate metadata for the work detail page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Fetch work data
  const work = getWorkById(params.id);
  const designer = getDesignerByWorkId(params.id);
  
  if (!work) {
    return generatePageMetadata({
      title: "作品不存在 | 實踐工設2025畢業展",
      description: "找不到您要查看的作品，請返回作品列表查看其他精彩作品。",
      pagePath: `/work/${params.id}`,
    });
  }
  
  // Get the main image as the OG image or use default
  const imageUrl = work.images?.main || "/og-image.png";
  
  // Format the title correctly
  const workTitle = typeof work.title === 'string' 
    ? work.title 
    : `${work.title.main}${work.title.sub ? ` - ${work.title.sub}` : ''}`;
  
  // Format the designer name correctly
  const designerName = designer 
    ? (typeof designer.name === 'string' ? designer.name : designer.name.zh) 
    : '實踐工設';
  
  return generatePageMetadata({
    title: `${workTitle} | ${designerName} | 實踐工設2025畢業展`,
    description: work.description || `${workTitle} - 實踐大學工業產品設計學系2025畢業展覽作品，由${designerName}設計。${work.category ? `分類：${work.category}` : ''}`,
    keywords: [
      typeof work.title === 'string' ? work.title : work.title.main, 
      designerName, 
      '畢業展作品', 
      work.category || '設計作品', 
      '產品設計', 
      '工業設計'
    ],
    pagePath: `/work/${params.id}`,
    imageUrl,
    imageAlt: `${workTitle} - ${designerName} | 實踐工設2025畢業展`,
    type: "article"
  });
}

export default function WorkDetailPage({ params }: { params: { id: string } }) {
  return <WorkDetailClient params={params} />;
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

