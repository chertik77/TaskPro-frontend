import type { ComponentProps } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '../lib'

const Tabs = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn('tablet:p-10 rounded-lg bg-black p-6', className)}
    {...props}
  />
)

const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn('flex items-center gap-3.5 text-xl', className)}
    {...props}
  />
)

const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'focus-visible:styled-outline text-white/30 data-[state=active]:text-white',
      className
    )}
    {...props}
  />
)

const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn('focus-visible:styled-outline', className)}
    {...props}
  />
)

export { Tabs, TabsList, TabsTrigger, TabsContent }
