import type { ComponentProps } from 'react'

export const CardDraggingState = ({ ref, ...props }: ComponentProps<'div'>) => (
  <div
    ref={ref}
    {...props}
    className='border-brand violet:border-brand-violet h-[154px] rounded-lg border-2 bg-white
      py-3.5 pr-5 pl-6 opacity-60 dark:bg-black'
  />
)
