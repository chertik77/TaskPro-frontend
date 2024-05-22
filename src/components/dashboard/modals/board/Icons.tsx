import type { BoardSchemaFields } from 'lib/schemas'
import type { ControllerRenderProps } from 'react-hook-form'

import { Item, Root } from '@radix-ui/react-radio-group'

import icons from 'lib/json/board-icons.json'

type IconsProps = {
  field: ControllerRenderProps<BoardSchemaFields, 'icon'>
}

export const Icons = ({ field }: IconsProps) => (
  <Root
    className='mt-default flex items-center gap-2'
    onValueChange={field.onChange}>
    {icons.map(({ id }) => (
      <Item
        checked={field.value === id}
        value={id}
        key={id}
        className='group text-gray-500 hocus:text-gray-600 dark:text-gray-400
          dark:hocus:text-gray-300'>
        <svg
          className='size-[18px] stroke-current group-aria-checked:text-black
            group-aria-checked:opacity-100 dark:group-aria-checked:text-white'>
          <use href={`/icons.svg#${id}`}></use>
        </svg>
      </Item>
    ))}
  </Root>
)
