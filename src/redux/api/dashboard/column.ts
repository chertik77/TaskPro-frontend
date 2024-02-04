import { dashboardApi } from './dashboard'

const columnApi = dashboardApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    addNewColumn: mutation({
      query: ({ boardName, body }) => ({
        url: `/dashboard/:${boardName}`,
        method: 'POST',
        body
      })
    }),
    editColumn: mutation({
      query: ({ boardName, columnId, body }) => ({
        url: `/dashboard/:${boardName}/:${columnId}`,
        method: 'PATCH',
        body
      })
    }),
    deleteColumn: mutation({
      query: ({ boardName, columnId }) => ({
        url: `/dashboard/:${boardName}/:${columnId}`,
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
