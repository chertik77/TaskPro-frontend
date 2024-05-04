import React, { useState } from 'react'
import { Content, Popover, Portal, Trigger } from '@radix-ui/react-popover'
import { format, isToday } from 'date-fns'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { Calendar } from './Calendar'

type DateSelectorPopoverProps = {
  onChange: (date: string) => void
}

export const DateSelectorPopover = ({ onChange }: DateSelectorPopoverProps) => {
  const [selected, setSelected] = useState<Date | undefined>()

  const handleDayClick = (date: Date) => {
    setSelected(date)
    const formattedDate = format(date, 'y-MM-dd')
    onChange(formattedDate)
  }

  const formatTodayDate = (date: Date) => {
    if (isToday(date)) {
      return `Today, ${format(date, 'MMMM d')}`
    } else {
      return format(date, 'y-MM-dd')
    }
  }

  return (
    <Popover>
      <Trigger>
        <div className='mb-[40px] flex'>
          <input
            className='bg-transparent text-fs-14-lh-normal-fw-500 text-brand
              violet:text-brand-secondary'
            size={12}
            type='text'
            placeholder={formatTodayDate(new Date())}
            value={formatTodayDate(selected || new Date())}
            readOnly
          />
          <MdKeyboardArrowDown className='size-[18px] text-brand violet:text-brand-secondary' />
        </div>
      </Trigger>
      <Portal>
        <Content style={{ zIndex: 1000 }}>
          <div
            role='dialog'
            aria-label='DayPicker calendar'>
            <Calendar
              mode='single'
              selected={selected}
              onDayClick={handleDayClick}
            />
          </div>
        </Content>
      </Portal>
    </Popover>
  )
}
