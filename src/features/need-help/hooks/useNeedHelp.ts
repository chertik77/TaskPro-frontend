import type { UserTypes } from '@/shared/api/user'
import type { UseFormReset } from 'react-hook-form'

import { userService } from '@/shared/api/user'
import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { NeedHelpModal } from '../components'

export const useNeedHelp = (reset: UseFormReset<UserTypes.HelpSchema>) => {
  const { close: closeNeedHelpModal } = useModal(NeedHelpModal)

  return useMutation({
    mutationKey: ['needHelp'],
    mutationFn: userService.askForHelp,
    onSuccess() {
      reset()
      closeNeedHelpModal()
      toast.success('Your help request has been sent successfully!')
    },
    onError() {
      toast.error('We couldn’t send your help request. Please try again.')
    }
  })
}
