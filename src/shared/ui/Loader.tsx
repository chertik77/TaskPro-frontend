import type { ComponentProps } from 'react'

import { Loader2Icon } from 'lucide-react'

import { cn } from '../lib'

export const Loader = ({ className, ...props }: ComponentProps<'svg'>) => (
  <Loader2Icon
    data-slot='spinner'
    role='status'
    aria-label='Loading'
    className={cn('size-7 animate-spin', className)}
    {...props}
  />
)
