import type { RadioProps } from './priority-types'
import { forwardRef } from 'react'
export const RadioPriority = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, color, ...props }, ref) => {
    return (
      <>
        <label
          className='flex max-w-max cursor-pointer select-none items-center justify-center gap-2'
          htmlFor={`priority-${value}`}>
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
          <span
            className={`cursor-pointer text-fs-12-lh-normal-fw-400 hocus:opacity-100 ${props.checked ? 'opacity-100' : 'opacity-50'}`}>
            {value}
          </span>
        </label>
      </>
    )
  }
)
