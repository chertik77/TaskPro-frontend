import type { ChangeEvent } from 'react'

import { useState } from 'react'
import { parseDate } from 'chrono-node'
import { isBefore, startOfDay, startOfToday } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { useSettings } from '@/entities/setting/@x/task'

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

import { formatDeadline } from '../lib/format-deadline'

export const FormDeadlinePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const { data: firstDayOfWeek } = useSettings(
    select => select.general.firstDayOfWeek
  )

  const {
    fieldState: { error },
    field: { value, onChange, ...field }
  } = useFormField()

  const [inputValue, setInputValue] = useState(() => formatDeadline(value))

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)

    const parsed = parseDate(text)

    onChange(parsed ? startOfDay(parsed) : null)
  }

  const handleSelect = (date: Date | undefined) => {
    onChange(date ? startOfDay(date) : null)
    setInputValue(formatDeadline(date))
    setIsCalendarOpen(false)
  }

  const isOverdue = value && isBefore(value, startOfToday())

  const isUnparsed = !value && inputValue.trim().length > 0

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
              weekStartsOn={firstDayOfWeek === 'monday' ? 1 : 0}
              defaultMonth={value ?? startOfToday()}
              selected={value ?? undefined}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      {!error && (isUnparsed || value) && (
        <FormDescription
          className={cn(
            `mt-2 transition-all duration-500 starting:-translate-y-1
            starting:opacity-0`,
            isOverdue && 'text-amber-600 dark:text-amber-500'
          )}>
          {isUnparsed && "We couldn't read that date. Try “tomorrow”."}
          {value &&
            (isOverdue
              ? `This deadline has passed — the task will show as overdue.`
              : `This task is due on ${formatDeadline(value, 'd MMM yyyy')}.`)}
        </FormDescription>
      )}
    </>
  )
}
