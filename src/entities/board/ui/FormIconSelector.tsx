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
            className='focus-visible:styled-outline
              pointer-cursors:cursor-pointer group'>
            <DynamicIcon
              name={icon}
              className='group-hocus:opacity-100 size-4.5 stroke-black
                opacity-50 transition-all group-data-checked:opacity-100
                dark:stroke-white'
            />
          </Radio.Root>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
