import type { ChangeEvent } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { useState } from 'react'
import { parseDate } from 'chrono-node'
import { startOfDay } from 'date-fns'

import {
  Calendar,
  FormControl,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'

import { formatDeadlineDate } from '../lib/format-deadline-date'

type FormDeadlinePickerProps<T extends FieldValues> =
  ControllerRenderProps<T> & {
    mode?: 'create' | 'edit'
  }

export const FormDeadlinePicker = <T extends FieldValues>({
  mode,
  value,
  onChange,
  ...props
}: FormDeadlinePickerProps<T>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [inputValue, setInputValue] = useState(
    () => formatDeadlineDate(value) ?? ''
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)

    const parsed = parseDate(text)
    if (parsed) onChange(parsed)
  }

  const handleSelect = (date: Date | undefined) => {
    onChange(date)

    if (date) setInputValue(formatDeadlineDate(date))
    else setInputValue('')

    setIsCalendarOpen(false)
  }

  return (
    <div className='relative'>
      <FormControl>
        <Input
          {...props}
          value={inputValue}
          placeholder='Tomorrow or next week'
          className='pr-12'
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setIsCalendarOpen(true)
            }
          }}
        />
      </FormControl>
      <Popover
        open={isCalendarOpen}
        onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger
          className='focus-visible:styled-outline absolute top-3.75 right-1.5
            px-3'>
          <Icon
            name='calendar'
            className='size-4 stroke-white'
          />
        </PopoverTrigger>
        <PopoverContent
          align='end'
          side='top'>
          <Calendar
            mode='single'
            defaultMonth={value}
            startMonth={value}
            disabled={
              mode === 'create'
                ? date => date < startOfDay(new Date())
                : undefined
            }
            selected={value}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
