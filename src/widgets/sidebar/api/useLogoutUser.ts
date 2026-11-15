import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { clearUserCache } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useLogoutUser = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: () => authClient.signOut(),
    meta: {
      errorMessage:
        'An error occurred while logging out. Our technical team has been notified. Please try again.'
    },
    onSuccess: () => {
      clearUserCache(queryClient)
      navigate({ to: '/' })
    }
  })

  return { logoutUser, isPending }
}
