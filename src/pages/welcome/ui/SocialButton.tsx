import type { SvgIconProps } from '@thesvg/react'
import type { ComponentType } from 'react'

import { capitalize } from '@/shared/lib'

type SocialButtonProps = {
  icon: ComponentType<SvgIconProps>
  provider: 'google' | 'microsoft'
  onClick: () => void
}

export const SocialButton = ({
  icon: Icon,
  provider,
  onClick
}: SocialButtonProps) => (
  <button
    type='button'
    className='focus-visible:outline-green-light flex w-84 items-center
      justify-center gap-2 rounded-lg bg-black py-2.5 text-center text-white
      focus-visible:outline-4'
    onClick={onClick}>
    <Icon className='size-7' />
    Continue with {capitalize(provider)}
  </button>
)
