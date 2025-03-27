import { motion } from "framer-motion"
import { Trophy, DollarSign } from "lucide-react"

export default function WinnersBanner() {
  const winners = [
    { name: "SoccerKing99", prize: "$2,450", sport: "Premier League" },
    { name: "GoalMaster", prize: "$1,750", sport: "La Liga" },
    { name: "FootballFan", prize: "$950", sport: "Bundesliga" },
  ]

  return (
    <div className="bg-gradient-to-r from-gradient-premium-start to-gradient-premium-end text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-gold" />
            <span className="font-semibold">Recent Winners</span>
          </div>
          <div className="flex space-x-8">
            {winners.map((winner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center space-x-2"
              >
                <DollarSign className="h-4 w-4 text-gold" />
                <span>{winner.name}</span>
                <span className="text-gold">{winner.prize}</span>
                <span className="text-sm opacity-75">({winner.sport})</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 