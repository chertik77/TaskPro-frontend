import { useMutation } from '@tanstack/react-query'

import { sessionService } from '@/entities/session'

export const useInitiateGoogleSignin = () =>
  useMutation({
    mutationFn: sessionService.initiateGoogleSignin,
    onSuccess({ redirectUrl }) {
      window.location.href = redirectUrl
    }
  })
