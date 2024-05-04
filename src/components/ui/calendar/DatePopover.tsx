import { useState } from 'react'
import { Content, Popover, Portal, Trigger } from '@radix-ui/react-popover'
import { format, isToday } from 'date-fns'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { Calendar } from './Calendar'

type DateSelectorProps = {
  onChange: (date: string) => void
}

export const DatePopover = ({ onChange }: DateSelectorProps) => {
  const [selected, setSelected] = useState<Date>(() => new Date())

  const handleDayClick = (date: Date) => {
    setSelected(date)
    const formattedDate = format(date, 'y-MM-dd')
    onChange(formattedDate)
  }

  const formatTodayDate = (date: Date) => {
    return isToday(date)
      ? `Today, ${format(date, 'MMMM d')}`
      : format(date, 'dd-MM-y')
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
            value={formatTodayDate(selected || new Date())}
            readOnly
          />
          <MdKeyboardArrowDown className='size-[18px] text-brand violet:text-brand-secondary' />
        </div>
      </Trigger>
      <Portal>
        <Content style={{ zIndex: 1000 }}>
          <Calendar
            mode='single'
            selected={selected}
            onDayClick={handleDayClick}
          />
        </Content>
      </Portal>
    </Popover>
  )
}
