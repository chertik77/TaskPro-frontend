import 'axios'

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean
  }
}
