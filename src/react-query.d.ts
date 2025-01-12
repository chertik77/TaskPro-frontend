import type { AxiosError } from 'axios'

declare module '@tanstack/react-query' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    defaultError: AxiosError
  }
}
