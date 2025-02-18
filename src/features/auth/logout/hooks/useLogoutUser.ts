import { authService, useAuthStore } from '@/entities/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const useLogoutUser = () => {
  const resetStore = useAuthStore(state => state.resetStore)

  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['logout'],
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
