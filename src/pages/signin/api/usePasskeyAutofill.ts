import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const usePasskeyAutofill = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false

    authClient.signIn.passkey({ autoFill: true }).then(({ data, error }) => {
      if (error || ignore) return

      queryClient.setQueryData(sessionQueries.currents(), data)
      navigate({ to: '/dashboard' })
    })

    return () => {
      ignore = true
    }
  }, [queryClient, navigate])
}
