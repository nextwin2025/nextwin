import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Welcome to <span className="text-yellow-500">NextWin</span>
        </h1>
        <p className="mb-8 text-xl text-gray-300">
          The premier platform for esports predictions and competitions
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/competitions">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
              View Competitions
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 