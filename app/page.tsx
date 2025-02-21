import Hero from "../components/Hero"
import InteractivePlusGrid from "../components/InteractivePlusGrid"
import BookTourForm from "../components/BookTourForm"

export default function Home() {
  return (
    <div className="pt-0 relative">
      <Hero />
      <div className="bg-[#F2F2F2]">
        <InteractivePlusGrid />
        <div className="relative">
          <div className="w-full h-[800px] bg-black" />
          <div className="w-full absolute bottom-0 left-0 z-10">
            <img 
              src="/trans.png" 
              alt="Transition" 
              className="w-full h-96 rotate-180"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div 
            className="w-full h-[400px] absolute bottom-0 left-0 z-20" 
            style={{
              background: 'linear-gradient(to bottom, #F2F2F2 0%, rgba(242, 242, 242, 0.95) 15%, rgba(242, 242, 242, 0.8) 30%, rgba(242, 242, 242, 0.6) 45%, rgba(242, 242, 242, 0.4) 60%, rgba(242, 242, 242, 0.2) 75%, rgba(242, 242, 242, 0.1) 85%, transparent 100%)'
            }}
          />
        </div>
      </div>
      <BookTourForm />
    </div>
  )
}

