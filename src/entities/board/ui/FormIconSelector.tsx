import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'

import { FormControl, FormItem, Icon } from '@/shared/ui'

import { BOARD_ICONS } from '../config/icon.constants'

type FormIconSelectorProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormIconSelector = <T extends FieldValues>({
  field
}: FormIconSelectorProps<T>) => (
  <FormControl>
    <RadioGroup
      className='flex items-center gap-2'
      value={field.value}
      onValueChange={field.onChange}>
      {BOARD_ICONS.map(icon => (
        <FormItem key={icon}>
          <FormControl>
            <RadioGroupItem
              value={icon}
              className='focus-visible:styled-outline hocus:text-black dark:hocus:text-white
                text-black/50 data-[state=checked]:text-black dark:text-white/50
                dark:data-[state=checked]:text-white'>
              <Icon
                name={icon}
                className='size-4.5'
              />
            </RadioGroupItem>
          </FormControl>
        </FormItem>
      ))}
    </RadioGroup>
  </FormControl>
)
