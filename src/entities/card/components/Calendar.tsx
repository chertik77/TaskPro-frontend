import type { ComponentProps } from 'react'
import type { ChevronProps } from 'react-day-picker'

import { isBefore, isSameDay } from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { Icon } from '@/shared/components'

export const Calendar = ({ ...props }: ComponentProps<typeof DayPicker>) => (
  <DayPicker
    weekStartsOn={1}
    showOutsideDays
    fixedWeeks
    startMonth={new Date()}
    disabled={date =>
      isBefore(date, new Date()) && !isSameDay(date, new Date())
    }
    className='relative rounded-lg border border-brand bg-white p-lg
      violet:border-brand-secondary dark:bg-black-third'
    classNames={{
      month_caption: 'border-b border-black/20 dark:border-white/20 pb-3.5',
      caption_label: 'text-md font-medium flex items-center justify-center',
      weekdays: 'flex gap-[11px]',
      weekday: 'text-black/50 dark:text-white/50',
      button_previous:
        'absolute left-lg top-6 disabled:opacity-20 disabled:cursor-not-allowed focus-visible:styled-outline',
      nav: 'flex items-center',
      button_next: 'absolute right-lg top-6 focus-visible:styled-outline',
      month_grid: '!mt-3.5',
      week: 'flex gap-[11px] mt-[11px] justify-end',
      day: 'p-0 text-base rounded-full',
      day_button: 'h-5 w-5 focus-visible:styled-outline',
      selected:
        'bg-brand text-black-third violet:bg-brand-secondary violet:text-white opacity-100',
      outside: 'opacity-20 aria-selected:opacity-100',
      disabled: 'opacity-20 cursor-not-allowed'
    }}
    components={{
      Chevron: ({ orientation }: ChevronProps) =>
        orientation === 'left' ? (
          <Icon
            name='arrow'
            className='size-3 rotate-180 stroke-black/80 dark:stroke-white'
          />
        ) : (
          <Icon
            name='arrow'
            className='size-3 stroke-black/80 dark:stroke-white'
          />
        )
    }}
    {...props}
  />
)
