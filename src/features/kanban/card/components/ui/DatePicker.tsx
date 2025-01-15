import type { CardSchema } from 'features/kanban/card/card.schema'
import type { Control } from 'react-hook-form'

import { useState } from 'react'
import { Content, Popover, Portal, Trigger } from '@radix-ui/react-popover'
import { Controller } from 'react-hook-form'
import { Icon } from 'shared/ui/icon'

import { formatTodayDate } from 'features/kanban/card/utils'

import { Calendar } from './Calendar'

type DatePickerProps = {
  control: Control<CardSchema>
}

export const DatePicker = ({ control }: DatePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <div className='relative'>
      <p className='mb-1 text-sm text-black/50 dark:text-white/50'>Deadline</p>
      <Controller
        control={control}
        name='deadline'
        render={({ field }) => (
          <Popover
            open={isCalendarOpen}
            onOpenChange={setIsCalendarOpen}>
            <Trigger
              className='focus-visible:styled-outline mb-[40px] flex items-center gap-1 text-brand
                violet:text-brand-secondary'>
              {formatTodayDate(field.value)}
              <Icon
                name='chevron-down'
                className='size-lg stroke-current'
              />
            </Trigger>
            <Portal>
              <Content
                side='top'
                sideOffset={5}
                className='animation z-[1000]'
                align='start'>
                <Calendar
                  mode='single'
                  defaultMonth={field.value}
                  selected={field.value}
                  onSelect={date => {
                    field.onChange(date)
                    setIsCalendarOpen(false)
                  }}
                />
              </Content>
            </Portal>
          </Popover>
        )}
      />
    </div>
  )
}
