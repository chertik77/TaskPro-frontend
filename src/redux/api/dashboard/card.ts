import { dashboardApi } from './dashboard'

export const taskApi = dashboardApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    addNewCard: mutation({
      query: ({ boardName, columnId, body }) => ({
        url: `/dashboard/${boardName}/${columnId}`,
        method: 'POST',
        body
      })
    }),
    editCard: mutation({
      query: ({ boardName, columnId, cardId, body }) => ({
        url: `/dashboard/${boardName}/${columnId}/${cardId}`,
        method: 'PATCH',
        body
      })
    }),
    deleteCard: mutation({
      query: ({ boardName, cardId, columnId }) => ({
        url: `/dashboard/${boardName}/${columnId}/${cardId}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useAddNewCardMutation,
  useEditCardMutation,
  useDeleteCardMutation
} = taskApi
