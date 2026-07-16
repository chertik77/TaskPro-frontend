import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

type SectionProps = {
  title: string
  children: ReactNode
}

type ChildrenProps = {
  children: ReactNode
  className?: string
}

const Section = ({ title, children }: SectionProps) => (
  <div
    className='bg-white-soft border-brand dark:border-brand/50 h-full w-full
      rounded-lg border p-6 dark:bg-black'>
    <h2 className='mb-7 text-xl'>{title}</h2>
    <div className='space-y-3.5'>{children}</div>
  </div>
)

const Item = ({ children, className }: ChildrenProps) => (
  <div className={cn('flex items-start justify-between gap-4 p-2', className)}>
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
  <div className={cn(className)}>{children}</div>
)

export const Settings = Object.assign(Section, {
  Item,
  Content,
  Title,
  Description,
  Control
})
