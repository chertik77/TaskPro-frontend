import type { ButtonHTMLAttributes } from 'react'

import { forwardRef } from 'react'

import { cn } from '../lib/cn'
import { Icon } from './Icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName?: 'arrow' | 'pencil' | 'trash'
  iconClassName?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ iconClassName, className, children, iconName, ...props }, ref) => (
    <button
      type='button'
      ref={ref}
      className={cn(
        !iconName &&
          `focus-visible:styled-outline flex h-12 w-full items-center justify-center
          rounded-lg bg-brand text-base font-medium text-black transition-colors
          disabled:cursor-not-allowed disabled:opacity-50 violet:bg-brand-violet
          violet:text-white hocus:bg-brand-light violet:hocus:bg-brand-violet-light`,
        iconName &&
          `focus-visible:styled-outline hocus:*:stroke-black violet:hocus:*:stroke-black
          dark:hocus:*:stroke-white-soft`,
        className
      )}
      {...props}>
      {iconName && (
        <Icon
          name={iconName}
          className={cn(
            'size-4 stroke-black/50 dark:stroke-white-soft/50',
            iconClassName
          )}
        />
      )}
      {!iconName && children}
    </button>
  )
)
