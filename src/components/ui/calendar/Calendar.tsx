import type { ComponentProps } from 'react'

import { DayPicker } from 'react-day-picker'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export const Calendar = ({ ...props }: ComponentProps<typeof DayPicker>) => (
  <DayPicker
    weekStartsOn={1}
    showOutsideDays
    fixedWeeks
    disabled={date => date < new Date()}
    className='rounded-lg border border-brand p-[18px] violet:border-brand-secondary
      violet:bg-white'
    classNames={{
      caption:
        'flex justify-center relative items-center border-b border-black/20 dark:border-white/20 pb-[14px]',
      caption_label: 'text-fs-16-lh-normal-fw-500',
      head_row: 'flex gap-[11px]',
      head_cell: 'text-black/50 dark:text-white/50',
      nav_button_previous: 'absolute left-0',
      nav: 'flex items-center',
      nav_button_next: 'absolute right-0',
      table: '!mt-[14px]',
      row: 'flex gap-[11px] mt-[11px]',
      cell: 'p-0 text-fs-14-lh-1.28-fw-400',
      day: 'h-5 w-5 text-fs-14-lh-1.28-fw-400 rounded-full',
      day_today:
        'bg-brand text-black-third violet:bg-brand-secondary violet:text-white',
      day_selected:
        'bg-brand text-black-third violet:bg-brand-secondary violet:text-white',
      day_outside: 'opacity-20'
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
