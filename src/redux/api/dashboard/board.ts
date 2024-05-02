import type { BoardInitialState } from 'redux/slices/board/board-types'

import { dashboardApi } from './dashboard'

export const boardApi = dashboardApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAllBoards: query<{ data: BoardInitialState['board'][] }, undefined>({
      query: () => '/dashboard'
    }),
    getBoardById: query<BoardInitialState['board'], string>({
      query: boardId => `/dashboard/${boardId}`
    }),
    addNewBoard: mutation({
      query: body => ({ url: '/dashboard', method: 'POST', body })
    }),
    editBoard: mutation({
      query: ({ boardId, body }) => ({
        url: `/dashboard/${boardId}`,
        method: 'PATCH',
        body
      })
    }),
    deleteBoard: mutation({
      query: boardId => ({
        url: `/dashboard/${boardId}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllBoardsQuery,
  useAddNewBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation
} = boardApi
