import type { Control } from 'react-hook-form'
import type { CardTypes } from '..'

import { Root } from '@radix-ui/react-radio-group'
import { Controller } from 'react-hook-form'

import { PRIORITIES, RadioInput } from '..'

type ModalPrioritiesProps = {
  control: Control<CardTypes.CardSchema>
}

export const ModalPriorities = ({ control }: ModalPrioritiesProps) => (
  <>
    <p className='mb-1 text-sm text-black/50 dark:text-white/50'>Label color</p>
    <Controller
      name='priority'
      control={control}
      render={({ field }) => (
        <Root
          onValueChange={field.onChange}
          className='mb-3.5 flex gap-2'>
          {PRIORITIES.map(priority => (
            <RadioInput
              checked={priority === field.value}
              value={priority}
              key={priority}
            />
          ))}
        </Root>
      )}
    />
  </>
)
