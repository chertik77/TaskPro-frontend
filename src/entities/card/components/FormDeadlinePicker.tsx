import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { isBefore, isToday } from 'date-fns'

import { Calendar, FormControl, Icon } from '@/shared/ui'

import { formatTodayDate } from '../card.utils'

type FormDeadlinePickerProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
}

export const FormDeadlinePicker = <T extends FieldValues>({
  field
}: FormDeadlinePickerProps<T>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Popover.Root
      open={isCalendarOpen}
      onOpenChange={setIsCalendarOpen}>
      <Popover.Trigger asChild>
        <FormControl>
          <button
            type='button'
            className='focus-visible:styled-outline text-brand violet:text-brand-violet mb-[40px] flex
              items-center gap-1'>
            {formatTodayDate(field.value)}
            <Icon
              name='chevron-down'
              className='size-4.5 stroke-current'
            />
          </button>
        </FormControl>
      </Popover.Trigger>
      <Popover.Content
        side='top'
        sideOffset={5}
        className='fade-zoom z-[1000]'
        align='start'>
        <Calendar
          mode='single'
          startMonth={new Date()}
          disabled={date => isBefore(date, new Date()) && !isToday(date)}
          defaultMonth={field.value}
          selected={field.value}
          onSelect={date => {
            field.onChange(date)
            setIsCalendarOpen(false)
          }}
        />
      </Popover.Content>
    </Popover.Root>
  )
}
