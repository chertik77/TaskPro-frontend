import { capitalize } from '@/shared/lib'
import { Icon } from '@/shared/ui'

type SocialButtonProps = {
  provider: 'google' | 'microsoft'
  onClick: () => void
}

export const SocialButton = ({ provider, onClick }: SocialButtonProps) => (
  <button
    type='button'
    className='flex w-84 items-center justify-center gap-2 rounded-lg bg-black
      py-2.5 text-center text-white'
    onClick={onClick}>
    <Icon
      name={provider}
      className='size-7 stroke-none'
    />
    Continue with {capitalize(provider)}
  </button>
)
