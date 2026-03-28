import { sessionApiEndpoints } from '@/entities/session'

import { env } from '@/shared/config'
import { Icon } from '@/shared/ui'

type SocialButtonProps = {
  provider: 'google' | 'microsoft'
  apiEndpoint: keyof typeof sessionApiEndpoints
}

export const SocialButton = ({ provider, apiEndpoint }: SocialButtonProps) => {
  const handleClick = () => {
    const url = env.VITE_API_BASE_URL + sessionApiEndpoints[apiEndpoint]
    window.location.href = url
  }

  return (
    <button
      type='button'
      className='flex w-84 items-center justify-center gap-2 rounded-lg bg-black
        py-2.5 text-center text-white'
      onClick={handleClick}>
      <Icon
        name={provider}
        className='size-7 stroke-none'
      />
      Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  )
}
