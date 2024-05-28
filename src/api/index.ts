import type { CreateAxiosDefaults } from 'axios'

import axios from 'axios'

import { store } from 'redux/store'

import { authService } from 'services'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL
}

export const axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(config => {
  const token = store.getState().user.tokens.accessToken

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    const refreshToken = store.getState().user.tokens.refreshToken

    if (
      error?.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getTokens({ refreshToken })
        return axiosInstance.request(originalRequest)
      } catch (error) {
        console.log(error)
      }
    }

    throw error
  }
)
