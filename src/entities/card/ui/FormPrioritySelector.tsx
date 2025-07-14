import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { cn } from '@/shared/lib'
import { FormControl, FormItem, RadioGroup, RadioGroupItem } from '@/shared/ui'

import { CARD_PRIORITIES } from '../config/priority'
import { getCardPriorityColor } from '../lib/priority-colors'

export const FormPrioritySelector = <T extends FieldValues>({
  value,
  onChange
}: ControllerRenderProps<T>) => (
  <FormControl>
    <RadioGroup
      value={value}
      onValueChange={onChange}>
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
