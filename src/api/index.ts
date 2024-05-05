import type { CreateAxiosDefaults } from 'axios'

import axios from 'axios'

import { store } from 'redux/store'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL
}

export const axiosClassic = axios.create(options)
export const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const token = store.getState().user.token

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
