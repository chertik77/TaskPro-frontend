import type { ComponentProps } from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '../lib'

const RadioGroup = ({
  ref,
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('flex gap-2', className)}
    {...props}
  />
)

const RadioGroupItem = ({
  ref,
  className,
  indicatorClassname,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item> & {
  indicatorClassname?: string
}) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'focus-visible:styled-outline size-3.5 rounded-full',
      className
    )}
    {...props}>
    <RadioGroupPrimitive.Indicator
      className={cn(
        `flex justify-center rounded-full after:size-3 after:rounded-full
        after:border-2 after:border-white dark:after:border-black`,
        indicatorClassname
      )}
    />
  </RadioGroupPrimitive.Item>
)

export { RadioGroup, RadioGroupItem }
