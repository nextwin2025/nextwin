import http from "k6/http"
import { check, sleep } from "k6"
import { Rate } from "k6/metrics"

// Custom metrics
const errorRate = new Rate("errors")

// Test configuration
export const options = {
  stages: [
    { duration: "1m", target: 50 },  // Ramp up to 50 users
    { duration: "3m", target: 50 },  // Stay at 50 users
    { duration: "1m", target: 100 }, // Ramp up to 100 users
    { duration: "3m", target: 100 }, // Stay at 100 users
    { duration: "1m", target: 200 }, // Ramp up to 200 users
    { duration: "3m", target: 200 }, // Stay at 200 users
    { duration: "1m", target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should complete within 500ms
    errors: ["rate<0.1"],             // Error rate should be less than 10%
  },
}

// Test data
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000"
const TEST_USER = {
  email: "test@example.com",
  password: "testpassword123",
}

// Helper functions
function login() {
  const response = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify(TEST_USER), {
    headers: { "Content-Type": "application/json" },
  })
  check(response, {
    "login successful": (r) => r.status === 200,
  })
  return response.json("token")
}

function getCompetitions(token) {
  const response = http.get(`${BASE_URL}/api/competitions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  check(response, {
    "get competitions successful": (r) => r.status === 200,
  })
  return response.json()
}

function submitPrediction(token, competitionId, matchId) {
  const prediction = {
    matchId,
    prediction: Math.random() > 0.5 ? "home" : "away",
  }
  const response = http.post(
    `${BASE_URL}/api/competitions/${competitionId}/predictions`,
    JSON.stringify(prediction),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
  check(response, {
    "submit prediction successful": (r) => r.status === 200,
  })
}

// Main test scenario
export default function () {
  // Login and get token
  const token = login()
  if (!token) {
    errorRate.add(1)
    return
  }

  // Get competitions
  const competitions = getCompetitions(token)
  if (!competitions || competitions.length === 0) {
    errorRate.add(1)
    return
  }

  // Submit prediction for a random competition
  const competition = competitions[Math.floor(Math.random() * competitions.length)]
  const match = competition.matches[Math.floor(Math.random() * competition.matches.length)]
  submitPrediction(token, competition.id, match.id)

  // Simulate user think time
  sleep(Math.random() * 3 + 1)
} 