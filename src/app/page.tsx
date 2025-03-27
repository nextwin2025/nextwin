import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WinnersBanner from "@/components/winners-banner"
import EnhancedHomeBanner from "@/components/enhanced-home-banner"
import JackpotGrowthMeter from "@/components/jackpot-growth-meter"
import EnhancedCompetitionCard from "@/components/enhanced-competition-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">NextWin.com</h1>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-cta hover:bg-cta-600 text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <WinnersBanner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Home Banner */}
        <div className="mb-12">
          <EnhancedHomeBanner />
        </div>

        {/* Jackpot Growth Meter */}
        <div className="mb-12">
          <JackpotGrowthMeter />
        </div>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Predict & Win Cash Prizes</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Make your predictions for weekend matches, get them all right, and win from the prize pool. It's that
              simple!
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-6 bg-cta hover:bg-cta-600 text-white">
                  Start Predicting
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Make Predictions</CardTitle>
                <CardDescription>Predict match outcomes for your favorite sports</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=350"
                  alt="Prediction interface"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-600 dark:text-gray-300">
                  Predict win/loss/draw for matches across soccer, cricket, rugby, and F1 races.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enter Competitions</CardTitle>
                <CardDescription>Pay a small entry fee to join prize pools</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=350"
                  alt="Competition entry"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-600 dark:text-gray-300">
                  Entry fees start at just $5 and go directly to the prize pool. No odds, just skill-based predictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Win Cash Prizes</CardTitle>
                <CardDescription>Get all predictions right and win big</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=350"
                  alt="Prize winning"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-600 dark:text-gray-300">
                  Winners split the prize pool. Get paid via bank transfer or cryptocurrency of your choice.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Active Competitions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Active Competitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EnhancedCompetitionCard
              id="comp1"
              name="Premier League Weekend"
              sport="soccer"
              entryFee="$5"
              prizePool="$2,450"
              entries={490}
              matches={10}
              deadline="Sat, 24 Mar, 12:00"
              status="Hot"
            />
            <EnhancedCompetitionCard
              id="comp2"
              name="IPL Predictions"
              sport="Cricket"
              entryFee="$10"
              prizePool="$3,750"
              entries={375}
              matches={5}
              deadline="Fri, 23 Mar, 14:00"
              status="Live"
            />
            <EnhancedCompetitionCard
              id="comp3"
              name="Six Nations Final Round"
              sport="Rugby"
              entryFee="$5"
              prizePool="$1,250"
              entries={250}
              matches={3}
              deadline="Sat, 24 Mar, 14:30"
              status="Closed"
            />
            <EnhancedCompetitionCard
              id="comp4"
              name="Australian GP Predictions"
              sport="Formula 1"
              entryFee="$15"
              prizePool="$4,500"
              entries={300}
              matches={1}
              deadline="Sun, 25 Mar, 05:00"
              status="New"
            />
            <EnhancedCompetitionCard
              id="comp5"
              name="La Liga Weekend"
              sport="Soccer"
              entryFee="$5"
              prizePool="$1,750"
              entries={350}
              matches={5}
              deadline="Sat, 24 Mar, 13:00"
              status="Hot"
            />
            <EnhancedCompetitionCard
              id="comp6"
              name="Multi-Sport Challenge"
              sport="Multi-sport"
              entryFee="$20"
              prizePool="$8,000"
              entries={400}
              matches={12}
              deadline="Fri, 23 Mar, 23:59"
              status="Live"
            />
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How NextWin Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Sign Up",
                description: "Create your account using email, Google, or connect your crypto wallet",
              },
              {
                title: "Enter Competitions",
                description: "Pay the entry fee to join competitions for your favorite sports",
              },
              {
                title: "Make Predictions",
                description: "Predict the outcomes of matches before the deadline",
              },
              {
                title: "Win Prizes",
                description: "Get all predictions right and win your share of the prize pool",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">NextWin.com</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">© 2025 All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                Contact
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 