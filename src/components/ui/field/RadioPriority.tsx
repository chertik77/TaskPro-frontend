import type { RadioProps } from './priority-types'
import { forwardRef } from 'react'

export const RadioPriority = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, color, ...props }, ref) => {
    return (
      <>
        <div className='flex max-w-max cursor-pointer select-none gap-2'>
          <div
            className={`flex size-4 cursor-pointer items-center justify-center rounded-[50%] ${color}`}>
            <input
              type='radio'
              name='priority'
              id={`priority-${value}`}
              className='peer hidden size-full'
              {...props}
              ref={ref}
            />
            <div className='size-[90%] rounded-[50%] border-[2px] border-white opacity-0 transition duration-300 ease-in-out peer-checked:opacity-100 dark:border-black'></div>
          </div>
          <label
            htmlFor={`priority-${value}`}
            className='cursor-pointer opacity-50 hocus:opacity-100'>
            {value}
          </label>
        </div>
      </>
    )
  }
)
