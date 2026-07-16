import type { ChangeEvent } from 'react'

import { useState } from 'react'
import { parseDate } from 'chrono-node'
import { startOfDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { cn } from '@/shared/lib'
import {
  Calendar,
  FormDescription,
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

const date = new Date()

export const FormDeadlinePicker = ({ mode }: FormDeadlinePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const {
    fieldState: { error },
    field: { value, onChange, ...field }
  } = useFormField()

  const [inputValue, setInputValue] = useState(
    () => formatDeadlineDate(value) ?? ''
  )

  const clearValue = useDebouncedCallback(() => onChange(undefined), 1000)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)

    const parsed = parseDate(text)

    if (parsed) onChange(parsed)
    else onChange(undefined)
  }

  const handleSelect = (date: Date | undefined) => {
    onChange(date)

    if (date) {
      clearValue.cancel()
      setInputValue(formatDeadlineDate(date))
    } else {
      setInputValue('')
      clearValue()
    }

    setIsCalendarOpen(false)
  }

  return (
    <>
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
            <CalendarIcon className='size-4' />
          </PopoverTrigger>
          <PopoverContent positionerProps={{ side: 'top' }}>
            <Calendar
              mode='single'
              defaultMonth={value}
              startMonth={mode === 'create' ? (value ?? date) : undefined}
              disabled={
                mode === 'create' ? date => date < startOfDay(date) : undefined
              }
              selected={value}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      {!error && value && inputValue && (
        <FormDescription
          className={cn(
            `mt-2 transition-all duration-500 starting:-translate-y-1
            starting:opacity-0`,
            value ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          )}>
          {`This task is due on ${formatDeadlineDate(value, 'd MMM yyyy')}.`}
        </FormDescription>
      )}
    </>
  )
}
