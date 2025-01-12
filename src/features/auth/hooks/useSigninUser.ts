import type { UseFormReset } from 'react-hook-form'
import type { SigninSchema } from '../auth.schema'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authenticate } from 'features/user/user.slice'

import { useAppDispatch } from 'hooks/redux'

import { authService } from '../auth.service'
import { AuthCacheKeys } from '../config'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  return useMutation({
    mutationKey: [AuthCacheKeys.Signin],
    mutationFn: authService.signin,
    onSuccess(data) {
      reset()
      navigate({ to: '/dashboard' })
      dispatch(authenticate(data))
    },
    onError: e =>
      toast.error(
        e.response?.status === 401
          ? 'The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
      )
  })
}
