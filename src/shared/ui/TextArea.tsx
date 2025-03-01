import type { ComponentProps } from 'react'

import { forwardRef } from 'react'

import { cn } from '../lib/cn'

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<'textarea'>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      `block h-[154px] w-full resize-none rounded-lg border border-brand/40
      bg-transparent px-4.5 py-3.5 outline-none placeholder:opacity-40
      focus:border-brand violet:border-brand-violet/40
      violet:focus:border-brand-violet`,
      className
    )}
    {...props}
  />
))
