import Hero from "../components/Hero"
import InteractivePlusGrid from "../components/InteractivePlusGrid"

export default function Home() {
  return (
    <div className="pt-0 relative">
      <Hero />
      <div className="bg-[#F2F2F2]">
        <InteractivePlusGrid />
      </div>
    </div>
  )
}

