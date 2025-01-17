import { useAuthStore } from '@/shared/store'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { authService } from './auth'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const { accessToken } = useAuthStore.getState()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

createAuthRefreshInterceptor(axiosInstance, async () => {
  const { refreshToken } = useAuthStore.getState()

  return authService
    .getTokens({ refreshToken })
    .then(r => useAuthStore.getState().saveTokens(r.data))
    .catch(useAuthStore.getState().resetStore)
})
