import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Users } from "lucide-react"

export default function JackpotGrowthMeter() {
  const currentJackpot = 25000
  const targetJackpot = 50000
  const percentage = (currentJackpot / targetJackpot) * 100
  const activePlayers = 1250

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Jackpot</h3>
          <p className="text-gray-500 dark:text-gray-400">Growing with every entry</p>
        </div>
        <div className="flex items-center space-x-2 text-success">
          <TrendingUp className="h-5 w-5" />
          <span className="font-semibold">+$1,250 today</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Current Prize Pool</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ${currentJackpot.toLocaleString()}
          </span>
        </div>

        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-gradient-gold-start to-gradient-gold-end"
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Target Prize Pool</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ${targetJackpot.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-gray-500 dark:text-gray-400">
              {activePlayers.toLocaleString()} active players
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-success" />
            <span className="text-gray-500 dark:text-gray-400">
              ${(currentJackpot / activePlayers).toFixed(2)} per player
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 