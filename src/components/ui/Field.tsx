import type { InputHTMLAttributes } from 'react'
import type { FieldErrors } from 'react-hook-form'

import { forwardRef, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { cn } from 'lib'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  inputName: string
  isPasswordInput?: boolean
  inputPasswordPlaceholder?: string
  errors: FieldErrors
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className,
      inputName,
      isPasswordInput,
      inputPasswordPlaceholder,
      errors,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <>
        {isPasswordInput ? (
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={inputPasswordPlaceholder}
              className={cn(
                `hide-password-toggle h-2xl w-full rounded-lg border border-brand
                border-opacity-40 bg-transparent px-lg pr-[35px] outline-none
                placeholder:opacity-40 autofill:bg-clip-text autofill:text-fill-black
                focus:border-opacity-100 violet:border-brand-secondary violet:border-opacity-40
                violet:focus:border-opacity-100 dark:autofill:text-fill-white`,
                className,
                {
                  'mb-3.5': errors[inputName],
                  'mb-6': !errors[inputName]
                }
              )}
              {...props}
              ref={ref}
            />
            <button
              type='button'
              className='absolute right-lg top-4'
              onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? (
                <FiEyeOff className='size-lg stroke-white/40 violet:stroke-black dark:stroke-white' />
              ) : (
                <FiEye className='size-lg stroke-white/40 violet:stroke-black dark:stroke-white' />
              )}
            </button>
          </div>
        ) : (
          <input
            type='text'
            className={cn(
              `mb-3.5 h-2xl w-full rounded-lg border border-brand border-opacity-40
              bg-transparent px-lg outline-none placeholder:opacity-40 autofill:bg-clip-text
              autofill:text-fill-white focus:border-opacity-100 violet:border-brand-secondary
              violet:border-opacity-40 violet:focus:border-opacity-100`,
              className,
              errors[inputName] && 'mb-2'
            )}
            ref={ref}
            {...props}
          />
        )}
        <ErrorMessage
          errors={errors}
          name={inputName}
          render={({ message }) => (
            <p className='mb-3.5 text-red-600'>{message}</p>
          )}
        />
      </>
    )
  }
)

Field.displayName = 'Field'
