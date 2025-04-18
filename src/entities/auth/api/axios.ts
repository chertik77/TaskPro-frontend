import axios, { AxiosError } from 'axios'

import { router } from '@/shared/lib/react-router'

import { useAuthStore } from '../model/store'
import { authService } from './service'

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

      try {
        const { refreshToken } = useAuthStore.getState()

        const tokens = await authService.getTokens(refreshToken)

        useAuthStore.getState().saveTokens(tokens)

        return axiosInstance(originalRequest)
      } catch (e) {
        if (
          e instanceof AxiosError &&
          e.response?.data?.message === 'ERR_JWT_EXPIRED'
        ) {
          useAuthStore.getState().resetStore()

          return router.navigate({ to: '/' })
        }

        throw e
      }
    }

    throw error
  }
)
