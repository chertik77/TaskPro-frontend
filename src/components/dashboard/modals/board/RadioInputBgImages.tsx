import type { Theme } from 'contexts/theme.context'
import type { BoardSchema } from 'lib/schemas'
import type { Control } from 'react-hook-form'

import { Item, Root } from '@radix-ui/react-radio-group'
import { useTheme } from 'contexts/theme.context'
import { Controller } from 'react-hook-form'

import images from 'lib/json/board-bg-images.json'

type RadioInputBgImagesProps = {
  control: Control<BoardSchema>
}

export const RadioInputBgImages = ({ control }: RadioInputBgImagesProps) => {
  const { theme } = useTheme()

  return (
    <>
      <p className='mt-6'>Background</p>
      <Controller
        control={control}
        name='background'
        render={({ field }) => (
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
                  src={typeof icon === 'object' ? icon[theme as Theme] : icon}
                  alt={id}
                />
              </Item>
            ))}
          </Root>
        )}
      />
    </>
  )
}
