import type { InputHTMLAttributes } from 'react'
import type { FieldErrors } from 'react-hook-form'

import { forwardRef } from 'react'

import { cn } from '../lib/cn'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  inputName: string
  errors: FieldErrors
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className, inputName, errors, ...props }, ref) => (
    <>
      <input
        type='text'
        className={cn(
          `mb-3.5 h-12 w-full rounded-lg border border-brand border-opacity-40
          bg-transparent px-4.5 outline-none placeholder:opacity-40 autofill:bg-clip-text
          autofill:text-fill-black focus:border-opacity-100 violet:border-brand-violet
          violet:border-opacity-40 violet:focus:border-opacity-100
          dark:autofill:text-fill-white`,
          className,
          errors[inputName] && 'mb-2'
        )}
        ref={ref}
        {...props}
      />
      {errors[inputName] && (
        <p className='mb-3.5 text-red'>
          {errors[inputName]?.message as string}
        </p>
      )}
    </>
  )
)
