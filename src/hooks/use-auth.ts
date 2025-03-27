import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { trackError, setUserContext, clearUserContext } from "@/lib/monitoring"
import { AuthenticationError } from "@/lib/errors"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData extends LoginCredentials {
  name: string
}

interface UserContext {
  id: string
  email: string
  name: string | null | undefined
  isAuthenticated: boolean
}

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userContext, setUserContext] = useState<UserContext>({
    id: "",
    email: "",
    name: undefined,
    isAuthenticated: false,
  })

  const login = useCallback(
    async (provider: string) => {
      try {
        const result = await signIn(provider, {
          redirect: false,
        })

        if (result?.error) {
          throw new AuthenticationError(result.error)
        }

        router.push("/dashboard")
      } catch (error) {
        trackError(error)
        throw error
      }
    },
    [router]
  )

  const logout = useCallback(async () => {
    try {
      await signOut({ redirect: false })
      router.push("/")
    } catch (error) {
      trackError(error)
      throw error
    }
  }, [router])

  // Set user context in monitoring when session changes
  useEffect(() => {
    if (session?.user) {
      setUserContext({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name || undefined,
        isAuthenticated: true,
      })
    } else {
      clearUserContext()
    }
  }, [session])

  return {
    user: userContext,
    isAuthenticated: userContext.isAuthenticated,
    isLoading: status === "loading",
    login,
    logout,
  }
} 