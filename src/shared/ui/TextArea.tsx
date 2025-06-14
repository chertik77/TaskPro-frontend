import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const TextArea = ({
  className,
  ref,
  ...props
}: ComponentProps<'textarea'>) => (
  <textarea
    ref={ref}
    className={cn(
      `border-brand/40 focus-visible:border-brand violet:border-brand-violet/40
      violet:focus-visible:border-brand-violet block h-[154px] w-full resize-none
      rounded-lg border bg-transparent px-4.5 py-3.5 outline-none
      placeholder:opacity-40`,
      className
    )}
    {...props}
  />
)
