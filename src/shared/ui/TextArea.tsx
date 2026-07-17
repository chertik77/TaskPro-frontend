import type { ComponentProps } from 'react'

import { cn } from '../lib'

export const TextArea = ({
  className,
  ...props
}: ComponentProps<'textarea'>) => (
  <textarea
    className={cn(
      `border-accent/40 focus-visible:border-accent block h-38.5 w-full
      resize-none rounded-lg border bg-transparent px-4.5 py-3.5 outline-none
      placeholder:opacity-40
      supports-[-webkit-overflow-scrolling:touch]:text-lg`,
      className
    )}
    {...props}
  />
)
