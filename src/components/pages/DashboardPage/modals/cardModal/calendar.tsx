import { cn } from 'lib/utils'
import { DayPicker } from 'react-day-picker'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      weekStartsOn={1}
      className={cn('border border-brand p-[18px]', className)}
      classNames={{
        months: 'flex flex-col space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption:
          'flex justify-center relative items-center border-b border-white/20 pb-[14px]',
        caption_label: 'text-fs-16-lh-normal-fw-500',
        nav: 'space-x-1 flex items-center',
        nav_button: 'hover:text-brand',
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse !mt-[14px]',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          // buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 text-fs-14-lh-1.28-fw-400 flex items-center justify-center rounded-md'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-brand text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-brand text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30'
        // day_range_middle:
        //   'aria-selected:bg-accent aria-selected:text-accent-foreground'
      }}
      components={{
        IconLeft: () => <MdKeyboardArrowLeft className='size-4' />,
        IconRight: () => <MdKeyboardArrowRight className='size-4' />
      }}
      {...props}
    />
  )
}
