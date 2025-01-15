import { matchQuery, MutationCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        predicate: query =>
          mutation.meta?.invalidates?.some(queryKey =>
            matchQuery({ queryKey }, query)
          ) ?? false
      })
    }
  }),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})
