import { useForm as useReactHookForm, UseFormProps, UseFormReturn } from "react-hook-form"

export function useForm<TFieldValues extends Record<string, any> = Record<string, any>>(
  props?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  return useReactHookForm<TFieldValues>({
    mode: "onChange",
    ...props,
  })
} 