import { useForm as useReactHookForm, UseFormProps, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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