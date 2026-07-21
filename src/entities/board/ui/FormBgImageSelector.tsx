import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { useSettings } from '@/entities/setting/@x/board'

import { resolveTheme } from '@/shared/config'
import { FormItem, useFormField } from '@/shared/ui'

import { BOARD_BG_IMAGES } from '../config/bg-images'

export const FormBgImageSelector = () => {
  const {
    field: { value, onChange }
  } = useFormField()

  const { data: theme } = useSettings(state => state.general.theme)

  return (
    <RadioGroup
      className='flex max-w-70 flex-wrap gap-2'
      value={value}
      onValueChange={onChange}>
      {BOARD_BG_IMAGES.map(({ id, icon }) => (
        <FormItem key={id}>
          <Radio.Root
            value={id}
            className='focus-visible:styled-outline group
              pointer-cursors:cursor-pointer outline-offset-3'>
            <img
              className='rounded-lg transition-transform
                group-data-checked:scale-125'
              width={28}
              height={28}
              src={typeof icon === 'object' ? icon[resolveTheme(theme)] : icon}
              alt={id}
            />
          </Radio.Root>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
