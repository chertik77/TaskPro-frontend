import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '../lib'

export const Checkbox = ({
  className,
  ...props
}: CheckboxPrimitive.Root.Props) => (
  <CheckboxPrimitive.Root
    className={cn(
      `peer data-checked:border-accent data-checked:bg-accent
      focus-visible:styled-outline pointer-cursors:cursor-pointer relative flex
      size-4 shrink-0 items-center justify-center rounded-sm border
      border-black/20 bg-white transition-colors outline-none after:absolute
      after:-inset-x-3 after:-inset-y-2 active:scale-95
      disabled:cursor-not-allowed disabled:opacity-50 data-checked:text-black
      dark:border-white/20 dark:bg-black`,
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className='grid place-content-center text-current transition-none
        [&>svg]:size-3.5'>
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)
