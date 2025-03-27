import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

export default function WinnersBanner() {
  return (
    <div className="bg-gradient-to-r from-gradient-premium-start to-gradient-premium-end text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="h-8 w-8 text-gold mr-3" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold">Latest Winners</h2>
              <p className="text-sm text-blue-100">Congratulations to our recent champions!</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {[
              { name: "SoccerKing99", prize: "$750", competition: "Premier League" },
              { name: "GoalMaster", prize: "$500", competition: "La Liga" },
              { name: "FootballFan", prize: "$250", competition: "Champions League" },
            ].map((winner, index) => (
              <div key={index} className="text-center">
                <div className="font-bold text-gold">{winner.name}</div>
                <div className="text-sm text-blue-100">{winner.prize}</div>
                <div className="text-xs text-blue-200">{winner.competition}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 