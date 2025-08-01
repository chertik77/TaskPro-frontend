import { useMutation } from '@tanstack/react-query'

import { sessionService } from '@/entities/session'

export const useInitiateGoogleSignin = () =>
  useMutation({
    mutationFn: sessionService.initiateGoogleSignin,
    meta: {
      errorMessage:
        'An error occurred while logging in with Google. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess({ redirectUrl }) {
      window.location.href = redirectUrl
    }
  })
