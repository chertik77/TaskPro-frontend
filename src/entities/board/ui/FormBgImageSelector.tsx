import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'

import { useSessionStore } from '@/entities/session/@x/board'

import { FormControl, FormItem } from '@/shared/ui'

import { BOARD_BG_IMAGES } from '../config/bg-images'

export const FormBgImageSelector = <T extends FieldValues>({
  value,
  onChange
}: ControllerRenderProps<T>) => {
  const {
    user: { theme }
  } = useSessionStore()

  return (
    <FormControl>
      <RadioGroup
        className='flex max-w-[280px] flex-wrap gap-2'
        value={value}
        onValueChange={onChange}>
        {BOARD_BG_IMAGES.map(({ id, icon }) => (
          <FormItem key={id}>
            <FormControl>
              <RadioGroupItem
                value={id}
                className='focus-visible:styled-outline group outline-offset-3'>
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
        ))}
      </RadioGroup>
    </FormControl>
  )
}
