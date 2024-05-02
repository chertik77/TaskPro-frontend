import type { NeedHelpSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { userService } from 'services/user.service'

export const useNeedHelp = (
  close: () => void,
  reset: UseFormReset<NeedHelpSchemaFields>
) =>
  useMutation({
    mutationKey: ['help'],
    mutationFn: (data: NeedHelpSchemaFields) => userService.askForHelp(data),
    onSuccess: () => {
      reset()
      close()
      handleSuccessToast(
        'Your help request has been sent successfully! Our team will get back to you shortly.'
      )
    },
    onError: () => {
      handleErrorToast(
        'Oops! Something went wrong while sending your help request. Please try again.'
      )
    }
  })
