import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../auth.schema'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAppDispatch } from 'hooks/redux'

import { authenticate } from 'redux/user.slice'

import { authService } from '../auth.service'
import { AuthCacheKeys } from '../config'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationKey: [AuthCacheKeys.Signup],
    mutationFn: authService.signup,
    onSuccess(data) {
      reset()
      dispatch(authenticate(data))
    },
    onError: e =>
      toast.error(
        e.response?.status === 409
          ? 'Another user is already registered with the provided email address. Please use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
      )
  })
}
