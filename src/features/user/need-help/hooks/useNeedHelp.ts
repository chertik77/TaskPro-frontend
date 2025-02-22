import type { UserTypes } from '@/entities/user'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { userService } from '@/entities/user'

import { NeedHelpModal } from '../components/NeedHelpModal'

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
