import axios, { AxiosError } from 'axios'

// eslint-disable-next-line project-structure/independent-modules
import {
  getSessionStore,
  sessionActions,
  sessionService
} from '@/entities/session'

import { env } from '../config'
import { router } from '../lib'

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const {
    tokens: { accessToken }
  } = getSessionStore()

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
        } = getSessionStore()

        const tokens = await sessionService.getTokens({ refreshToken })

        sessionActions.setTokens(tokens)

        return axiosInstance(originalRequest)
      } catch (e) {
        if (
          e instanceof AxiosError &&
          e.response?.data?.message === 'ERR_JWT_EXPIRED'
        ) {
          sessionActions.logout()

          return router.navigate({ to: '/' })
        }

        throw e
      }
    }

    throw error
  }
)
