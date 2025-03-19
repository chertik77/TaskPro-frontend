import type { ControllerRenderProps } from 'react-hook-form'
import type { CardSchema } from '../model/types'

import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { isBefore, isToday } from 'date-fns'

import { Calendar, FormControl, Icon } from '@/shared/ui'

import { formatTodayDate } from '../model/utils'

type FormDeadlinePickerProps = {
  field: ControllerRenderProps<CardSchema, 'deadline'>
}

export const FormDeadlinePicker = ({ field }: FormDeadlinePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Popover.Root
      open={isCalendarOpen}
      onOpenChange={setIsCalendarOpen}>
      <Popover.Trigger asChild>
        <FormControl>
          <button
            type='button'
            className='focus-visible:styled-outline mb-[40px] flex items-center gap-1 text-brand
              violet:text-brand-violet'>
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
