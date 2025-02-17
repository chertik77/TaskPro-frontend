import axios from 'axios'

import { useAuthStore } from '@/shared/store'

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

axiosInstance.interceptors.response.use(
  r => r,
  async error => {
    const originalRequest = error.config

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !error.config.skipAuthRefresh
    ) {
      originalRequest._retry = true

      const { refreshToken } = useAuthStore.getState()

      await authService
        .getTokens(refreshToken)
        .then(tokens => useAuthStore.getState().saveTokens(tokens))
        .catch(useAuthStore.getState().resetStore)

      return axiosInstance(originalRequest)
    }
  }
)
