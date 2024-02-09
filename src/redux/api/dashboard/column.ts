import { dashboardApi } from './dashboard'

const columnApi = dashboardApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAllColumns: query({
      query: boardName => `/dashboard/:${boardName}/columns`
    }),
    addNewColumn: mutation({
      query: ({ boardName, columnTitle }) => ({
        clg: console.log(boardName, columnTitle),
        url: `/dashboard/${boardName}`,
        method: 'POST',
        title: columnTitle
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
