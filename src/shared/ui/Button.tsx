import type { ComponentProps } from 'react'

import { forwardRef } from 'react'

import { cn } from '../lib/cn'

export const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ className, children, ...props }, ref) => (
    <button
      type='button'
      ref={ref}
      className={cn(
        `focus-visible:styled-outline flex h-12 w-full items-center justify-center
        rounded-lg bg-brand text-base font-medium text-black transition-colors
        disabled:cursor-not-allowed disabled:opacity-50 violet:bg-brand-violet
        violet:text-white hocus:bg-brand-light violet:hocus:bg-brand-violet-light`,
        className
      )}
      {...props}>
      {children}
    </button>
  )
)
