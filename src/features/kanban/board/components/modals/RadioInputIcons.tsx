import type { Control } from 'react-hook-form'
import type { BoardSchema } from '../../board.schema'

import { Item, Root } from '@radix-ui/react-radio-group'
import { Controller } from 'react-hook-form'

import { ICONS } from '../../board.constants'

type RadioInputIconsProps = {
  control: Control<BoardSchema>
}

export const RadioInputIcons = ({ control }: RadioInputIconsProps) => (
  <>
    <p className='mt-6'>Icons</p>
    <Controller
      control={control}
      name='icon'
      render={({ field }) => (
        <Root
          className='mt-3.5 flex items-center gap-2'
          onValueChange={field.onChange}>
          {ICONS.map(icon => (
            <Item
              checked={field.value === icon}
              value={icon}
              key={icon}
              className='focus-visible:styled-outline group text-gray-500 hocus:text-gray-600
                dark:text-gray-400 dark:hocus:text-gray-300'>
              <svg
                className='size-lg stroke-current group-aria-checked:text-black
                  group-aria-checked:opacity-100 dark:group-aria-checked:text-white'>
                <use href={`/icons.svg#${icon}`} />
              </svg>
            </Item>
          ))}
        </Root>
      )}
    />
  </>
)
