import { cn } from 'lib/utils'
import { forwardRef } from 'react'
import type { ButtonProps } from './button-types'
import { buttonVariants } from './button-variants'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, isAddIcon, children, ...props }, ref) => {
    return (
      <>
        {isAddIcon && size === 'modal' && (
          <button
            className={cn(buttonVariants({ variant, size }))}
            ref={ref}
            {...props}>
            <svg
              width='28'
              height='28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                className='fill-black violet:fill-white'
                d='M22 0H6a6 6 0 0 0-6 6v16a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6Z'
              />
              <path
                d='M14 9.917v8.166M9.916 14h8.167'
                className='stroke-white violet:stroke-brand-secondary'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            {children}
          </button>
        )}
      </>
    )
  }
)
