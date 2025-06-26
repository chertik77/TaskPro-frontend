import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'sonner'

import { useSigninUserWithGoogle } from './useGoogleSignin'

export const useGoogleOAuthWrapper = () => {
  const { mutate, isPending } = useSigninUserWithGoogle()

  const signinWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: mutate,
    onError: () => {
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
    }
  })

  return { signinWithGoogle, isPending }
}
