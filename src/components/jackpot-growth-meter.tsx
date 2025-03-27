import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

export default function JackpotGrowthMeter() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Current Jackpot</h2>
        <div className="flex items-center text-gold">
          <DollarSign className="h-5 w-5 mr-1" />
          <span className="text-2xl font-bold">$25,000</span>
        </div>
      </div>
      
      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-full bg-gradient-to-r from-gradient-gold-start to-gradient-gold-end"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          75% to Goal
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <span>Goal: $33,333</span>
        <span>Current: $25,000</span>
        <span>Entries: 1,667</span>
      </div>
    </div>
  )
} 