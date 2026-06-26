import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '../lib'

const RadioGroup = ({ className, ...props }: RadioGroupPrimitive.Props) => (
  <RadioGroupPrimitive
    className={cn('flex gap-2', className)}
    {...props}
  />
)

const RadioGroupItem = ({
  className,
  indicatorClassname,
  ...props
}: RadioPrimitive.Root.Props & {
  indicatorClassname?: string
}) => (
  <RadioPrimitive.Root
    className={cn(
      'focus-visible:styled-outline relative size-3.5 rounded-full',
      className
    )}
    {...props}>
    <RadioPrimitive.Indicator
      className='flex size-3 items-center justify-center'>
      <span
        className={cn(
          `absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2
          rounded-full border-2 border-white dark:border-black`,
          indicatorClassname
        )}
      />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Root>
)

export { RadioGroup, RadioGroupItem }
