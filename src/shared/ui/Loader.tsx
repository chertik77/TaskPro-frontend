import type { ComponentProps } from 'react'

import { cn } from 'cn'
import { Loader2Icon } from 'lucide-react'

export const Loader = ({ className, ...props }: ComponentProps<'svg'>) => (
  <Loader2Icon
    role='status'
    aria-label='Loading'
    className={cn('size-7 animate-spin', className)}
    {...props}
  />
)
