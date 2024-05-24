import type { CardSchema } from 'lib/schemas'
import type { FieldErrors } from 'react-hook-form'

import { forwardRef } from 'react'
import { ErrorMessage } from '@hookform/error-message'

import { cn } from 'lib'

type ModalDescriptionProps = {
  errors: FieldErrors<CardSchema>
}

export const ModalDescription = forwardRef<
  HTMLTextAreaElement,
  ModalDescriptionProps
>(({ errors, ...props }, ref) => (
  <>
    <textarea
      ref={ref}
      placeholder='Description'
      className={cn(
        `mb-2 h-[154px] w-full resize-none rounded-lg border border-brand/40 px-[18px]
        py-default text-fs-16-lh-normal-fw-500 outline-none placeholder:opacity-40
        focus:border-opacity-100 violet:border-brand-secondary`,
        !errors.description && 'mb-6'
      )}
      {...props}
    />
    <ErrorMessage
      errors={errors}
      name='description'
      render={({ message }) => (
        <p className='mb-default text-red-600'>{message}</p>
      )}
    />
  </>
))

ModalDescription.displayName = 'ModalDescription'
