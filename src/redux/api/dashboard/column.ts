import { dashboardApi } from './dashboard'

export const columnApi = dashboardApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    addNewColumn: mutation({
      query: ({ boardId, body }) => ({
        url: `/dashboard/${boardId}`,
        method: 'POST',
        body
      })
    }),
    editColumn: mutation({
      query: ({ boardId, columnId, body }) => ({
        url: `/dashboard/${boardId}/${columnId}`,
        method: 'PATCH',
        body
      })
    }),
    deleteColumn: mutation({
      query: ({ boardId, columnId }) => ({
        url: `/dashboard/${boardId}/${columnId}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useAddNewColumnMutation,
  useEditColumnMutation,
  useDeleteColumnMutation
} = columnApi
