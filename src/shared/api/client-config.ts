import type { CreateClientConfig } from './generated/client'

import { env } from '../config'

export const createClientConfig: CreateClientConfig = config => ({
  ...config,
  baseUrl: env.VITE_API_BASE_URL,
  credentials: 'include'
})
