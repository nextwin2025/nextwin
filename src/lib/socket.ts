import { Server as NetServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import { NextApiResponse } from "next"
import { Socket as NetSocket } from "net"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export const initSocket = (server: NetServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
    path: "/api/socketio",
  })

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    // Join competition room
    socket.on("join-competition", (competitionId: string) => {
      socket.join(`competition:${competitionId}`)
      console.log(`Client ${socket.id} joined competition: ${competitionId}`)
    })

    // Leave competition room
    socket.on("leave-competition", (competitionId: string) => {
      socket.leave(`competition:${competitionId}`)
      console.log(`Client ${socket.id} left competition: ${competitionId}`)
    })

    // Handle prediction updates
    socket.on("update-prediction", (data: {
      competitionId: string
      matchId: string
      prediction: string
      userId: string
    }) => {
      io.to(`competition:${data.competitionId}`).emit("prediction-updated", data)
      console.log(`Prediction updated for match ${data.matchId} in competition ${data.competitionId}`)
    })

    // Handle match result updates
    socket.on("update-match-result", (data: {
      competitionId: string
      matchId: string
      result: string
    }) => {
      io.to(`competition:${data.competitionId}`).emit("match-result-updated", data)
      console.log(`Match result updated for match ${data.matchId} in competition ${data.competitionId}`)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)
    })
  })

  return io
} 