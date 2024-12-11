import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { NeedHelpModal } from '../components'
import { HelpSchema, userService } from '../model'

export const useNeedHelp = (reset: UseFormReset<HelpSchema>) => {
  const { close } = useModal(NeedHelpModal)

  return useMutation({
    mutationKey: ['help'],
    mutationFn: userService.askForHelp,
    onSuccess() {
      reset()
      close()
      toast.success('Your help request has been sent successfully!')
    },
    onError() {
      toast.error('An error occurred while sending your help request.')
    }
  })
}
