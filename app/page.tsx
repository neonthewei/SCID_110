import DynamicHero from "../components/DynamicHero"
import Hero from "../components/Hero"
import ProjectCategories from "../components/ProjectCategories"

export default function Home() {
  return (
    <div className="pt-0">
      {" "}
      {/* Add top padding to account for fixed header */}
      <DynamicHero />
      <Hero />
      <ProjectCategories />
    </div>
  )
}

