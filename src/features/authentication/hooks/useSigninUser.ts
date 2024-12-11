import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAppDispatch } from 'hooks/redux'

import { authenticate } from 'redux/user.slice'

import { authService, SigninSchema } from '../model'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const dispatch = useAppDispatch()

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
