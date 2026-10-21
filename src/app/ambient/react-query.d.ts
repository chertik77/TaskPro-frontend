import type { QueryKey } from '@tanstack/react-query'
import type { BetterFetchError } from 'better-auth/react'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: HttpError | BetterFetchError
    mutationMeta: {
      invalidates?: QueryKey[]
      successMessage?: string
      errorMessage?:
        string | ((error?: HttpError | BetterFetchError) => string | undefined)
    }
  }
}
