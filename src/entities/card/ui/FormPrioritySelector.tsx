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
      className='flex-col'
      onValueChange={onChange}>
      {CARD_PRIORITIES.toReversed().map(priority => (
        <FormItem key={priority}>
          <FormControl>
            <label
              className='text-md hocus:text-black dark:hocus:text-white flex
                cursor-pointer items-center gap-2 text-black/50
                has-[[data-state=checked]]:text-black dark:text-white/50
                dark:has-[[data-state=checked]]:text-white'
              key={priority}>
              <RadioGroupItem
                value={priority}
                indicatorClassname={cn(
                  `after:${getCardPriorityColor(priority)}`
                )}
                className={getCardPriorityColor(priority)}
              />
              {priority}
            </label>
          </FormControl>
        </FormItem>
      ))}
    </RadioGroup>
  </FormControl>
)
