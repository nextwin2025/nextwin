import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { trackError, setUserContext, clearUserContext } from "@/lib/monitoring"
import { AuthenticationError } from "@/lib/errors"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData extends LoginCredentials {
  name: string
}

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const result = await signIn("credentials", {
          ...credentials,
          redirect: false,
        })

        if (result?.error) {
          throw new AuthenticationError(result.error)
        }

        if (result?.ok) {
          router.push("/dashboard")
        }
      } catch (error) {
        trackError(error as Error)
        throw error
      }
    },
    [router]
  )

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new AuthenticationError(error.message)
        }

        // After successful registration, log the user in
        await login({
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        trackError(error as Error)
        throw error
      }
    },
    [login]
  )

  const logout = useCallback(async () => {
    try {
      await signOut({ redirect: false })
      clearUserContext()
      router.push("/")
    } catch (error) {
      trackError(error as Error)
      throw error
    }
  }, [router])

  const updateProfile = useCallback(
    async (data: { name?: string; email?: string }) => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message)
        }

        // Refresh the session to get updated user data
        router.refresh()
      } catch (error) {
        trackError(error as Error)
        throw error
      }
    },
    [router]
  )

  const changePassword = useCallback(
    async (data: {
      currentPassword: string
      newPassword: string
    }) => {
      try {
        const response = await fetch("/api/user/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message)
        }
      } catch (error) {
        trackError(error as Error)
        throw error
      }
    },
    []
  )

  // Set user context in monitoring when session changes
  useEffect(() => {
    if (session?.user) {
      setUserContext({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name,
      })
    } else {
      clearUserContext()
    }
  }, [session])

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  }
} 