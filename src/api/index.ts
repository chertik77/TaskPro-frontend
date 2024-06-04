import type { CreateAxiosDefaults } from 'axios'

import axios from 'axios'

import { store } from 'redux/store'
import { logout, saveTokens } from 'redux/user.slice'

import { authService } from 'services'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL
}

export const axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(config => {
  const token = store.getState().user.accessToken

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    const refreshToken = store.getState().user.refreshToken

    if (
      error?.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await authService.getTokens({ refreshToken })

        store.dispatch(saveTokens(response))

        return axiosInstance.request(originalRequest)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.response?.status === 403) store.dispatch(logout())
      }
    }

    throw error
  }
)
