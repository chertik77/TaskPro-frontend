import type { QueryKey } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { BetterFetchError } from 'better-auth/react'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError | BetterFetchError
    mutationMeta: {
      invalidates?: QueryKey[]
      successMessage?: string
      errorMessage?:
        string | ((error?: AxiosError | BetterFetchError) => string | undefined)
    }
  }
}
