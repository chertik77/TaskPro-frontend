import type { ComponentProps } from 'react'

export const ColumnDraggingState = ({
  ref,
  ...props
}: ComponentProps<'div'>) => (
  <div
    ref={ref}
    {...props}
    className='border-brand bg-white-gray violet:border-brand-violet w-84 rounded-lg border-2
      opacity-60 dark:bg-black'
  />
)
