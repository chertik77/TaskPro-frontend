import { dashboardApi } from './dashboard'

const boardApi = dashboardApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAllBoards: query({ query: () => '/dashboard' }),
    getBoardByName: query({ query: boardName => `/dashboard/:${boardName}` }),
    addNewBoard: mutation({
      query: body => ({ url: '/dashboard', method: 'POST', body })
    }),
    editBoard: mutation({
      query: ({ boardName, body }) => ({
        url: `/dashboard/:${boardName}`,
        method: 'PATCH',
        body
      })
    }),
    deleteBoard: mutation({
      query: boardName => ({
        url: `/dashboard/:${boardName}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllBoardsQuery,
  useGetBoardByNameQuery,
  useAddNewBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation
} = boardApi
