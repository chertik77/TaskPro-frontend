import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'
import { DynamicIcon } from 'lucide-react/dynamic'

import { BoardIcon } from '@/shared/api'
import { FormItem, useFormField } from '@/shared/ui'

export const FormIconSelector = () => {
  const {
    field: { value, onChange }
  } = useFormField()

  return (
    <RadioGroup
      className='flex items-center gap-2'
      value={value}
      onValueChange={onChange}>
      {Object.values(BoardIcon).map(icon => (
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
