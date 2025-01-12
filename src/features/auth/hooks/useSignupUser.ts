import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../auth.schema'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai/react'
import { toast } from 'sonner'

import { userAtom } from 'features/user/user.atom'

import { authService } from '../auth.service'
import { AuthCacheKeys } from '../config'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const setUser = useSetAtom(userAtom)

  const navigate = useNavigate()

  return useMutation({
    mutationKey: [AuthCacheKeys.Signup],
    mutationFn: authService.signup,
    onSuccess(data) {
      reset()
      navigate({ to: '/dashboard' })
      setUser(data)
    },
    onError: e =>
      toast.error(
        e.response?.status === 409
          ? 'An account with this email address already exists. Please sign in or use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
      )
  })
}
