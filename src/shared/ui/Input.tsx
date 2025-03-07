import type { ComponentProps } from 'react'

import { cn } from '../lib/cn'

export const Input = ({
  className,
  ref,
  ...props
}: ComponentProps<'input'>) => (
  <input
    type='text'
    className={cn(
      `h-12 w-full rounded-lg border border-brand/40 bg-transparent px-4.5 outline-none
      placeholder:opacity-40 autofill:bg-clip-text autofill:text-fill-black
      focus:border-brand violet:border-brand-violet/40
      violet:focus:border-brand-violet dark:autofill:text-fill-white`,
      className
    )}
    ref={ref}
    {...props}
  />
)
