import type { ComponentProps } from 'react'
import type { ChevronProps } from 'react-day-picker'

import { DayPicker } from 'react-day-picker'

import { cn } from '@/shared/lib/cn'
import { Icon } from '@/shared/ui'

export const Calendar = ({
  className,
  classNames,
  ...props
}: ComponentProps<typeof DayPicker>) => (
  <DayPicker
    weekStartsOn={1}
    showOutsideDays
    fixedWeeks
    autoFocus
    className={cn(
      `border-brand violet:border-brand-violet dark:bg-black-muted relative rounded-lg
      border bg-white p-4.5`,
      className
    )}
    classNames={{
      month_caption:
        'border-b border-black/20 dark:border-white/20 pb-3.5 mb-3.5',
      caption_label: 'text-lg font-medium flex items-center justify-center',
      button_previous:
        'absolute left-4.5 top-6 aria-disabled:opacity-20 aria-disabled:cursor-not-allowed focus-visible:styled-outline',
      button_next: 'absolute right-4.5 top-6 focus-visible:styled-outline',
      weekdays: 'flex',
      weekday: 'w-8 text-black/50 dark:text-white/50',
      weeks: 'block mt-1',
      week: 'flex w-full justify-end',
      day: 'text-base rounded-full',
      day_button:
        'size-8 focus-visible:styled-outline rounded-full violet:not-disabled:hocus:bg-white-gray not-disabled:hocus:bg-black/10 dark:not-disabled:hocus:bg-gray/60',
      today:
        'text-brand violet:text-brand-violet aria-selected:text-black-muted violet:aria-selected:text-white',
      selected:
        'bg-brand text-black-muted violet:bg-brand-violet violet:text-white opacity-100',
      outside: 'opacity-20 aria-selected:opacity-100 hocus:opacity-100',
      disabled: 'opacity-10 cursor-not-allowed',
      ...classNames
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
