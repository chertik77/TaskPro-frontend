import { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const AccountOAuthErrorHandler = () => {
  const { search } = useLocation()

  const navigate = useNavigate({ from: '/dashboard/settings/security' })

  useEffect(() => {
    if (search.error) {
      toast.error(
        search.error === "email_doesn't_match"
          ? 'The email address you provided does not match the one associated with your account.'
          : 'Something went wrong. Please try again in a moment'
      )

      navigate({ search: {} })
    }
  }, [navigate, search.error])

  return null
}
