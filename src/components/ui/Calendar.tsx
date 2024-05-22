import type { ComponentProps } from 'react'

import { isBefore, isSameDay } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export const Calendar = ({ ...props }: ComponentProps<typeof DayPicker>) => (
  <DayPicker
    initialFocus
    weekStartsOn={1}
    showOutsideDays
    fixedWeeks
    fromMonth={new Date()}
    disabled={date =>
      isBefore(date, new Date()) && !isSameDay(date, new Date())
    }
    className='rounded-lg border border-brand bg-white p-[18px] violet:border-brand-secondary
      dark:bg-black-third'
    classNames={{
      caption:
        'flex justify-center relative items-center border-b border-black/20 dark:border-white/20 pb-default',
      caption_label: 'text-fs-16-lh-normal-fw-500',
      head_row: 'flex gap-[11px]',
      head_cell: 'text-black/50 dark:text-white/50',
      nav_button_previous:
        'absolute left-0 disabled:opacity-20 disabled:cursor-not-allowed',
      nav: 'flex items-center',
      nav_button_next: 'absolute right-0',
      table: '!mt-[14px]',
      row: 'flex gap-[11px] mt-[11px]',
      cell: 'p-0 text-fs-14-lh-1.28-fw-400',
      day: 'h-5 w-5 text-fs-14-lh-1.28-fw-400 rounded-full',
      day_selected:
        'bg-brand text-black-third violet:bg-brand-secondary violet:text-white opacity-100',
      day_outside: 'opacity-20',
      day_disabled: 'opacity-20 cursor-not-allowed'
    }}
    components={{
      IconLeft: () => (
        <MdKeyboardArrowLeft className='size-6 fill-black/80 dark:fill-white' />
      ),
      IconRight: () => (
        <MdKeyboardArrowRight className='size-6 fill-black/80 dark:fill-white' />
      )
    }}
    {...props}
  />
)
