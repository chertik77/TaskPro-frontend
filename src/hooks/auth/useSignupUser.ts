import type { SignupSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAppDispatch } from 'hooks/redux'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationKey: ['signup'],
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
