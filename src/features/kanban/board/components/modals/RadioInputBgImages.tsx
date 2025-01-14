import type { BoardSchema } from 'features/kanban/board/board.schema'
import type { Control } from 'react-hook-form'

import { Item, Root } from '@radix-ui/react-radio-group'
import { Controller } from 'react-hook-form'

import { useAuthStore } from 'features/auth/auth.store'
import images from 'features/kanban/board/data/board-bg-images.json'

type RadioInputBgImagesProps = {
  control: Control<BoardSchema>
}

export const RadioInputBgImages = ({ control }: RadioInputBgImagesProps) => {
  const theme = useAuthStore(state => state.user.theme)

  return (
    <>
      <p className='mt-6'>Background</p>
      <Controller
        control={control}
        name='background'
        render={({ field }) => (
          <Root
            className='mb-10 mt-3.5 flex max-w-[280px] flex-wrap gap-2'
            onValueChange={field.onChange}>
            {images.map(({ id, icon }) => (
              <Item
                checked={field.value === id}
                value={id}
                className='focus-visible:styled-outline group outline-offset-4'
                key={id}>
                <img
                  className='group-aria-checked:scale-125'
                  width={28}
                  height={28}
                  src={typeof icon === 'object' ? icon[theme] : icon}
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
