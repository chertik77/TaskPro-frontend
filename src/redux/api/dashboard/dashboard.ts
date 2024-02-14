import { mainApi } from '..'

export const dashboardApi = mainApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    switchTheme: mutation({
      query: body => ({
        url: '/dashboard/theme',
        method: 'PATCH',
        body
      })
    }),
    needHelp: mutation({
      query: body => ({ url: '/dashboard/help', method: 'POST', body })
    })
  })
})

export const { useSwitchThemeMutation, useNeedHelpMutation } = dashboardApi
