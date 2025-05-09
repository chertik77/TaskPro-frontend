import type { ComponentProps } from 'react'

export const CardDraggingState = ({ ref, ...props }: ComponentProps<'div'>) => (
  <div
    ref={ref}
    {...props}
    className='h-[154px] rounded-lg border-2 border-brand bg-white py-3.5 pl-6 pr-5 opacity-60
      violet:border-brand-violet dark:bg-black'
  />
)
