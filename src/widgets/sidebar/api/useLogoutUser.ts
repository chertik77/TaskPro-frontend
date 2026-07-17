import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { resetSettings } from '@/entities/settings'
import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useLogoutUser = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authClient.signOut(),
    meta: {
      errorMessage:
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
    }
  })

  const logoutUser = async () => {
    navigate({ to: '/' })
    resetSettings()
    queryClient.setQueryData(sessionQueries.all(), null)
    await mutateAsync()
  }

  return { logoutUser, isPending }
}
