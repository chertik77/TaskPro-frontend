import type { Control } from 'react-hook-form'
import type { BoardSchema } from '../../board.schema'

import { Item, Root } from '@radix-ui/react-radio-group'
import { Controller } from 'react-hook-form'

import { useAppSelector } from 'hooks/redux'

import { selectUserTheme } from 'redux/user.slice'

import { cn } from 'lib'

import images from '../../data/board-bg-images.json'

type RadioInputBgImagesProps = {
  control: Control<BoardSchema>
}

export const RadioInputBgImages = ({ control }: RadioInputBgImagesProps) => {
  const theme = useAppSelector(selectUserTheme)

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
                className={cn(
                  'focus-visible:styled-outline group outline-offset-4'
                )}
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
