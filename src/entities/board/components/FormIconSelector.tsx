import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'

import { ICONS } from '@/shared/constants'
import { FormControl, FormItem, Icon } from '@/shared/ui'

type FormIconSelectorProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormIconSelector = <T extends FieldValues>({
  field
}: FormIconSelectorProps<T>) => (
  <RadioGroup
    defaultValue={field.value}
    onValueChange={field.onChange}
    className='flex items-center gap-2'>
    {ICONS.map(icon => (
      <FormItem key={icon}>
        <FormControl>
          <RadioGroupItem
            value={icon}
            className='focus-visible:styled-outline group hocus:text-black dark:hocus:text-white
              text-black/50 dark:text-white/50'>
            <Icon
              name={icon}
              className='size-4.5 stroke-current group-aria-checked:text-black
                group-aria-checked:opacity-100 dark:group-aria-checked:text-white'
            />
          </RadioGroupItem>
        </FormControl>
      </FormItem>
    ))}
  </RadioGroup>
)
