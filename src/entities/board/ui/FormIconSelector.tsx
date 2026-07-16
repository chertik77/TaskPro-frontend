import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'
import { DynamicIcon } from 'lucide-react/dynamic'

import { FormItem, useFormField } from '@/shared/ui'

import { BOARD_ICONS } from '../config/icon'

export const FormIconSelector = () => {
  const {
    field: { value, onChange }
  } = useFormField()

  return (
    <RadioGroup
      className='flex items-center gap-2'
      value={value}
      onValueChange={onChange}>
      {BOARD_ICONS.map(icon => (
        <FormItem key={icon}>
          <Radio.Root
            value={icon}
            className='focus-visible:styled-outline hocus:text-black
              dark:hocus:text-white cursor-pointer text-black/50
              data-checked:text-black dark:text-white/50
              dark:data-checked:text-white'>
            <DynamicIcon
              name={icon}
              className='size-4.5'
            />
          </Radio.Root>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
