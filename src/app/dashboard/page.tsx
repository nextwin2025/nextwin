import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard - NextWin",
  description: "View your competitions and predictions",
}

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session.user?.name}
          </h1>
          <Link href="/competitions">
            <Button>View All Competitions</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Competitions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You're currently participating in 3 competitions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Winnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">$1,250</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your total earnings from competitions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">65%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your prediction accuracy rate
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Active Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add competition cards here */}
            <Card>
              <CardHeader>
                <CardTitle>Premier League Weekend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Entry Fee: $5
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Prize Pool: $2,450
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Deadline: Sat, 24 Mar, 12:00
                </p>
              </CardContent>
            </Card>
            {/* Add more competition cards */}
          </div>
        </div>
      </div>
    </div>
  )
} 