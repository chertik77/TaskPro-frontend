import type { RootState } from 'redux/store'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    }
  }),
  endpoints: () => ({})
})
