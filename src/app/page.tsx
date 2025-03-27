import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Icons } from "@/components/icons"

export default async function HomePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
          Predict, Compete, Win
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Join the most exciting fantasy sports platform
        </p>
        <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black">
          Start Predicting
        </Button>
      </section>

      {/* Current Competitions */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-yellow-500">Current Competitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Competition Card */}
          <Card className="bg-gray-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">CS:GO Major Championship</h3>
              <p className="text-gray-400 mb-4">Predict the winner of the upcoming major</p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500">Prize: $1,000</span>
                <Button variant="outline" className="border-yellow-500 text-yellow-500">
                  Enter Now
                </Button>
              </div>
            </div>
          </Card>
          {/* Add more competition cards */}
        </div>
      </section>

      {/* Trending Streamers */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-yellow-500">Trending Streamers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Streamer Card */}
          <Card className="bg-gray-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <div className="p-4">
              <div className="relative w-full aspect-square mb-4 rounded-full overflow-hidden">
                <img
                  src="/placeholder-avatar.jpg"
                  alt="Streamer"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs px-2 py-1">
                  LIVE
                </div>
              </div>
              <h3 className="font-semibold">Streamer Name</h3>
              <p className="text-sm text-gray-400">1.2k viewers</p>
            </div>
          </Card>
          {/* Add more streamer cards */}
        </div>
      </section>

      {/* Recent Winners */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-yellow-500">Recent Winners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Winner Card */}
          <Card className="bg-gray-900 border-yellow-500/20">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Icons.trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Winner Name</h3>
                  <p className="text-sm text-gray-400">Won $500</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">Predicted CS:GO Major winner correctly</p>
            </div>
          </Card>
          {/* Add more winner cards */}
        </div>
      </section>
    </div>
  )
} 