import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

export const useLogoutUser = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sessionService.logout,
    meta: {
      errorMessage:
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
    }
  })

  const logoutUser = async () => {
    await queryClient.cancelQueries({ queryKey: userQueries.current() })
    queryClient.setQueryData(userQueries.current(), null)
    await mutateAsync()
    navigate({ to: '/' })
  }

  return { logoutUser, isPending }
}
