import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const Input = ({
  className,
  ref,
  ...props
}: ComponentProps<'input'>) => (
  <input
    type='text'
    className={cn(
      `border-brand/40 autofill:text-fill-black focus-visible:border-brand
      violet:border-brand-violet/40 violet:focus-visible:border-brand-violet
      dark:autofill:text-fill-white h-12 w-full rounded-lg border bg-transparent
      px-4.5 outline-none placeholder:opacity-40 autofill:bg-clip-text`,
      className
    )}
    ref={ref}
    {...props}
  />
)
