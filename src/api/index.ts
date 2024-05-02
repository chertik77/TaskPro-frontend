import type { CreateAxiosDefaults } from 'axios'

import axios from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL
}

export const axiosClassic = axios.create(options)
