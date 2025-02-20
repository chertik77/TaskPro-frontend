import type { QueryKey } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
    mutationMeta: {
      invalidates?: QueryKey[]
    }
  }
}
