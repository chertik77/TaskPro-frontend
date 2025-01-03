import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { store } from 'store'

import { authService } from 'features/auth/auth.service'
import { logout, saveTokens } from 'features/user/user.slice'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const { accessToken } = store.getState().user

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

createAuthRefreshInterceptor(axiosInstance, async () => {
  const { refreshToken } = store.getState().user

  return authService
    .getTokens({ refreshToken })
    .then(r => store.dispatch(saveTokens(r.data)))
    .catch(() => store.dispatch(logout()))
})
