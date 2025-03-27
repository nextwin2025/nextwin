import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, DollarSign, Trophy } from "lucide-react"

interface CompetitionCardProps {
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
}: CompetitionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "hot":
        return "bg-cta text-white"
      case "live":
        return "bg-success text-white"
      case "new":
        return "bg-primary text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0">
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {sport}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Entry Fee</p>
                <p className="font-semibold">{entryFee}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-gold" />
              <div>
                <p className="text-sm text-muted-foreground">Prize Pool</p>
                <p className="font-semibold">{prizePool}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Entries</p>
                <p className="font-semibold">{entries}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange" />
              <div>
                <p className="text-sm text-muted-foreground">Matches</p>
                <p className="font-semibold">{matches}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange" />
                <span className="text-sm text-muted-foreground">Deadline:</span>
                <span className="text-sm font-medium">{deadline}</span>
              </div>
            </div>
            <Button className="w-full bg-cta hover:bg-cta-600 text-white">
              Enter Competition
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 