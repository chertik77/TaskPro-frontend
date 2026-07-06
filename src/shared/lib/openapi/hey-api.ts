import type { CreateClientConfig } from '@/shared/api/generated/client'

import { env } from '@/shared/config'

export const createClientConfig: CreateClientConfig = config => ({
  ...config,
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true
})
