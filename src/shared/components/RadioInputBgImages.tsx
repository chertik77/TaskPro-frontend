import type { BoardTypes } from '@/shared/api/board'
import type { UserTypes } from '@/shared/api/user'
import type { Control } from 'react-hook-form'

import { Item, Root } from '@radix-ui/react-radio-group'
import { useQuery } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'

import { useAuthStore } from '@/shared/store'

import { cn } from '../lib'

type BoardImages = {
  id: string
  icon: string | Record<UserTypes.Theme, string>
}[]

type RadioInputBgImagesProps = {
  control: Control<BoardTypes.BoardSchema>
}

export const RadioInputBgImages = ({ control }: RadioInputBgImagesProps) => {
  const theme = useAuthStore(state => state.user.theme)

  const { data: boardImages, isPending } = useQuery<BoardImages>({
    queryKey: ['board-bg-images'],
    queryFn: async () =>
      await fetch('/board-bg-images.json').then(res => res.json())
  })

  return (
    <>
      <p className='mt-6'>Background</p>
      <Controller
        control={control}
        name='background'
        render={({ field }) => (
          <Root
            className={cn(
              'mb-10 mt-3.5 flex max-w-[280px] flex-wrap gap-2',
              isPending && 'mt-4'
            )}
            onValueChange={field.onChange}>
            {isPending ? (
              <p className='text-gray-secondary'>
                Loading board backgrounds...
              </p>
            ) : (
              boardImages?.map(({ id, icon }) => (
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
              ))
            )}
          </Root>
        )}
      />
    </>
  )
}
