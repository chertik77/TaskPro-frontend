import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

export const SecurityActionButton = ({
  children,
  className,
  onClick,
  ...props
}: ComponentProps<'button'>) => (
  <button
    onClick={onClick}
    className={cn(
      `focus-visible:styled-outline enabled:hocus:text-accent ml-auto
      disabled:cursor-not-allowed disabled:opacity-50`,
      className
    )}
    {...props}>
    {children}
  </button>
)
