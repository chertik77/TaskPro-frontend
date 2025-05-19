import type { Theme } from '@/shared/constants'
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/shared/store'
import { FormControl, FormItem } from '@/shared/ui'

type BoardImages = {
  id: string
  icon: string | Record<Theme, string>
}[]

type FormBgImageSelectorProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormBgImageSelector = <T extends FieldValues>({
  field
}: FormBgImageSelectorProps<T>) => {
  const {
    user: { theme }
  } = useAuthStore()

  const { data: boardImages, isPending } = useQuery<BoardImages>({
    queryKey: ['board-bg-images'],
    queryFn: async () =>
      await fetch('/board-bg-images.json').then(res => res.json())
  })

  return (
    <FormControl>
      <RadioGroup
        className='flex max-w-[280px] flex-wrap gap-2'
        value={field.value}
        onValueChange={field.onChange}>
        {isPending ? (
          <p className='text-gray'>Loading board backgrounds...</p>
        ) : (
          boardImages?.map(({ id, icon }) => (
            <FormItem key={id}>
              <FormControl>
                <RadioGroupItem
                  value={id}
                  className='focus-visible:styled-outline group outline-offset-4'>
                  <img
                    className='transition-transform group-aria-checked:scale-125'
                    width={28}
                    height={28}
                    src={typeof icon === 'object' ? icon[theme] : icon}
                    alt={id}
                  />
                </RadioGroupItem>
              </FormControl>
            </FormItem>
          ))
        )}
      </RadioGroup>
    </FormControl>
  )
}
