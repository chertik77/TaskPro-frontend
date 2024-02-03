import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from 'redux/store'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    }
  }),
  endpoints: ({ query, mutation }) => ({
    signup: mutation({
      query: data => ({ url: 'auth/signup', method: 'POST', body: data })
    }),
    signin: mutation({
      query: data => ({ url: 'auth/signin', method: 'POST', body: data })
    }),
    current: query({ query: () => 'auth/current' }),
    logout: mutation({
      query: () => ({ url: 'auth/logout', method: 'POST' })
    })
  })
})

export const { useSignupMutation, useSigninMutation, useLogoutMutation } =
  userApi
