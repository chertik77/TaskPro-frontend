import { ErrorMessage } from '@hookform/error-message'
import { cn } from 'lib/utils'
import { forwardRef, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import type { FieldProps } from './field-types'
import { textAreaVariants } from './field-variants'

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className,
      inputName,
      isPasswordInput,
      isTextArea,
      size,
      inputPasswordPlaceholder,
      errors,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <>
        {isTextArea ? (
          <textarea className={cn(textAreaVariants({ size }))} />
        ) : isPasswordInput ? (
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={inputPasswordPlaceholder}
              className={cn(
                'hide-password-toggle pr-[35px] rounded-lg border border-brand border-opacity-40 violet:border-brand-secondary bg-transparent px-[18px] text-black dark:text-white placeholder:opacity-40 text-fs-14-lh-1.28-fw-400 outline-none focus:border-opacity-100 autofill:bg-clip-text h-[49px] w-full',
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
                <FiEyeOff
                  className='h-[18px] w-[18px] opacity-40'
                  stroke='white'
                />
              ) : (
                <FiEye
                  className='h-[18px] w-[18px] opacity-40'
                  stroke='white'
                />
              )}
            </button>
          </div>
        ) : (
          <input
            type='text'
            className={cn(
              'rounded-lg border border-brand border-opacity-40 violet:border-brand-secondary bg-transparent px-[18px] text-black dark:text-white placeholder:opacity-40 text-fs-14-lh-1.28-fw-400 outline-none focus:border-opacity-100 autofill:bg-clip-text h-[49px] w-full',
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
