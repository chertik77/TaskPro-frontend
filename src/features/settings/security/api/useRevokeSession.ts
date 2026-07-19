import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useRevokeSession = () => {
  const { data: currentSession } = useQuery(sessionQueries.current())

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      authClient.revokeSessionById({ id }),
    meta: {
      invalidates: [sessionQueries.lists()],
      errorMessage:
        'An error occurred while revoking the session. Please try again shortly.'
    },
    onSuccess: (_, variables) => {
      if (variables.id === currentSession?.session.id) {
        navigate({ to: '/' })
        queryClient.setQueryData(sessionQueries.all(), null)
        authClient.signOut()
      }
    }
  })
}
