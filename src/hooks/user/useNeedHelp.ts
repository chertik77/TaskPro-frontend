import type { HelpSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { NeedHelpModal } from 'components/dashboard/modals'

import { useAppMutation } from 'hooks'

import { userService } from 'services'

export const useNeedHelp = (reset: UseFormReset<HelpSchema>) => {
  const { close } = useModal(NeedHelpModal)

  return useAppMutation<HelpSchema>({
    mutationKey: ['help'],
    mutationFn: userService.askForHelp,
    onSuccess() {
      reset()
      close()
      toast.success('Your help request has been sent successfully!')
    },
    toastErrorMessage: 'An error occurred while sending your help request.'
  })
}
