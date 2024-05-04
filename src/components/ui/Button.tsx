import type { ButtonHTMLAttributes } from 'react'

import { forwardRef } from 'react'

import { cn } from 'lib'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName?: 'arrow' | 'pencil' | 'trash'
  iconClassName?: string
  isPlusIcon?: boolean
}

//  className={cn(
//         `violet:hocus:bg-#7B7EDE h-[49px] w-full rounded-lg bg-brand stroke-white
//         text-black hocus:bg-brand-hover violet:bg-brand-secondary violet:text-white`,
//         isSmallIcon &&
//           `text-black opacity-50 hocus:text-brand-hover
//           violet:hocus:text-brand-secondary-hover`,
//         className
//       )}

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
          `violet:hocus:bg-#7B7EDE h-[49px] w-full rounded-lg bg-brand stroke-white
          text-black hocus:bg-brand-hover violet:bg-brand-secondary violet:text-white`,
        isPlusIcon && 'flex items-center justify-center gap-2',
        className
      )}
      {...props}>
      {iconName && (
        <svg
          className={cn(
            'size-4 stroke-black/50 violet:stroke-white-primary dark:stroke-white-primary/50',
            iconClassName
          )}>
          <use href={`/icons.svg#icon-${iconName}`} />
        </svg>
      )}
      {isPlusIcon && (
        <>
          <svg className={cn('size-7', iconClassName)}>
            <use href={`/icons.svg#icon-plus`} />
          </svg>
          {children}
        </>
      )}
    </button>
  )
)

Button.displayName = 'Button'
