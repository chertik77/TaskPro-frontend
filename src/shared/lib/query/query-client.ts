import { matchQuery, MutationCache, QueryClient } from '@tanstack/react-query'

import { toast } from '../toast/toast'

const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.'

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const successMessage = mutation.meta?.successMessage

      if (successMessage) toast.success(successMessage)

      queryClient.invalidateQueries({
        predicate: query =>
          mutation.meta?.invalidates?.some(queryKey =>
            matchQuery({ queryKey }, query)
          ) ?? false
      })
    },
    onError: (error, _variables, _context, mutation) => {
      const errorMessage = mutation.meta?.errorMessage

      if (!errorMessage) return

      const message =
        typeof errorMessage === 'function' ? errorMessage(error) : errorMessage

      toast.error(message || FALLBACK_ERROR_MESSAGE)
    }
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      gcTime: 30 * 60_000, // 30 minutes,
      refetchOnWindowFocus: false
    }
  }
})
