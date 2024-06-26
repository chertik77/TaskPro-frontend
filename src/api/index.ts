import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { store } from 'redux/store'
import { logout, saveTokens } from 'redux/user.slice'

import { authService } from 'services'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const token = store.getState().user.accessToken

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

createAuthRefreshInterceptor(axiosInstance, async () => {
  const refreshToken = store.getState().user.refreshToken

  authService
    .getTokens({ refreshToken })
    .then(r => store.dispatch(saveTokens(r)))
    .catch(() => store.dispatch(logout()))
})
