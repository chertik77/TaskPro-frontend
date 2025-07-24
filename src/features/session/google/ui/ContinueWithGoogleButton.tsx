import { sessionApiEndpoints } from '@/entities/session'

import { env } from '@/shared/config'
import { Icon } from '@/shared/ui'

export const ContinueWithGoogleButton = () => {
  const actionUrl = `${env.VITE_API_BASE_URL}${sessionApiEndpoints.googleRedirect}`

  return (
    <form
      action={actionUrl}
      method='post'>
      <button
        type='submit'
        className='flex w-84 items-center justify-center gap-2 rounded-lg
          bg-black py-2.5 text-center text-white'>
        <Icon
          name='google'
          className='size-7'
        />
        Continue with Google
      </button>
    </form>
  )
}
