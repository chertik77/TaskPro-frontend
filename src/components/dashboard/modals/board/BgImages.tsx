import type { BoardSchemaFields } from 'lib/schemas'
import type { ControllerRenderProps } from 'react-hook-form'

import { Item, Root } from '@radix-ui/react-radio-group'
import { useTheme } from 'next-themes'

import images from 'lib/json/board-bg-images.json'

type BgImagesProps = {
  field: ControllerRenderProps<BoardSchemaFields, 'background'>
}

export const BgImages = ({ field }: BgImagesProps) => {
  const { theme } = useTheme()

  return (
    <Root
      className='mb-10 mt-default flex max-w-[280px] flex-wrap gap-2'
      onValueChange={field.onChange}>
      {images.map(({ id, icon }) => (
        <Item
          checked={field.value === id}
          value={id}
          className='group'
          key={id}>
          <img
            className='group-aria-checked:scale-125'
            width={28}
            height={28}
            src={
              typeof icon === 'object'
                ? icon[theme as 'dark' | 'light' | 'violet']
                : icon
            }
            alt={id}
          />
        </Item>
      ))}
    </Root>
  )
}
