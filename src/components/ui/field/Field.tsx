// import { ErrorMessage } from '@hookform/error-message'
import { cn } from 'lib/utils'
import { forwardRef } from 'react'
import { PasswordInput } from '../PasswordInput'
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
  ) => (
    <>
      {isPasswordInput ? (
        <PasswordInput inputPasswordPlaceholder={inputPasswordPlaceholder} />
      ) : isTextArea ? (
        <textarea className={cn(textAreaVariants({ size }))} />
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
      {/* <ErrorMessage
          errors={errors}
          name={inputName}
          render={({ message }) => (
            <div className='mb-2 mt-2 text-red-600'>{message}</div>
          )}
        /> */}
    </>
  )
)
