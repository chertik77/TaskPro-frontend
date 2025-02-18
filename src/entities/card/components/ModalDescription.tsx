import type { FieldErrors } from 'react-hook-form'
import type { CardSchema } from '../model/types'

import { forwardRef } from 'react'

import { cn } from '@/shared/lib/cn'

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
        `mb-6 block h-5xl w-full resize-none rounded-lg border border-brand
        border-opacity-40 bg-transparent px-lg py-3.5 outline-none
        placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary
        violet:border-opacity-40 violet:focus:border-opacity-100`,
        errors.description && 'mb-2'
      )}
      {...props}
    />
    {errors.description && (
      <p className='mb-3.5 text-red-600'>{errors.description.message}</p>
    )}
  </>
))
