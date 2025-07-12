import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { cn } from '@/shared/lib'
import { FormControl, FormItem, RadioGroup, RadioGroupItem } from '@/shared/ui'

import { CARD_PRIORITIES } from '../config/priority'
import { getCardPriorityColor } from '../lib/priority-colors'

type FormPrioritySelectorProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormPrioritySelector = <T extends FieldValues>({
  field
}: FormPrioritySelectorProps<T>) => (
  <FormControl>
    <RadioGroup
      value={field.value}
      onValueChange={field.onChange}>
      {CARD_PRIORITIES.map(priority => (
        <FormItem key={priority}>
          <FormControl>
            <RadioGroupItem
              value={priority}
              indicatorClassname={cn(`after:${getCardPriorityColor(priority)}`)}
              className={getCardPriorityColor(priority)}
            />
          </FormControl>
        </FormItem>
      ))}
    </RadioGroup>
  </FormControl>
)
