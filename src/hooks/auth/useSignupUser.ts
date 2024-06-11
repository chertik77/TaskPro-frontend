import type { SignupSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { AuthResponse } from 'types'

import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { useAppMutation } from 'hooks'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const dispatch = useDispatch()

  return useAppMutation<SignupSchema, AuthResponse>({
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
