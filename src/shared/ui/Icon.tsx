import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const Icon = ({ name, className }: ComponentProps<'svg'>) => (
  <svg className={cn('stroke-current', className)}>
    <use href={`/icons.svg#${name}`} />
  </svg>
)
