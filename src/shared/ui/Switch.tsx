import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '../lib'

export const Switch = ({ className, ...props }: SwitchPrimitive.Root.Props) => (
  <SwitchPrimitive.Root
    className={cn(
      `focus-visible:styled-outline data-checked:bg-accent
      dark:data-unchecked:bg-gray/15 pointer-cursors:cursor-pointer relative
      inline-flex h-7 w-13 shrink-0 items-center rounded-full transition-all
      data-disabled:cursor-not-allowed data-disabled:opacity-50
      data-unchecked:bg-black/10`,
      className
    )}
    {...props}>
    <SwitchPrimitive.Thumb
      className='pointer-events-none block size-6 rounded-full bg-white
        transition-transform data-checked:translate-x-[calc(100%+2px)]
        data-unchecked:translate-x-0.5'
    />
  </SwitchPrimitive.Root>
)
