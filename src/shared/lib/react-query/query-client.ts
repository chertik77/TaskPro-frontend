import { matchQuery, MutationCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage)
      }

      queryClient.invalidateQueries({
        predicate: query =>
          mutation.meta?.invalidates?.some(queryKey =>
            matchQuery({ queryKey }, query)
          ) ?? false
      })
    },
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        if (typeof mutation.meta.errorMessage === 'string') {
          toast.error(mutation.meta.errorMessage)
        } else if (typeof mutation.meta.errorMessage === 'function') {
          toast.error(mutation.meta.errorMessage(error))
        }
      }
    }
  }),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})
