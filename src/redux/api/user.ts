import { mainApi } from '.'

export const userApi = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    signup: mutation({
      query: body => ({ url: 'auth/signup', method: 'POST', body })
    }),
    signin: mutation({
      query: body => ({ url: 'auth/signin', method: 'POST', body })
    }),
    current: query({ query: () => 'auth/current' }),
    logout: mutation({
      query: () => ({ url: 'auth/logout', method: 'POST' })
    })
  })
})

export const { useSignupMutation, useSigninMutation, useLogoutMutation } =
  userApi
