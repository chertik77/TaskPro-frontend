import type { ChevronProps } from '@daypicker/react'
import type { ComponentProps } from 'react'

import { DayPicker } from '@daypicker/react'
import { ChevronRightIcon } from 'lucide-react'

import { cn } from '../lib'

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
      `border-brand dark:bg-black-muted relative rounded-lg border bg-white
      p-4.5`,
      className
    )}
    classNames={{
      month_caption:
        'border-b border-black/20 dark:border-white/20 pb-3.5 mb-3.5',
      caption_label: 'text-lg font-medium flex items-center justify-center',
      button_previous:
        'absolute left-4.5 top-6 focus-visible:styled-outline aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
      button_next:
        'absolute right-4.5 top-6 focus-visible:styled-outline aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
      weekdays: 'flex',
      weekday: 'w-8 text-black/50 dark:text-white/50',
      weeks: 'block mt-1',
      week: 'flex w-full justify-end',
      day: 'text-base rounded-full group',
      day_button:
        'size-8 focus-visible:styled-outline rounded-full dark:not-group-aria-selected:hocus:bg-gray/80 not-group-aria-selected:hocus:bg-gray-light',
      today: 'text-brand aria-selected:text-black-muted',
      selected: 'bg-brand text-black-muted opacity-100',
      outside: 'opacity-20 aria-selected:opacity-100 hocus:opacity-100',
      disabled: 'opacity-20 pointer-events-none',
      ...classNames
    }}
    components={{
      // eslint-disable-next-line @eslint-react/no-nested-component-definitions
      Chevron: ({ orientation }: ChevronProps) => (
        <ChevronRightIcon
          className={cn(
            'size-4 stroke-black/80 dark:stroke-white',
            orientation === 'left' && 'rotate-180'
          )}
        />
      )
    }}
    {...props}
  />
)
