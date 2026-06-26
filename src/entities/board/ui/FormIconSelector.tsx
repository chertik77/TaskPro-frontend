import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { FormItem, Icon } from '@/shared/ui'

import { BOARD_ICONS } from '../config/icon'

export const FormIconSelector = <T extends FieldValues>({
  value,
  onChange
}: ControllerRenderProps<T>) => (
  <RadioGroup
    className='flex items-center gap-2'
    value={value}
    onValueChange={onChange}>
    {BOARD_ICONS.map(icon => (
      <FormItem key={icon}>
        <Radio.Root
          value={icon}
          className='focus-visible:styled-outline hocus:text-black
            dark:hocus:text-white text-black/50 data-checked:text-black
            dark:text-white/50 dark:data-checked:text-white'>
          <Icon
            name={icon}
            className='size-4.5'
          />
        </Radio.Root>
      </FormItem>
    ))}
  </RadioGroup>
)
