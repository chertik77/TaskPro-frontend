import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { HelpSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { userService } from '@/entities/user'

export const useNeedHelp = (
  reset: UseFormReset<HelpSchema>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: userService.askForHelp,
    meta: {
      successMessage: 'Your help request has been sent successfully!',
      errorMessage: 'We couldn’t send your help request. Please try again.'
    },
    onSuccess() {
      reset()
      setIsDialogOpen(false)
    }
  })
