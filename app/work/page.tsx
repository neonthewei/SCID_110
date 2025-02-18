"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getAllWorks, type WorkCategory } from "@/data/designers"

const categories: WorkCategory[] = ["舒適巢", "溫工藝", "熱對話", "冷火花"]

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | "全部">("全部")
  const works = getAllWorks()

  const filteredWorks = selectedCategory === "全部" 
    ? works 
    : works.filter(work => work.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory("全部")}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === "全部"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <Link href={`/work/${work.id}`} key={work.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={work.images.main}
                    alt={work.title.main}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {work.category}
                  </div>
                  <h2 className="text-xl font-bold">{work.title.main}</h2>
                  <p className="text-gray-600">{work.title.sub}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 