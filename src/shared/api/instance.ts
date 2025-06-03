import axios, { AxiosError } from 'axios'

import { router } from '../lib/react-router'
import { authActions, getAuthStore } from '../store'
import { authService } from './auth'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const {
    tokens: { accessToken }
  } = getAuthStore()

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
        const {
          tokens: { refreshToken }
        } = getAuthStore()

        const tokens = await authService.getTokens({ refreshToken })

        authActions.setTokens(tokens)

        return axiosInstance(originalRequest)
      } catch (e) {
        if (
          e instanceof AxiosError &&
          e.response?.data?.message === 'ERR_JWT_EXPIRED'
        ) {
          authActions.logout()

          return router.navigate({ to: '/' })
        }

        throw e
      }
    }

    throw error
  }
)
