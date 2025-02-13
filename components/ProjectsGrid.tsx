import Image from "next/image"
import { useState } from "react"

const projects = [
  { id: 1, title: "Project 1", image: "/placeholder.svg?height=300&width=300" },
  { id: 2, title: "Project 2", image: "/placeholder.svg?height=300&width=300" },
  { id: 3, title: "Project 3", image: "/placeholder.svg?height=300&width=300" },
  { id: 4, title: "Project 4", image: "/placeholder.svg?height=300&width=300" },
]

export default function ProjectsGrid() {
  const [touchedId, setTouchedId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300
                ${touchedId === project.id ? 'scale-[0.98]' : ''}
                @media (hover: hover) {
                  &:hover {
                    transform: scale(0.98);
                  }
                }
              `}
              onTouchStart={() => setTouchedId(project.id)}
              onTouchEnd={() => setTouchedId(null)}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

