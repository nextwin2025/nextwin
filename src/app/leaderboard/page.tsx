import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-yellow-500">Leaderboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Winners */}
        <Card className="bg-gray-900 border-yellow-500/20">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">Top Winners</h2>
            <div className="space-y-4">
              {/* Winner Item */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Icons.trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Winner Name</h3>
                  <p className="text-sm text-gray-400">Won $5,000</p>
                </div>
                <div className="text-yellow-500 font-bold">#1</div>
              </div>
              {/* Add more winner items */}
            </div>
          </div>
        </Card>

        {/* Top Streamers */}
        <Card className="bg-gray-900 border-yellow-500/20">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">Top Streamers</h2>
            <div className="space-y-4">
              {/* Streamer Item */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="relative w-12 h-12">
                  <img
                    src="/placeholder-avatar.jpg"
                    alt="Streamer"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Streamer Name</h3>
                  <p className="text-sm text-gray-400">1.2k viewers</p>
                </div>
                <div className="text-yellow-500 font-bold">#1</div>
              </div>
              {/* Add more streamer items */}
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Rankings */}
      <Card className="bg-gray-900 border-yellow-500/20">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">Weekly Rankings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-4">Rank</th>
                  <th className="pb-4">User</th>
                  <th className="pb-4">Winnings</th>
                  <th className="pb-4">Predictions</th>
                  <th className="pb-4">Win Rate</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {/* Table Row */}
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-yellow-500 font-bold">#1</td>
                  <td className="py-4">User Name</td>
                  <td className="py-4 text-yellow-500">$2,500</td>
                  <td className="py-4">25</td>
                  <td className="py-4 text-green-500">80%</td>
                </tr>
                {/* Add more rows */}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
} 