import { matchQuery, MutationCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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

      if (errorMessage) {
        if (typeof errorMessage === 'string') {
          toast.error(errorMessage)
        } else if (typeof errorMessage === 'function') {
          toast.error(errorMessage(error))
        }
      }
    }
  }),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})
