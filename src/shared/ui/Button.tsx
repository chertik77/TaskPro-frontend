import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const Button = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>) => (
  <button
    type='button'
    className={cn(
      `focus-visible:styled-outline bg-accent enabled:hocus:bg-accent/50 flex
      h-12 w-full items-center justify-center rounded-lg text-base font-medium
      text-black transition-colors disabled:cursor-not-allowed
      disabled:opacity-50`,
      className
    )}
    {...props}>
    {children}
  </button>
)
