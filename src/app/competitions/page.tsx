import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import EnhancedCompetitionCard from "@/components/enhanced-competition-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Competitions - NextWin",
  description: "View and enter sports prediction competitions",
}

export default async function CompetitionsPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-yellow-500">Competitions</h1>
        <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
          Create Competition
        </Button>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList className="bg-gray-900">
          <TabsTrigger value="live" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Live Matches
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Live Match Card */}
            <Card className="bg-gray-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    LIVE
                  </span>
                  <span className="text-yellow-500">Prize: $1,000</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">CS:GO Major Championship</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Entry Fee</span>
                    <span className="text-yellow-500">$10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Entries</span>
                    <span className="text-yellow-500">45/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Time Left</span>
                    <span className="text-yellow-500">2h 30m</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black">
                  Enter Now
                </Button>
              </div>
            </Card>
            {/* Add more match cards */}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Similar structure for upcoming matches */}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {/* Similar structure for completed matches */}
        </TabsContent>
      </Tabs>
    </div>
  )
} 