import type { ControllerRenderProps } from 'react-hook-form'
import type { CardSchema } from '../model/types'

import { cn } from '@/shared/lib/cn'
import { FormControl, FormItem } from '@/shared/ui'

import { PRIORITIES } from '../model/constants'
import { getPriorityColor } from '../model/utils'
import {
  PriorityRadioGroup,
  PriorityRadioGroupItem
} from './PriorityRadioGroup'

type FormPrioritySelectorProps = {
  field: ControllerRenderProps<CardSchema, 'priority'>
}

export const FormPrioritySelector = ({ field }: FormPrioritySelectorProps) => (
  <PriorityRadioGroup
    defaultValue={field.value}
    onValueChange={field.onChange}>
    {PRIORITIES.map(priority => (
      <FormItem key={priority}>
        <FormControl>
          <PriorityRadioGroupItem
            value={priority}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            indicatorClassname={cn(`after:${getPriorityColor(priority)}`)}
            className={getPriorityColor(priority)}
          />
        </FormControl>
      </FormItem>
    ))}
  </PriorityRadioGroup>
)
