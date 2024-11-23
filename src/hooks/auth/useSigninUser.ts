import type { SigninSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const dispatch = useDispatch()

  return useMutation({
    mutationKey: ['signin'],
    mutationFn: authService.signin,
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
