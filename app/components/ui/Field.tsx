import { cn } from 'lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  isTextArea?: boolean
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className, type, isTextArea, ...props }, ref) => (
    <>
      {isTextArea ? (
        <textarea
          className={cn('rounded-lg border border-brand opacity-40', className)}
        />
      ) : (
        <input
          type={type}
          className={cn('rounded-lg border border-brand pl-[18px]', className)}
          ref={ref}
          {...props}
        />
      )}
    </>
  )
)
