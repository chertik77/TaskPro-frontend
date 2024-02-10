import { ErrorMessage } from '@hookform/error-message'
import { cn } from 'lib/utils'
import { forwardRef, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import type { FieldProps } from './field-types'

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
                'hide-password-toggle autofill:text-fill-white h-[49px] w-full rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] pr-[35px] text-fs-16-lh-normal-fw-500 text-black outline-none placeholder:opacity-40 autofill:bg-clip-text focus:border-opacity-100 violet:border-brand-secondary dark:text-white',
                className,
                {
                  'mb-[14px]': errors[inputName],
                  'mb-6': !errors[inputName]
                }
              )}
              {...props}
              ref={ref}
            />
            <button
              type='button'
              className='absolute right-[18px] top-4'
              onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? (
                <FiEyeOff className='light:stroke-black size-[18px] stroke-white opacity-40 violet:stroke-black' />
              ) : (
                <FiEye className='light:stroke-black size-[18px]  stroke-white opacity-40 violet:stroke-black' />
              )}
            </button>
          </div>
        ) : (
          <input
            type='text'
            className={cn(
              'autofill:text-fill-white h-[49px] w-full rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] text-fs-16-lh-normal-fw-500 text-black outline-none placeholder:opacity-40 autofill:bg-clip-text focus:border-opacity-100 violet:border-brand-secondary violet:text-black dark:text-white',
              className
            )}
            ref={ref}
            {...props}
          />
        )}
        <ErrorMessage
          errors={errors}
          name={inputName}
          render={({ message }) => (
            <p className='mb-[14px] text-red-500'>{message}</p>
          )}
        />
      </>
    )
  }
)
