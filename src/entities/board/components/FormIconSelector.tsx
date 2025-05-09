import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { Item, Root } from '@radix-ui/react-radio-group'

import { ICONS } from '@/shared/constants'
import { FormControl, FormItem, Icon } from '@/shared/ui'

type FormIconSelectorProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormIconSelector = <T extends FieldValues>({
  field
}: FormIconSelectorProps<T>) => (
  <Root
    defaultValue={field.value}
    onValueChange={field.onChange}
    className='flex items-center gap-2'>
    {ICONS.map(icon => (
      <FormItem key={icon}>
        <FormControl>
          <Item
            value={icon}
            className='focus-visible:styled-outline group text-black/50 hocus:text-black
              dark:text-white/50 dark:hocus:text-white'>
            <Icon
              name={icon}
              className='size-4.5 stroke-current group-aria-checked:text-black
                group-aria-checked:opacity-100 dark:group-aria-checked:text-white'
            />
          </Item>
        </FormControl>
      </FormItem>
    ))}
  </Root>
)
