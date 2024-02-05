import { dashboardApi } from './dashboard'

const columnApi = dashboardApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAllColumns: query({
      query: boardName => `/dashboard/:${boardName}/columns`
    }),
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
  useGetAllColumnsQuery,
  useAddNewColumnMutation,
  useEditColumnMutation,
  useDeleteColumnMutation
} = columnApi
