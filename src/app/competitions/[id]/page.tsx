import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CompetitionPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CompetitionPageProps): Promise<Metadata> {
  return {
    title: `Competition Details - NextWin`,
    description: "View competition details and make predictions",
  }
}

export default function CompetitionEntryPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-yellow-500">CS:GO Major Championship</h1>
        <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
          Submit Prediction
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Competition Details */}
        <Card className="bg-gray-900 border-yellow-500/20 lg:col-span-1">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">Competition Details</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Entry Fee</Label>
                <p className="text-yellow-500 font-semibold">$10</p>
              </div>
              <div>
                <Label className="text-gray-400">Prize Pool</Label>
                <p className="text-yellow-500 font-semibold">$1,000</p>
              </div>
              <div>
                <Label className="text-gray-400">Time Left</Label>
                <p className="text-yellow-500 font-semibold">2h 30m</p>
              </div>
              <div>
                <Label className="text-gray-400">Entries</Label>
                <p className="text-yellow-500 font-semibold">45/100</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Prediction Form */}
        <Card className="bg-gray-900 border-yellow-500/20 lg:col-span-2">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">Make Your Prediction</h2>
            <form className="space-y-6">
              {/* Winner Selection */}
              <div className="space-y-4">
                <Label className="text-lg">Select Winner</Label>
                <RadioGroup className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg">
                    <RadioGroupItem value="team1" id="team1" />
                    <Label htmlFor="team1" className="flex-1">Team 1</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg">
                    <RadioGroupItem value="team2" id="team2" />
                    <Label htmlFor="team2" className="flex-1">Team 2</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Score Prediction */}
              <div className="space-y-4">
                <Label className="text-lg">Predicted Score</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label className="text-gray-400">Team 1</Label>
                    <Input type="number" min="0" max="30" className="bg-gray-800" />
                  </div>
                  <span className="text-2xl font-bold text-yellow-500">-</span>
                  <div className="flex-1">
                    <Label className="text-gray-400">Team 2</Label>
                    <Input type="number" min="0" max="30" className="bg-gray-800" />
                  </div>
                </div>
              </div>

              {/* Additional Predictions */}
              <div className="space-y-4">
                <Label className="text-lg">MVP Player</Label>
                <Input type="text" className="bg-gray-800" placeholder="Enter player name" />
              </div>

              <div className="space-y-4">
                <Label className="text-lg">Total Rounds</Label>
                <Input type="number" min="16" max="90" className="bg-gray-800" />
              </div>

              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black">
                Submit Prediction
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
} 