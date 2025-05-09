import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authService } from '@/shared/api/auth'
import { useAuthStore } from '@/shared/store'

export const useLogoutUser = () => {
  const resetStore = useAuthStore(state => state.resetStore)

  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess() {
      navigate({ to: '/' })
      resetStore()
    },
    onError() {
      toast.error(
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
