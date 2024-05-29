import type { SigninSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { AuthResponse } from 'types'

import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { useAppMutation } from 'hooks/useAppMutation'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const dispatch = useDispatch()

  return useAppMutation<SigninSchema, AuthResponse>({
    mutationKey: ['signin'],
    mutationFn: data => authService.signin(data),
    onSuccess(data) {
      reset()
      dispatch(authenticate(data))
    },
    onError: e =>
      toast.error(
        e.response?.status === 401
          ? 'Sign-in failed. The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
      )
  })
}
