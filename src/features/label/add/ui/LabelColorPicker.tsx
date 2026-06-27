import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { LABEL_COLORS } from '@/entities/label'
import { COLOR_MAP } from '@/entities/label/config/color-map'

import { cn } from '@/shared/lib'
import { FormItem, useFormField } from '@/shared/ui'

export const LabelColorPicker = () => {
  const {
    field: { value, onChange }
  } = useFormField()

  return (
    <RadioGroup
      className='flex items-center gap-2'
      value={value}
      onValueChange={onChange}>
      {LABEL_COLORS.map(color => (
        <FormItem key={color}>
          <Radio.Root
            value={color}
            className={cn(
              `focus-visible:styled-outline block size-6 rounded-xl
              transition-transform data-checked:scale-125`,
              COLOR_MAP[color]
            )}
          />
        </FormItem>
      ))}
    </RadioGroup>
  )
}
