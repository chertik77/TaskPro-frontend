import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { useMe } from '@/entities/user/@x/board'

import { FormItem, useFormField } from '@/shared/ui'

import { BOARD_BG_IMAGES } from '../config/bg-images'

export const FormBgImageSelector = () => {
  const {
    field: { value, onChange }
  } = useFormField()

  const user = useMe()

  return (
    <RadioGroup
      className='flex max-w-70 flex-wrap gap-2'
      value={value}
      onValueChange={onChange}>
      {BOARD_BG_IMAGES.map(({ id, icon }) => (
        <FormItem key={id}>
          <Radio.Root
            value={id}
            className='focus-visible:styled-outline group cursor-pointer
              outline-offset-3'>
            <img
              className='transition-transform group-data-checked:scale-125'
              className='rounded-lg transition-transform'
              width={28}
              height={28}
              src={
                typeof icon === 'object' ? icon[user?.theme ?? 'light'] : icon
              }
              alt={id}
            />
          </Radio.Root>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
