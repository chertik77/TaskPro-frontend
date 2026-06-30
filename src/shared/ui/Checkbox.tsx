import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

import { cn } from '../lib'
import { Icon } from './Icon'

export const Checkbox = ({
  className,
  ...props
}: CheckboxPrimitive.Root.Props) => (
  <CheckboxPrimitive.Root
    className={cn(
      `peer data-checked:border-brand data-checked:bg-brand
      focus-visible:styled-outline relative flex size-4 shrink-0 items-center
      justify-center rounded-sm border border-black/15 bg-white
      transition-colors outline-none after:absolute after:-inset-x-3
      after:-inset-y-2 active:scale-95 disabled:cursor-not-allowed
      disabled:opacity-50 data-checked:text-black dark:border-white/10
      dark:bg-black`,
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className='grid place-content-center text-current transition-none
        [&>svg]:size-3.5'>
      <Icon name='check' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)
