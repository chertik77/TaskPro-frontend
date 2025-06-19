import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService, useSessionStore } from '@/entities/session'

export const useLogoutUser = () => {
  const { logout } = useSessionStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: sessionService.logout,
    meta: {
      errorMessage:
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess() {
      navigate({ to: '/' })
      logout()
    }
  })
}
