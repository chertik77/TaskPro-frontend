import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { useState } from 'react'

import {
  Calendar,
  FormControl,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'

import { formatDateWithTodayCheck } from '../lib/format-today-date'

export const FormDeadlinePicker = <T extends FieldValues>({
  value,
  onChange
}: ControllerRenderProps<T>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Popover
      open={isCalendarOpen}
      onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <button
            type='button'
            className='focus-visible:styled-outline text-brand
              violet:text-brand-violet mb-10 flex items-center gap-1'>
            {formatDateWithTodayCheck(value)}
            <Icon
              name='chevron-down'
              className='size-4.5'
            />
          </button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='start'>
        <Calendar
          mode='single'
          defaultMonth={value}
          selected={value}
          onSelect={date => {
            if (date) onChange(date)
            setIsCalendarOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
