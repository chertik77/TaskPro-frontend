import type { ButtonHTMLAttributes } from 'react'

import { forwardRef } from 'react'

import { cn } from 'lib'

import { Loader } from './Loader'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName?: 'arrow' | 'pencil' | 'trash'
  iconClassName?: string
  shouldShowLoader?: boolean
  isPlusIcon?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      iconClassName,
      className,
      shouldShowLoader,
      isPlusIcon,
      children,
      iconName,
      ...props
    },
    ref
  ) => (
    <button
      type='button'
      ref={ref}
      className={cn(
        !iconName &&
          `focus-visible:styled-outline flex h-2xl w-full items-center justify-center
          rounded-lg bg-brand text-base font-medium text-black transition-colors
          disabled:cursor-not-allowed disabled:opacity-50 hocus:bg-brand-hover
          violet:bg-brand-secondary violet:text-white
          violet:hocus:bg-brand-secondary-hover`,
        iconName &&
          `focus-visible:styled-outline hocus:*:stroke-black violet:hocus:*:stroke-black
          dark:hocus:*:stroke-white-primary`,
        isPlusIcon && 'gap-2',
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
          {shouldShowLoader ? (
            <Loader />
          ) : (
            <svg className='size-7 stroke-transparent'>
              <use href='/icons.svg#icon-plus' />
            </svg>
          )}
          {children}
        </>
      )}
      {!iconName && !isPlusIcon && children}
    </button>
  )
)
