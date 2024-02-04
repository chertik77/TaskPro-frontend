import { forwardRef, ReactNode } from 'react'
import type { ButtonProps } from './button-types'

const iconSmallComponents: Record<string, ReactNode> = {
  arrow: (
    <svg className='w-4 h-4 stroke-current'>
      <use xlinkHref='/src/lib/svg-sprite/icons.svg#icon-arrow-btn' />
    </svg>
  ),
  pencil: (
    <svg className='w-4 h-4 stroke-current'>
      <use xlinkHref='/src/lib/svg-sprite/icons.svg#icon-pencil-btn' />
    </svg>
  ),
  trash: (
    <svg className='w-4 h-4 stroke-current'>
      <use xlinkHref='/src/lib/svg-sprite/icons.svg#icon-trash-btn' />
    </svg>
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isAddIcon, isSmallIcon, children, iconName, ...props }, ref) => (
    <button
      className={`${
        isSmallIcon
          ? 'text-[rgb(22, 22, 22)] opacity-50 hocus:text-brand-hover transition duration-300 ease-in-out violet:hocus:text-brand-secondary-hover'
          : 'w-full h-[49px]rounded-lg bg-brand violet:bg-brand-secondary text-black violet:text-white'
      }`}
      ref={ref}
      {...props}>
      {isAddIcon && !isSmallIcon && (
        <div className='flex items-center justify-center gap-2'>
          <svg
            width='28'
            height='28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-black violet:fill-white'>
            <path d='M22 0H6a6 6 0 0 0-6 6v16a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6Z' />
            <path
              d='M14 9.917v8.166M9.916 14h8.167'
              className='stroke-white violet:stroke-brand-secondary'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          {children}
        </div>
      )}
      {isSmallIcon && iconName && iconSmallComponents[iconName]}
      {!isAddIcon && !isSmallIcon && children}
    </button>
  )
)
