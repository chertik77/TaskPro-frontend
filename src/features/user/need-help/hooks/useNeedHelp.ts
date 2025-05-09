import type { UseFormReset } from 'react-hook-form'
import type { HelpSchema } from '../need-help.contract'

import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'

import { NeedHelpModal } from '../components/NeedHelpModal'

export const useNeedHelp = (reset: UseFormReset<HelpSchema>) => {
  const { close: closeNeedHelpModal } = useModal(NeedHelpModal)

  return useMutation({
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
