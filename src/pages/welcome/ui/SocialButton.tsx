import { capitalize } from '@/shared/lib'
import { SocialIcon } from '@/shared/ui'

type SocialButtonProps = {
  provider: 'google' | 'microsoft'
  onClick: () => void
}

export const SocialButton = ({ provider, onClick }: SocialButtonProps) => (
  <button
    type='button'
    className='focus-visible:outline-green-light flex w-84 items-center
      justify-center gap-2 rounded-lg bg-black py-2.5 text-center text-white
      focus-visible:outline-4'
    onClick={onClick}>
    <SocialIcon
      name={provider}
      className='size-7 stroke-none'
    />
    Continue with {capitalize(provider)}
  </button>
)
