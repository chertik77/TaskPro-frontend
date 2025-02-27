import type { Control } from 'react-hook-form'
import type { CardSchema } from '../model/types'

import { Root } from '@radix-ui/react-radio-group'
import { Controller } from 'react-hook-form'

import { PRIORITIES } from '../model/constants'
import { RadioInput } from './RadioInput'

type ModalPrioritiesProps = {
  control: Control<CardSchema>
}

export const ModalPriorities = ({ control }: ModalPrioritiesProps) => (
  <>
    <p className='mb-1 text-md text-black/50 dark:text-white/50'>Label color</p>
    <Controller
      name='priority'
      control={control}
      render={({ field }) => (
        <Root
          className='mb-3.5 flex gap-2'
          value={field.value}
          onValueChange={field.onChange}>
          {PRIORITIES.map(priority => (
            <RadioInput
              value={priority}
              key={priority}
            />
          ))}
        </Root>
      )}
    />
  </>
)
