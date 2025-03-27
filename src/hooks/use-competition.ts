import { useCallback, useEffect } from "react"
import { useSocket } from "./use-socket"
import { useApi } from "./use-api"
import { trackError, trackEvent } from "@/lib/monitoring"
import { NotFoundError } from "@/lib/errors"

interface Competition {
  id: string
  name: string
  sport: string
  entryFee: number
  prizePool: number
  entries: number
  totalMatches: number
  deadline: string
  status: string
  matches: Match[]
}

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  result?: string
}

interface Prediction {
  id: string
  matchId: string
  prediction: string
  userId: string
}

export function useCompetition(competitionId: string) {
  const { socket, joinCompetition, leaveCompetition, updatePrediction, onPredictionUpdated, onMatchResultUpdated } = useSocket()
  const { data: competition, error, loading, fetchData, mutate } = useApi<Competition>()

  // Fetch competition data
  useEffect(() => {
    fetchData(`/api/competitions/${competitionId}`, {}, {
      cacheKey: `competition:${competitionId}`,
      cacheDuration: 300, // Cache for 5 minutes
    })
  }, [competitionId, fetchData])

  // Join competition room when socket is available
  useEffect(() => {
    if (socket) {
      joinCompetition(competitionId)

      // Listen for prediction updates
      onPredictionUpdated((data) => {
        if (competition) {
          // Update competition data with new prediction
          const updatedCompetition = {
            ...competition,
            matches: competition.matches.map((match: Match) =>
              match.id === data.matchId
                ? { ...match, prediction: data.prediction }
                : match
            ),
          }
          // Update local state
          mutate(`/api/competitions/${competitionId}`, "PUT", updatedCompetition, {
            cacheKey: `competition:${competitionId}`,
          })
        }
      })

      // Listen for match result updates
      onMatchResultUpdated((data) => {
        if (competition) {
          // Update competition data with new result
          const updatedCompetition = {
            ...competition,
            matches: competition.matches.map((match: Match) =>
              match.id === data.matchId
                ? { ...match, result: data.result }
                : match
            ),
          }
          // Update local state
          mutate(`/api/competitions/${competitionId}`, "PUT", updatedCompetition, {
            cacheKey: `competition:${competitionId}`,
          })
        }
      })

      // Cleanup on unmount
      return () => {
        leaveCompetition(competitionId)
      }
    }
  }, [socket, competitionId, competition, joinCompetition, leaveCompetition, onPredictionUpdated, onMatchResultUpdated, mutate])

  const submitPrediction = useCallback(
    async (matchId: string, prediction: string) => {
      try {
        // Emit prediction update through socket
        updatePrediction({
          competitionId,
          matchId,
          prediction,
          userId: "current-user-id", // Replace with actual user ID
        })

        // Track prediction event
        trackEvent("prediction_submitted", {
          competitionId,
          matchId,
          prediction,
        })
      } catch (error) {
        trackError(error as Error)
        throw error
      }
    },
    [competitionId, updatePrediction]
  )

  const joinCompetitionAction = useCallback(async () => {
    try {
      const response = await mutate(
        `/api/competitions/${competitionId}/join`,
        "POST",
        {},
        {
          cacheKey: `competition:${competitionId}`,
        }
      )

      // Track join event
      trackEvent("competition_joined", {
        competitionId,
      })

      return response
    } catch (error) {
      trackError(error as Error)
      throw error
    }
  }, [competitionId, mutate])

  const leaveCompetitionAction = useCallback(async () => {
    try {
      const response = await mutate(
        `/api/competitions/${competitionId}/leave`,
        "POST",
        {},
        {
          cacheKey: `competition:${competitionId}`,
        }
      )

      // Track leave event
      trackEvent("competition_left", {
        competitionId,
      })

      return response
    } catch (error) {
      trackError(error as Error)
      throw error
    }
  }, [competitionId, mutate])

  return {
    competition,
    error,
    loading,
    submitPrediction,
    joinCompetition: joinCompetitionAction,
    leaveCompetition: leaveCompetitionAction,
  }
} 