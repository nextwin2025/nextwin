import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CompetitionCardProps {
  id: string
  name: string
  sport: string
  entryFee: string
  prizePool: string
  entries: number
  maxEntries: number
  matches: number
  deadline: string
  status: "Open" | "Closed" | "Live" | "Upcoming"
}

export function CompetitionCard({
  id,
  name,
  sport,
  entryFee,
  prizePool,
  entries,
  maxEntries,
  matches,
  deadline,
  status,
}: CompetitionCardProps) {
  const statusColors = {
    Open: "bg-green-500",
    Closed: "bg-red-500",
    Live: "bg-blue-500",
    Upcoming: "bg-yellow-500",
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>
        <CardDescription>{sport}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Entry Fee:</span>
            <span className="text-sm font-medium">{entryFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Prize Pool:</span>
            <span className="text-sm font-medium">{prizePool}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Entries:</span>
            <span className="text-sm font-medium">
              {entries}/{maxEntries}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Matches:</span>
            <span className="text-sm font-medium">{matches}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Deadline:</span>
            <span className="text-sm font-medium">{deadline}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/competitions/${id}`} className="w-full">
          <Button className="w-full" disabled={status === "Closed"}>
            {status === "Closed" ? "Closed" : "Enter Competition"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 