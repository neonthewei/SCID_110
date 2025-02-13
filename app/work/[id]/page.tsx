"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

// Define the project data structure
interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
}

// Create an object to store all projects
const allProjects: { [key: string]: Project } = {
  "warm-craft-1": {
    id: "warm-craft-1",
    title: "重｜花 re:cHUĀn",
    description: "將同一個最小單位做多種合併嘗試，透過顏色與造型的穿插創造出一系列具有穿花意象的結構燈具組。",
    image: "/placeholder.svg?height=600&width=800",
    category: "溫工藝",
  },
  "comfort-nest-1": {
    id: "comfort-nest-1",
    title: "Rolling Rescue",
    description: "兒童傾斜圓盤使小球滾動，避開障礙物順利滾到動物口中",
    image: "/placeholder.svg?height=600&width=800",
    category: "舒適巢",
  },
  "cold-spark-1": {
    id: "cold-spark-1",
    title: "Dynamic Joinery Luminaries",
    description: "以光固化軟料作為鳩尾榫的材質，使零件與零件的連接有了活性，進而使榫接工藝作品的造型有不同的可能。",
    image: "/placeholder.svg?height=600&width=800",
    category: "冷火花",
  },
  "hot-dialogue-1": {
    id: "hot-dialogue-1",
    title: "COLONO",
    description: "利用彩虹的顏色代表著音符，讓小朋友自由拼接出屬於自己的軌道音樂！",
    image: "/placeholder.svg?height=600&width=800",
    category: "熱對話",
  },
  "comfort-nest-2": {
    id: "comfort-nest-2",
    title: "UUUstool",
    description:
      "融合多種造型語彙，包括球體、條狀結構與鐵網，此系列包含三張高低不一的凳子，整體框架以倒U型為主要結構，U型的底部稍微擴大，既增添了穩定性，也作為造型語言的一部分。",
    image: "/placeholder.svg?height=600&width=800",
    category: "舒適巢",
  },
  "comfort-nest-3": {
    id: "comfort-nest-3",
    title: "FUROSHIKI+",
    description: "FUROSHIKI+為一風呂敷式筆電保護包。保留風呂敷的包裹流程和造型特性，回應傳統文化之美同時因應當代需求。",
    image: "/placeholder.svg?height=600&width=800",
    category: "舒適巢",
  },
  "comfort-nest-4": {
    id: "comfort-nest-4",
    title: "過伍關展陸樣",
    description:
      "與以往的大富翁不同，透過抽牌拼接出一圈拼圖道路，每種道路的任務性質不同，透過問題與任務，與父母互動拉近家庭情感，搭配上四座愛心建築，讓遊戲體驗更有氣氛。",
    image: "/placeholder.svg?height=600&width=800",
    category: "舒適巢",
  },
  "warm-craft-2": {
    id: "warm-craft-2",
    title: "Nukumo",
    description:
      "皺摺紋理不僅承載了傳統工藝的溫度，也像是時間在布料上的刻畫，在手工縫製與光影的交互作用下，透過光的投射形成流動般的視覺效果，讓靜態的材質擁有動態的生命力。",
    image: "/placeholder.svg?height=600&width=800",
    category: "溫工藝",
  },
  "cold-spark-2": {
    id: "cold-spark-2",
    title: "Petro",
    description:
      "城市共行寵物載具提升帶寵物出行的便利性，讓寵物主人在城市交通環境中能夠輕鬆地帶著寵物進行中短距離旅行和戶外活動。",
    image: "/placeholder.svg?height=600&width=800",
    category: "冷火花",
  },
  // Add more projects here...
}

// Function to get work details
function getWorkDetails(id: string): Project {
  return (
    allProjects[id] || {
      id,
      title: "未知作品",
      description: "抱歉，我們找不到這個作品的資訊。",
      image: "/placeholder.svg?height=600&width=800",
      category: "未分類",
    }
  )
}

export default function WorkDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const work = getWorkDetails(params.id)

  return (
    <div className="min-h-screen bg-white pb-6">
      <div className="container mx-auto px-4 pt-4">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          返回作品總覽
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-[4/3] bg-gray-100">
            <Image src={work.image || "/placeholder.svg"} alt={work.title} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
            <p className="text-gray-600 mb-6">{work.description}</p>
            <p className="text-sm text-gray-500">類別: {work.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

