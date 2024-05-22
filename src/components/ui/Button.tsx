import type { ButtonHTMLAttributes } from 'react'

import { forwardRef } from 'react'

import { cn } from 'lib'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName?: 'arrow' | 'pencil' | 'trash'
  iconClassName?: string
  isPlusIcon?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { iconClassName, className, isPlusIcon, children, iconName, ...props },
    ref
  ) => (
    <button
      type='button'
      ref={ref}
      className={cn(
        !iconName &&
          `h-[49px] w-full rounded-lg bg-brand stroke-white text-fs-14-lh-normal-fw-500
          text-black disabled:cursor-not-allowed disabled:opacity-50 hocus:bg-brand-hover
          violet:bg-brand-secondary violet:text-white
          violet:hocus:bg-brand-secondary-hover`,
        iconName && 'hocus:*:stroke-black dark:hocus:*:stroke-white-primary',
        isPlusIcon && 'flex items-center justify-center gap-2',
        className
      )}
      {...props}>
      {iconName && (
        <svg
          className={cn(
            'size-4 stroke-black/50 dark:stroke-white-primary/50',
            iconClassName
          )}>
          <use href={`/icons.svg#icon-${iconName}`} />
        </svg>
      )}
      {isPlusIcon && (
        <>
          <svg className='size-7 stroke-transparent'>
            <use href='/icons.svg#icon-plus' />
          </svg>
          {children}
        </>
      )}
      {!iconName && !isPlusIcon && children}
    </button>
  )
)

Button.displayName = 'Button'
