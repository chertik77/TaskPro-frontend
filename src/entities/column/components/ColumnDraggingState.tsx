import type { ComponentProps } from 'react'

export const ColumnDraggingState = ({
  ref,
  ...props
}: ComponentProps<'div'>) => (
  <div
    ref={ref}
    {...props}
    className='w-84 rounded-lg border-2 border-brand bg-white-gray opacity-60
      violet:border-brand-violet dark:bg-black'
  />
)
