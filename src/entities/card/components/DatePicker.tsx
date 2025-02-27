import type { Control } from 'react-hook-form'
import type { CardSchema } from '../model/types'

import { useState } from 'react'
import { Content, Popover, Portal, Trigger } from '@radix-ui/react-popover'
import { Controller } from 'react-hook-form'

import { Icon } from '@/shared/ui'

import { formatTodayDate } from '../model/utils'
import { Calendar } from './Calendar'

type DatePickerProps = {
  control: Control<CardSchema>
}

export const DatePicker = ({ control }: DatePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <div className='relative'>
      <p className='mb-1 text-md text-black/50 dark:text-white/50'>Deadline</p>
      <Controller
        control={control}
        name='deadline'
        render={({ field }) => (
          <Popover
            open={isCalendarOpen}
            onOpenChange={setIsCalendarOpen}>
            <Trigger
              className='focus-visible:styled-outline mb-[40px] flex items-center gap-1 text-brand
                violet:text-brand-violet'>
              {formatTodayDate(field.value)}
              <Icon
                name='chevron-down'
                className='size-4.5 stroke-current'
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
                  startMonth={field.value}
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
