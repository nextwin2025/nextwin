export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function isValidUsername(username: string): {
  isValid: boolean
  error?: string
} {
  if (username.length < 3) {
    return {
      isValid: false,
      error: "Username must be at least 3 characters long"
    }
  }
  
  if (username.length > 20) {
    return {
      isValid: false,
      error: "Username must be no more than 20 characters long"
    }
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      isValid: false,
      error: "Username can only contain letters, numbers, underscores, and hyphens"
    }
  }

  return { isValid: true }
}

export function isValidAmount(amount: number): {
  isValid: boolean
  error?: string
} {
  if (isNaN(amount)) {
    return {
      isValid: false,
      error: "Amount must be a valid number"
    }
  }

  if (amount <= 0) {
    return {
      isValid: false,
      error: "Amount must be greater than 0"
    }
  }

  if (amount > 1000000) {
    return {
      isValid: false,
      error: "Amount cannot exceed 1,000,000"
    }
  }

  return { isValid: true }
}

export function isValidPrediction(prediction: number): {
  isValid: boolean
  error?: string
} {
  if (isNaN(prediction)) {
    return {
      isValid: false,
      error: "Prediction must be a valid number"
    }
  }

  if (prediction < 0) {
    return {
      isValid: false,
      error: "Prediction cannot be negative"
    }
  }

  if (!Number.isInteger(prediction)) {
    return {
      isValid: false,
      error: "Prediction must be a whole number"
    }
  }

  return { isValid: true }
}

 