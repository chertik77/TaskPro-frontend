import { useEffect, useState } from 'react'
import { KeyRoundIcon } from 'lucide-react'

import { usePasskeySignin } from '../api/usePasskeySignin'

const supportsPasskeys = async () => {
  if (!window.PublicKeyCredential) return false

  return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
}

export const PasskeyButton = () => {
  const [showPasskey, setShowPasskey] = useState(false)

  const { mutate: signinWithPasskey } = usePasskeySignin()

  useEffect(() => {
    supportsPasskeys().then(setShowPasskey)
  }, [])

  return (
    showPasskey && (
      <button
        type='button'
        className='focus-visible:outline-green-light flex w-84 items-center
          justify-center gap-2 rounded-lg bg-black py-2.5 text-center text-white
          focus-visible:outline-4'
        onClick={() => signinWithPasskey()}>
        <KeyRoundIcon className='size-7' />
        Continue with Passkey
      </button>
    )
  )
}
