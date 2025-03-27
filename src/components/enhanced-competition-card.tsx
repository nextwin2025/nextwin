import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, DollarSign, Clock, Users } from "lucide-react"

interface EnhancedCompetitionCardProps {
  id: string
  name: string
  sport: string
  entryFee: string
  prizePool: string
  entries: number
  matches: number
  deadline: string
  status: string
}

export default function EnhancedCompetitionCard({
  name,
  sport,
  entryFee,
  prizePool,
  entries,
  matches,
  deadline,
  status,
}: EnhancedCompetitionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "hot":
        return "bg-cta"
      case "live":
        return "bg-success"
      case "new":
        return "bg-primary"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0">
          <Badge className={`${getStatusColor(status)} text-white`}>
            {status}
          </Badge>
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 text-gold mr-2" />
            {name}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Entry:</span>
              </div>
              <span className="font-semibold">{entryFee}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Trophy className="h-4 w-4 mr-1" />
                <span>Prize Pool:</span>
              </div>
              <span className="font-semibold text-success">{prizePool}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 mr-1" />
                <span>Entries:</span>
              </div>
              <span className="font-semibold">{entries}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4 mr-1" />
                <span>Deadline:</span>
              </div>
              <span className="font-semibold text-orange">{deadline}</span>
            </div>
            
            <div className="pt-4 border-t">
              <Button className="w-full bg-gradient-to-r from-gradient-premium-start to-gradient-premium-end text-white">
                Enter Competition
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 