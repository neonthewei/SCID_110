import Link from "next/link"

const categories = [
  {
    id: "comfort-nest",
    name: "舒適巢",
    title: "舒適巢",
    description: "打造溫馨舒適的生活空間",
    gradient: "from-amber-300 via-green-400 via-[15%] to-sky-300 to-[85%]",
  },
  {
    id: "warm-craft",
    name: "溫工藝",
    title: "溫工藝",
    description: "傳統工藝與現代設計的完美融合",
    gradient: "from-orange-400 via-yellow-300 via-green-400 via-blue-400 via-purple-400 via-pink-400 to-white",
  },
  {
    id: "hot-dialogue",
    name: "熱對話",
    title: "熱對話",
    description: "促進深度交流與互動",
    gradient: "from-orange-500 via-green-400 via-[20%] to-purple-600",
  },
  {
    id: "cold-spark",
    name: "冷火花",
    title: "冷火花",
    description: "激發創新思維的火花",
    gradient: "from-blue-300 to-blue-600 bg-[length:100%_100%]",
  },
]

export default function ProjectCategories() {
  return (
    <div className="w-full bg-[#F2F2F2]">
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/all-works?category=${category.id}`} className="block group">
                <div className="text-center transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="mb-4 sm:mb-6 relative">
                    <div 
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl transform transition-transform duration-300 group-hover:scale-110 bg-gradient-to-r ${category.gradient}`}
                    />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

