import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { HelpSchema } from '../need-help.contract'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'

export const useNeedHelp = (
  reset: UseFormReset<HelpSchema>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: userService.askForHelp,
    onSuccess() {
      reset()
      setIsDialogOpen(false)
      toast.success('Your help request has been sent successfully!')
    },
    onError() {
      toast.error('We couldn’t send your help request. Please try again.')
    }
  })
