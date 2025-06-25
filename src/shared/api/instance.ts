import axios, { AxiosError } from 'axios'

import { env } from '../config'
import { router } from '../lib'
import {
  getApiAccessToken,
  getRefreshedTokens,
  logUserOut,
  setTokens
} from './apiMemoryStorage'

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const accessToken = getApiAccessToken()

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
        const tokens = await getRefreshedTokens()

        setTokens(tokens)

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
