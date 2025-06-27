import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const Icon = ({ name, className, ...props }: ComponentProps<'svg'>) => (
  <svg
    className={cn('stroke-current', className)}
    {...props}>
    <use href={`/icons.svg#${name}`} />
  </svg>
)
