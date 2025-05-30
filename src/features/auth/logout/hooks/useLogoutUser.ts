import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { authService } from '@/shared/api/auth'
import { useAuthStore } from '@/shared/store'

export const useLogoutUser = () => {
  const { logout } = useAuthStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.logout,
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
