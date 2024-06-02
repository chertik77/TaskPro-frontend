import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

type UseAppMutationProps = {
  toastErrorMessage?: string
}

export const useAppMutation = <T = void, R = void>({
  mutationKey,
  mutationFn,
  toastErrorMessage,
  ...options
}: UseMutationOptions<R, AxiosError, T> & UseAppMutationProps) =>
  useMutation({
    mutationKey,
    mutationFn,
    onError() {
      toast.error(toastErrorMessage)
    },
    ...options
  })
