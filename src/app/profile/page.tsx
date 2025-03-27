import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Profile - NextWin",
  description: "View and edit your profile information",
}

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <img
            src="/placeholder-avatar.jpg"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-yellow-500 hover:bg-yellow-400"
          >
            <Icons.edit className="w-4 h-4 text-black" />
          </Button>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-yellow-500">User Name</h1>
          <p className="text-gray-400">Member since Jan 2024</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-yellow-500/20">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Icons.trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400">Total Winnings</p>
                <p className="text-2xl font-bold text-yellow-500">$5,234</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-yellow-500/20">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Icons.target className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold text-yellow-500">68%</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-yellow-500/20">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Icons.users className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400">Referrals</p>
                <p className="text-2xl font-bold text-yellow-500">12</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-yellow-500/20">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Icons.rank className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400">Rank</p>
                <p className="text-2xl font-bold text-yellow-500">#45</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900 border-yellow-500/20">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity Item */}
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Icons.trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Won CS:GO Major Championship</h3>
                <p className="text-sm text-gray-400">Won $1,000</p>
              </div>
              <div className="text-gray-400">2h ago</div>
            </div>
            {/* Add more activity items */}
          </div>
        </div>
      </Card>

      {/* Referral Program */}
      <Card className="bg-gray-900 border-yellow-500/20">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">Referral Program</h2>
          <div className="space-y-4">
            <p className="text-gray-400">
              Invite your friends and earn 10% of their first deposit!
            </p>
            <div className="flex gap-4">
              <Input
                type="text"
                value="https://nextwin.com/ref/abc123"
                readOnly
                className="bg-gray-800"
              />
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 