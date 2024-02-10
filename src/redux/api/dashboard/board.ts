import type { BoardInitialState } from 'redux/slices/board/board-types'
import { dashboardApi } from './dashboard'

export const boardApi = dashboardApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAllBoards: query<{ data: BoardInitialState['board'][] }, undefined>({
      query: () => '/dashboard'
    }),
    getBoardByName: query<BoardInitialState['board'], string>({
      query: boardName => `/dashboard/${boardName}`
    }),
    addNewBoard: mutation({
      query: body => ({ url: '/dashboard', method: 'POST', body })
    }),
    editBoard: mutation({
      query: ({ boardName, body }) => ({
        url: `/dashboard/${boardName}`,
        method: 'PATCH',
        body
      })
    }),
    deleteBoard: mutation({
      query: boardName => ({
        url: `/dashboard/${boardName}`,
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
