import { dashboardApi } from './dashboard'

export const taskApi = dashboardApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    addNewCard: mutation({
      query: ({ boardId, columnId, body }) => ({
        url: `/dashboard/${boardId}/${columnId}`,
        method: 'POST',
        body
      })
    }),
    editCard: mutation({
      query: ({ boardId, columnId, cardId, body }) => ({
        url: `/dashboard/${boardId}/${columnId}/${cardId}`,
        method: 'PATCH',
        body
      })
    }),
    deleteCard: mutation({
      query: ({ boardId, cardId, columnId }) => ({
        url: `/dashboard/${boardId}/${columnId}/${cardId}`,
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
