import type { InputHTMLAttributes } from 'react'
import type { FieldErrors } from 'react-hook-form'

import { forwardRef, useState } from 'react'
import { cn } from 'shared/lib'

import { Icon } from './Icon'

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  errors: FieldErrors
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, errors, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              `hide-password-toggle peer h-2xl w-full rounded-lg border border-brand
              border-opacity-40 bg-transparent px-lg pr-[35px] outline-none
              placeholder:opacity-40 autofill:bg-clip-text autofill:text-fill-black
              focus:border-opacity-100 violet:border-brand-secondary violet:border-opacity-40
              violet:focus:border-opacity-100 dark:autofill:text-fill-white`,
              className,
              errors?.password && 'mb-2',
              !errors?.password && 'mb-6'
            )}
            {...props}
            ref={ref}
          />
          <button
            type='button'
            className='focus-visible:styled-outline absolute right-lg top-4 opacity-40
              peer-[.text-white]:text-white'
            onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? (
              <Icon
                name='eye-off'
                className='size-lg'
              />
            ) : (
              <Icon
                name='eye'
                className='size-lg'
              />
            )}
          </button>
        </div>
        {errors?.password && (
          <p className='mb-3.5 text-red-600'>
            {errors?.password?.message as string}
          </p>
        )}
      </>
    )
  }
)
