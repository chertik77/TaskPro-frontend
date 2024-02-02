// import { ErrorMessage } from '@hookform/error-message'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { PasswordInput } from './PasswordInput'

const inputVariants = cva(
  'rounded-lg border border-brand border-opacity-40 violet:border-brand-secondary bg-transparent px-[18px] text-black dark:text-white placeholder:opacity-40 text-fs-14-lh-1.28-fw-400 outline-none focus:border-opacity-100 autofill:bg-clip-text h-[49px]',
  {
    variants: {
      width: {
        default: 'w-[287px]',
        sm: 'w-[302px]',
        md: 'w-[344px]',
        lg: 'w-[352px]'
      }
    },
    defaultVariants: {
      width: 'default'
    }
  }
)

type FieldProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    inputName: string
    isPasswordInput?: boolean
    inputPasswordPlaceholder?: string
    errors?: {} //TODO: Add FieldErrors type instead of {} and remove optional parameters
  }

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className,
      inputName,
      isPasswordInput,
      inputPasswordPlaceholder,
      width,
      errors,
      ...props
    },
    ref
  ) => (
    <>
      {isPasswordInput ? (
        <PasswordInput inputPasswordPlaceholder={inputPasswordPlaceholder} />
      ) : (
        <input
          type='text'
          className={cn(inputVariants({ width, className }))}
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
