import axios from 'axios'
import { createAuthRefresh } from 'axios-auth-refresh'

import { env } from '../config'
import { router } from '../lib'
import { logUserOut, refreshTokens } from './apiMemoryStorage'

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true
})

createAuthRefresh(axiosInstance, async () => {
  try {
    await refreshTokens()

    return Promise.resolve()
  } catch (e) {
    logUserOut()
    router.navigate({ to: '/' })

    return Promise.reject(e)
  }
})
