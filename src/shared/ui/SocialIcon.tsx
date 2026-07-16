import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const SocialIcon = ({
  name,
  className,
  ...props
}: ComponentProps<'svg'>) => (
  <svg
    className={cn('stroke-current', className)}
    {...props}>
    <use href={`/social-icons.svg#${name}`} />
  </svg>
)
