import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { PRIORITIES } from '@/shared/constants'
import { cn } from '@/shared/lib/cn'
import { FormControl, FormItem } from '@/shared/ui'

import { getPriorityColor } from '../card.utils'
import {
  PriorityRadioGroup,
  PriorityRadioGroupItem
} from './PriorityRadioGroup'

type FormPrioritySelectorProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormPrioritySelector = <T extends FieldValues>({
  field
}: FormPrioritySelectorProps<T>) => (
  <PriorityRadioGroup
    defaultValue={field.value}
    onValueChange={field.onChange}>
    {PRIORITIES.map(priority => (
      <FormItem key={priority}>
        <FormControl>
          <PriorityRadioGroupItem
            value={priority}
            indicatorClassname={cn(`after:${getPriorityColor(priority)}`)}
            className={getPriorityColor(priority)}
          />
        </FormControl>
      </FormItem>
    ))}
  </PriorityRadioGroup>
)
