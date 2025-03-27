import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      path: "/api/socketio",
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  const joinCompetition = (competitionId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("join-competition", competitionId)
    }
  }

  const leaveCompetition = (competitionId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("leave-competition", competitionId)
    }
  }

  const updatePrediction = (data: {
    competitionId: string
    matchId: string
    prediction: string
    userId: string
  }) => {
    if (socketRef.current) {
      socketRef.current.emit("update-prediction", data)
    }
  }

  const onPredictionUpdated = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on("prediction-updated", callback)
    }
  }

  const onMatchResultUpdated = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on("match-result-updated", callback)
    }
  }

  return {
    socket: socketRef.current,
    joinCompetition,
    leaveCompetition,
    updatePrediction,
    onPredictionUpdated,
    onMatchResultUpdated,
  }
} 