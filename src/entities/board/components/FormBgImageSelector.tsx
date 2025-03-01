import type { Theme } from '@/entities/user/@x/board'
import type { ControllerRenderProps } from 'react-hook-form'
import type { BoardSchema } from '../model/types'

import { Item, Root } from '@radix-ui/react-radio-group'
import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/entities/auth/@x/board'

import { FormControl, FormItem } from '@/shared/ui'

type BoardImages = {
  id: string
  icon: string | Record<Theme, string>
}[]

type FormBgImageSelectorProps = {
  field: ControllerRenderProps<BoardSchema, 'background'>
}

export const FormBgImageSelector = ({ field }: FormBgImageSelectorProps) => {
  const theme = useAuthStore(state => state.user.theme)

  const { data: boardImages, isPending } = useQuery<BoardImages>({
    queryKey: ['board-bg-images'],
    queryFn: async () =>
      await fetch('/board-bg-images.json').then(res => res.json())
  })

  return (
    <Root
      defaultValue={field.value}
      className='flex max-w-[280px] flex-wrap gap-2'
      onValueChange={field.onChange}>
      {isPending ? (
        <p className='text-gray'>Loading board backgrounds...</p>
      ) : (
        boardImages?.map(({ id, icon }) => (
          <FormItem key={id}>
            <FormControl>
              <Item
                value={id}
                className='focus-visible:styled-outline group outline-offset-4'>
                <img
                  className='group-aria-checked:scale-125'
                  width={28}
                  height={28}
                  src={typeof icon === 'object' ? icon[theme] : icon}
                  alt={id}
                />
              </Item>
            </FormControl>
          </FormItem>
        ))
      )}
    </Root>
  )
}
