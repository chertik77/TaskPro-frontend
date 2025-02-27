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
        `mb-6 block h-[154px] w-full resize-none rounded-lg border border-brand/40
        bg-transparent px-4.5 py-3.5 outline-none placeholder:opacity-40
        focus:border-brand violet:border-brand-violet/40
        violet:focus:border-brand-violet`,
        errors.description && 'mb-2'
      )}
      {...props}
    />
    {errors.description && (
      <p className='mb-3.5 text-red'>{errors.description.message}</p>
    )}
  </>
))
