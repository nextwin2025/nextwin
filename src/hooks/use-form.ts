/// <reference types="react" />
/// <reference types="zod" />

import { useState, useCallback, FormEvent } from "react"
import { z } from "zod"
import { trackError } from "@/lib/monitoring"
import { ValidationError } from "@/lib/errors"

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>
  onSubmit: (data: T) => Promise<void>
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useForm<T extends Record<string, any>>({
  schema,
  onSubmit,
  onSuccess,
  onError,
}: UseFormOptions<T>) {
  const [formData, setFormData] = useState<T>({} as T)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setFormData((prev: T) => ({ ...prev, [field]: value }))
      // Clear error when field is modified
      if (errors[field]) {
        setErrors((prev: Partial<Record<keyof T, string>>) => ({ ...prev, [field]: undefined }))
      }
    },
    [errors]
  )

  const validateField = useCallback(
    (field: keyof T, value: any) => {
      try {
        schema.shape[field].parse(value)
        setErrors((prev: Partial<Record<keyof T, string>>) => ({ ...prev, [field]: undefined }))
        return true
      } catch (error: unknown) {
        const zodError = error as z.ZodError
        if (zodError instanceof z.ZodError) {
          setErrors((prev: Partial<Record<keyof T, string>>) => ({
            ...prev,
            [field]: zodError.errors[0].message,
          }))
        }
        return false
      }
    },
    [schema]
  )

  const validateForm = useCallback(() => {
    try {
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error: unknown) {
      const zodError = error as z.ZodError
      if (zodError instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {}
        zodError.errors.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof T
          newErrors[field] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }, [formData, schema])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)

      try {
        await onSubmit(formData)
        onSuccess?.()
      } catch (error) {
        const appError = error instanceof Error ? error : new Error("An unexpected error occurred")
        trackError(appError)
        onError?.(appError)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, onSubmit, onSuccess, onError, validateForm]
  )

  const resetForm = useCallback(() => {
    setFormData({} as T)
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    validateField,
  }
} 