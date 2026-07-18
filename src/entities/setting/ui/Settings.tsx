import type { ReactNode } from 'react'

import { ScrollArea } from '@base-ui/react/scroll-area'

import { cn } from '@/shared/lib'
import { Loader } from '@/shared/ui'

type SectionProps = {
  title: string
  children: ReactNode
  isLoading?: boolean
}

type ChildrenProps = {
  children: ReactNode
  className?: string
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
      <>
        <h2 className='mb-7 shrink-0 text-xl'>{title}</h2>
        <ScrollArea.Root className='min-h-0 flex-1'>
          <ScrollArea.Viewport className='h-full'>
            <ScrollArea.Content className='pr-2'>
              <div className='space-y-3.5'>{children}</div>
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
      </>
    )}
  </div>
)

const SubTitle = ({ children, className }: ChildrenProps) => (
  <h3 className={cn('mb-4 text-base', className)}>{children}</h3>
)

const Item = ({ children, className }: ChildrenProps) => (
  <div className={cn('flex items-start justify-between gap-5 p-2', className)}>
    {children}
  </div>
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

export const Settings = Object.assign(Section, {
  SubTitle,
  Item,
  Content,
  Title,
  Description,
  Control
})
