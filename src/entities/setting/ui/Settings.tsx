import type { Variants } from 'motion/react'
import type { ReactNode } from 'react'

import { ScrollArea } from '@base-ui/react/scroll-area'
import { stagger } from 'motion/react'
import * as m from 'motion/react-m'

import { cn } from '@/shared/lib'
import {
  Loader,
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

type SectionProps = {
  title: string
  children: ReactNode
  isLoading?: boolean
}

type ChildrenProps = {
  children: ReactNode
  className?: string
}

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.05) } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1] } },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
}

const Section = ({ title, children, isLoading }: SectionProps) => (
  <div
    className='bg-white-soft border-accent dark:border-accent/50 flex h-full
      flex-col rounded-lg border p-6 dark:bg-black'>
    {isLoading ? (
      <div className='flex h-full items-center justify-center gap-2'>
        <Loader />
        Loading...
      </div>
    ) : (
      <m.div
        key='content'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='flex min-h-0 flex-1 flex-col'>
        <h2 className='mb-7 shrink-0 text-xl'>{title}</h2>
        <ScrollArea.Root className='min-h-0 flex-1'>
          <ScrollArea.Viewport className='h-full'>
            <ScrollArea.Content className='pr-2'>
              <m.div
                variants={container}
                initial='hidden'
                animate='show'
                className='space-y-3.5'>
                {children}
              </m.div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className='pointer-events-none w-2 bg-transparent opacity-0
              transition-opacity duration-200 data-scrolling:pointer-events-auto
              data-scrolling:opacity-100 data-scrolling:duration-initial'>
            <ScrollArea.Thumb
              className='rounded-[26px] bg-black/30 dark:bg-white/60'
            />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </m.div>
    )}
  </div>
)

const SubTitle = ({ children, className }: ChildrenProps) => (
  <h3 className={cn('mb-4 text-base', className)}>{children}</h3>
)

const Item = ({ children, className }: ChildrenProps) => (
  <m.div
    layout
    variants={itemVariants}
    exit='exit'
    className={cn('flex items-start justify-between gap-5 p-2', className)}>
    {children}
  </m.div>
)

const Content = ({ children, className }: ChildrenProps) => (
  <div className={cn('space-y-2', className)}>{children}</div>
)

const Title = ({ children, className }: ChildrenProps) => (
  <h4 className={cn('font-medium', className)}>{children}</h4>
)

const Description = ({ children, className }: ChildrenProps) => (
  <p className={cn('text-black/50 dark:text-white/50', className)}>
    {children}
  </p>
)

const Control = ({ children, className }: ChildrenProps) => (
  <div className={cn('shrink-0', className)}>{children}</div>
)

type SelectOption<T extends string> = {
  value: T
  label: string
}

type SettingSelectProps<T extends string> = {
  value: T | undefined
  onChange: (value: T | null) => void
  options: readonly SelectOption<T>[]
}

export const SettingSelect = <T extends string>({
  value,
  onChange,
  options
}: SettingSelectProps<T>) => (
  <Select
    value={value}
    items={options}
    onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {options.map(option => (
        <SelectItem
          key={option.value}
          value={option.value}>
          <SelectItemText>{option.label}</SelectItemText>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

export const Settings = Object.assign(Section, {
  SubTitle,
  Item,
  Content,
  Title,
  Description,
  Control,
  Select: SettingSelect
})
