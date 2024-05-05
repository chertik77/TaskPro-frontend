import type { UseMutationOptions } from '@tanstack/react-query'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

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
    mutationKey: [mutationKey],
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [invalidateQueryKey ?? 'board']
      })
    }
  })
}
