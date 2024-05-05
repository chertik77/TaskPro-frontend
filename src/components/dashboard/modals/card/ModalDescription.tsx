import type { CardSchemaFields } from 'lib/schemas'
import type { FieldErrors } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'

import { cn } from 'lib'

type ModalDescriptionProps = {
  errors: FieldErrors<CardSchemaFields>
}
export const ModalDescription = ({
  errors,
  ...props
}: ModalDescriptionProps) => (
  <>
    <textarea
      placeholder='Description'
      {...props}
      className={cn(
        `mb-2 h-[154px] w-full resize-none rounded-lg border border-brand/40 px-[18px]
        py-default text-fs-14-lh-1.28-fw-400 outline-none placeholder:opacity-40
        focus:border-opacity-100 violet:border-brand-secondary`,
        !errors.description && 'mb-6'
      )}
    />
    <ErrorMessage
      errors={errors}
      name='description'
      render={({ message }) => (
        <p className='mb-default text-red-600'>{message}</p>
      )}
    />
  </>
)
