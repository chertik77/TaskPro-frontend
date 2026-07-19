import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { boardQueries } from '@/entities/board'

import { createBoardMutation } from '@/shared/api'
import { useSidebarStore } from '@/shared/store'

export const useAddBoard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const navigate = useNavigate()

  const { setIsOpenMobile } = useSidebarStore()

  return useMutation({
    ...createBoardMutation(),
    meta: {
      invalidates: [boardQueries.lists()],
      errorMessage:
        'An error occurred while creating the board. Please try again shortly.'
    },
    onSuccess(data) {
      setIsDialogOpen(false)
      setIsOpenMobile(false)
      navigate({ to: `/dashboard/$boardId`, params: { boardId: data.id } })
    }
  })
}
