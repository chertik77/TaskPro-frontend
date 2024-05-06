import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseAppMutationProps = {
  invalidateQueryKey?: string
}

export const useAppMutation = <T = void, R = void>({
  mutationKey,
  mutationFn,
  invalidateQueryKey
}: UseMutationOptions<R, AxiosError, T> & UseAppMutationProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [invalidateQueryKey ?? 'board']
      })
    }
  })
}
