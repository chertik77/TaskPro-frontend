import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { authTokenService } from 'features/auth/auth-token.service'
import { authService } from 'features/auth/auth.service'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const tokens = authTokenService.getTokens()

  if (config?.headers && tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
  }

  return config
})

createAuthRefreshInterceptor(axiosInstance, async () => {
  const tokens = authTokenService.getTokens()

  return authService
    .getTokens({ refreshToken: tokens?.refreshToken as string })
    .catch(authTokenService.removeTokens)
})
