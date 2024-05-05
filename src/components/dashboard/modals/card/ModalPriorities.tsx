import type { CardSchemaFields } from 'lib/schemas'
import type { Control, FieldErrors } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'
import { Root } from '@radix-ui/react-radio-group'
import { Controller } from 'react-hook-form'

import { RadioInput } from 'components/ui'

import { priorities } from 'constants/priorities'

type AddCardModalPrioritiesProps = {
  control: Control<CardSchemaFields>
  errors: FieldErrors<CardSchemaFields>
}

export const ModalPriorities = ({
  control,
  errors
}: AddCardModalPrioritiesProps) => (
  <>
    <p className='mb-1 text-fs-12-lh-normal-fw-400 text-black/50 dark:text-white/50'>
      Label color
    </p>
    <Controller
      name='priority'
      control={control}
      render={({ field }) => (
        <>
          <Root
            onValueChange={field.onChange}
            className='mb-default flex gap-2'>
            {priorities.map(priority => (
              <RadioInput
                checked={priority === field.value}
                value={priority}
                key={priority}
              />
            ))}
          </Root>
          <ErrorMessage
            name={field.name}
            errors={errors}
            render={({ message }) => (
              <p className='mb-default text-red-600'>{message}</p>
            )}
          />
        </>
      )}
    />
  </>
)
