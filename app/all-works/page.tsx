import { Suspense } from "react"
import AllWorksContent from "../../components/AllWorksContent"

export default function AllWorksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllWorksContent />
    </Suspense>
  )
}

