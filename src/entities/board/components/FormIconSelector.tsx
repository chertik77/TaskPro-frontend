import type { ControllerRenderProps } from 'react-hook-form'
import type { BoardSchema } from '../model/types'

import { Item, Root } from '@radix-ui/react-radio-group'

import { FormControl, FormItem, Icon } from '@/shared/ui'

import { ICONS } from '../model/constants'

type FormIconSelectorProps = {
  field: ControllerRenderProps<BoardSchema, 'icon'>
}

export const FormIconSelector = ({ field }: FormIconSelectorProps) => (
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
