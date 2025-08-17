import axios, { AxiosError } from 'axios'

import { env } from '../config'
import { router } from '../lib'
import { logUserOut, refreshTokens } from './apiMemoryStorage'

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true
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
        refreshTokens()

        return axiosInstance(originalRequest)
      } catch (e) {
        if (
          e instanceof AxiosError &&
          e.response?.data?.message === 'ERR_JWT_EXPIRED'
        ) {
          logUserOut()

          return router.navigate({ to: '/' })
        }

        throw e
      }
    }

    throw error
  }
)
