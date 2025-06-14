import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const Button = ({
  className,
  ref,
  children,
  ...props
}: ComponentProps<'button'>) => (
  <button
    type='button'
    ref={ref}
    className={cn(
      `focus-visible:styled-outline bg-brand violet:bg-brand-violet violet:text-white
      enabled:hocus:bg-brand-light violet:enabled:hocus:bg-brand-violet-light flex
      h-12 w-full items-center justify-center rounded-lg text-base font-medium
      text-black transition-colors disabled:cursor-not-allowed disabled:opacity-50`,
      className
    )}
    {...props}>
    {children}
  </button>
)
