import { useForm as useReactHookForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { trackError } from "@/lib/monitoring"

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>
  onSubmit: (data: T) => Promise<void>
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useForm<T extends z.ZodType>(
  schema: T,
  props?: Omit<UseFormProps<z.infer<T>>, "resolver">
): UseFormReturn<z.infer<T>> {
  return useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    ...props,
  })
}

export function useFormWithValidation<T extends Record<string, any>>({
  schema,
  onSubmit,
  onSuccess,
  onError,
}: UseFormOptions<T>) {
  const [formData, setFormData] = useState<T>({} as T)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (field: keyof T, value: any) => {
    setFormData((prev: T) => ({ ...prev, [field]: value }))
    // Clear error when field is modified
    if (errors[field]) {
      setErrors((prev: Partial<Record<keyof T, string>>) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {}
        error.errors.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof T
          newErrors[field] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
  }

  const resetForm = () => {
    setFormData({} as T)
    setErrors({})
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  }
} 