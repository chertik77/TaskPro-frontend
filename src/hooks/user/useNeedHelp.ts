import type { HelpSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { NeedHelpModal } from 'components/dashboard/modals'

import { CacheKeys } from 'config'
import { userService } from 'services'

export const useNeedHelp = (reset: UseFormReset<HelpSchema>) => {
  const { close } = useModal(NeedHelpModal)

  return useMutation({
    mutationKey: [CacheKeys.UserHelp],
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
