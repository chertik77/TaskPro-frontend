import type { RadioProps } from './priority-types'
import { forwardRef } from 'react'

export const RadioPriority = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, color, ...props }, ref) => {
    return (
      <div className='flex size-4 items-center justify-center '>
        <label
          className={`flex size-full cursor-pointer items-center justify-center rounded-[50%] ${color}`}>
          <input
            type='radio'
            name='priority'
            value={value}
            className='peer hidden size-full'
            {...props}
            ref={ref}
          />
          <div className='size-[90%] rounded-[50%] border-[2px] border-white opacity-0 transition duration-300 ease-in-out peer-checked:opacity-100 dark:border-black'></div>
        </label>
      </div>
    )
  }
)
