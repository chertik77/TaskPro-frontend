import type { ButtonProps } from './button-types'

import { forwardRef } from 'react'
import { cn } from 'lib/utils'

const createIcon = (iconName: string, className: string) => (
  <svg className={className}>
    <use xlinkHref={`/assets/icons.svg#icon-${iconName}`} />
  </svg>
)

const iconComponents: Record<string, JSX.Element> = {
  arrow: createIcon('arrow-btn', 'size-4 stroke-current'),
  pencil: createIcon('pencil-btn', 'size-4 stroke-current'),
  trash: createIcon('trash-btn', 'size-4 stroke-current'),
  help: createIcon('help', 'size-5 stroke-current'),
  logout: createIcon('logout-btn', 'size-8 stroke-brand'),
  plus: createIcon(
    'plus',
    'size-7 violet:fill-white violet:stroke-brand-secondary'
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, isAddIcon, isSmallIcon, children, iconName, ...props },
    ref
  ) => (
    <button
      className={cn(
        `transition duration-300 ease-in-out disabled:cursor-not-allowed
        disabled:opacity-50`,
        isSmallIcon
          ? `text-black opacity-50 hocus:text-brand-hover
            violet:hocus:text-brand-secondary-hover`
          : `violet:hocus:bg-#7B7EDE h-[49px] w-full rounded-lg bg-brand stroke-white
            text-black hocus:bg-brand-hover violet:bg-brand-secondary violet:text-white`,
        className
      )}
      ref={ref}
      {...props}>
      {isAddIcon && !isSmallIcon && iconName && (
        <div className='flex items-center justify-center gap-2'>
          {iconComponents[iconName]}
          {children}
        </div>
      )}
      {isSmallIcon && iconName && iconComponents[iconName] && (
        <div className='flex items-center gap-2'>
          {iconComponents[iconName]}
          {children}
        </div>
      )}
      {!isAddIcon && !isSmallIcon && children}
    </button>
  )
)

Button.displayName = 'Button'
