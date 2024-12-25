import type { UseFormReset } from 'react-hook-form'
import type { HelpSchema } from '../user.schema'

import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { NeedHelpModal } from '../components/modals'
import { UserCacheKeys } from '../config'
import { userService } from '../user.service'

export const useNeedHelp = (reset: UseFormReset<HelpSchema>) => {
  const { close } = useModal(NeedHelpModal)

  return useMutation({
    mutationKey: [UserCacheKeys.UserHelp],
    mutationFn: userService.askForHelp,
    onSuccess() {
      reset()
      close()
      toast.success('Your help request has been sent successfully!')
    },
    onError() {
      toast.error('We couldn’t send your help request. Please try again.')
    }
  })
}
