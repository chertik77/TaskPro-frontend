import type { ChangeEvent } from 'react'

import { useState } from 'react'
import { parseDate } from 'chrono-node'
import { startOfDay } from 'date-fns'

import {
  Calendar,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useFormField
} from '@/shared/ui'

import { formatDeadlineDate } from '../lib/format-deadline-date'

type FormDeadlinePickerProps = {
  mode?: 'create' | 'edit'
}

export const FormDeadlinePicker = ({ mode }: FormDeadlinePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const {
    field: { value, onChange, ...field }
  } = useFormField()

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
      <Input
        {...field}
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
      <Popover
        open={isCalendarOpen}
        onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger
          className='focus-visible:styled-outline absolute top-3.75 right-4.5'>
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
