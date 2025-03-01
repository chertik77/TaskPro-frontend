import type { ComponentPropsWithoutRef, ElementRef } from 'react'

import { forwardRef } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/shared/lib/cn'

export const PriorityRadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('flex gap-2', className)}
    {...props}
  />
))

export const PriorityRadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    indicatorClassname?: string
  }
>(({ className, indicatorClassname, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'focus-visible:styled-outline size-3.5 rounded-full',
      className
    )}
    {...props}>
    <RadioGroupPrimitive.Indicator
      className={cn(
        `flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
        after:border-white after:dark:border-black`,
        indicatorClassname
      )}
    />
  </RadioGroupPrimitive.Item>
))
