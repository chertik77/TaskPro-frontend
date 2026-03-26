import { sessionApiEndpoints } from '@/entities/session'

import { env } from '@/shared/config'
import { Icon } from '@/shared/ui'

export const ContinueWithGoogleButton = () => {
  const handleClick = () => {
    const url = env.VITE_API_BASE_URL + sessionApiEndpoints.googleInitiate
    window.location.href = url
  }

  return (
    <button
      type='button'
      className='flex w-84 items-center justify-center gap-2 rounded-lg bg-black
        py-2.5 text-center text-white'
      onClick={handleClick}>
      <Icon
        name='google'
        className='size-7'
      />
      Continue with Google
    </button>
  )
}
