import type { CardSchema } from 'lib/schemas'
import type { Control } from 'react-hook-form'

import { Root } from '@radix-ui/react-radio-group'
import { priorities } from 'features/user/model/constants'
import { Controller } from 'react-hook-form'

import { RadioInput } from 'components/ui'

type ModalPrioritiesProps = {
  control: Control<CardSchema>
}

export const ModalPriorities = ({ control }: ModalPrioritiesProps) => (
  <>
    <p className='mb-1 text-sm text-black/50 dark:text-white/50'>Label color</p>
    <Controller
      name='priority'
      control={control}
      render={({ field, formState }) => (
        <>
          <Root
            onValueChange={field.onChange}
            className='mb-3.5 flex gap-2'>
            {priorities.map(priority => (
              <RadioInput
                checked={priority === field.value}
                value={priority}
                key={priority}
              />
            ))}
          </Root>
          {formState.errors.priority && (
            <p className='mb-3.5 text-red-600'>
              {formState.errors.priority.message}
            </p>
          )}
        </>
      )}
    />
  </>
)
