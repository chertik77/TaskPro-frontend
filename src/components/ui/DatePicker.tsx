import type { CardSchema } from 'lib/schemas'
import type { Control } from 'react-hook-form'

import { Content, Popover, Portal, Trigger } from '@radix-ui/react-popover'
import { Controller } from 'react-hook-form'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { formatTodayDate } from 'lib'

import { Calendar } from './Calendar'

type DatePickerProps = {
  control: Control<CardSchema>
}

export const DatePicker = ({ control }: DatePickerProps) => (
  <div className='relative'>
    <p className='mb-1 text-fs-12-lh-normal-fw-400 text-black/50 dark:text-white/50'>
      Deadline
    </p>
    <Controller
      control={control}
      name='deadline'
      render={({ field }) => (
        <Popover>
          <Trigger
            className='mb-[40px] flex items-center gap-1 text-fs-14-lh-normal-fw-500 text-brand
              violet:text-brand-secondary'>
            {formatTodayDate(field.value)}
            <MdKeyboardArrowDown className='size-[18px] text-brand violet:text-brand-secondary' />
          </Trigger>
          <Portal>
            <Content
              className='z-[1000]'
              align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
              />
            </Content>
          </Portal>
        </Popover>
      )}
    />
  </div>
)
