import type { ComponentProps } from 'react'

import { isBefore, isSameDay } from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { Icon } from 'components/ui'

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
    className='rounded-lg border border-brand bg-white p-lg violet:border-brand-secondary
      dark:bg-black-third'
    classNames={{
      caption:
        'flex justify-center relative items-center border-b border-black/20 dark:border-white/20 pb-3.5',
      caption_label: 'text-md font-medium',
      head_row: 'flex gap-[11px]',
      head_cell: 'text-black/50 dark:text-white/50',
      nav_button_previous:
        'absolute left-0 disabled:opacity-20 disabled:cursor-not-allowed focus-visible:styled-outline',
      nav: 'flex items-center',
      nav_button_next: 'absolute right-0 focus-visible:styled-outline',
      table: '!mt-3.5',
      row: 'flex gap-[11px] mt-[11px]',
      cell: 'p-0 text-base',
      day: 'h-5 w-5 text-base rounded-full focus-visible:styled-outline',
      day_selected:
        'bg-brand text-black-third violet:bg-brand-secondary violet:text-white opacity-100',
      day_outside: 'opacity-20 aria-selected:opacity-100',
      day_disabled: 'opacity-20 cursor-not-allowed'
    }}
    components={{
      IconLeft: () => (
        <Icon
          name='arrow'
          className='size-3 rotate-180 stroke-black/80 dark:stroke-white'
        />
      ),
      IconRight: () => (
        <Icon
          name='arrow'
          className='size-3 stroke-black/80 dark:stroke-white'
        />
      )
    }}
    {...props}
  />
)
