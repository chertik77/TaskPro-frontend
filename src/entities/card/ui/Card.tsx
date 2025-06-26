import type { ComponentProps } from 'react'
import type { CardSchema } from '../model/types'

import { createContext, use, useMemo } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { format, isToday } from 'date-fns'

import { cn } from '@/shared/lib'
import { Icon } from '@/shared/ui'

import { getPriorityColor } from '../lib/priority-colors'

type CardContext = {
  card: CardSchema
}

const CardContext = createContext<CardContext | undefined>(undefined)

const useCardContext = () => {
  const context = use(CardContext)

  if (!context) {
    throw new Error('useCardContext must be used with a CardContext.Provider')
  }

  return context
}

type CardProviderProps = CardContext & ComponentProps<'div'>

const CardProvider = ({
  card,
  className,
  children,
  ...props
}: CardProviderProps) => {
  const value = useMemo(() => ({ card }), [card])

  return (
    <CardContext value={value}>
      <div
        className={cn(
          `relative h-[154px] overflow-hidden rounded-lg bg-white py-3.5 pr-5 pl-6
          dark:bg-black`,
          className
        )}
        {...props}>
        {children}
      </div>
    </CardContext>
  )
}

const CardPriorityIndicator = ({
  className,
  ...props
}: ComponentProps<'span'>) => {
  const { card } = useCardContext()

  return (
    <span
      className={cn(
        'absolute top-0 left-0 h-full w-1 rounded-l',
        getPriorityColor(card.priority),
        className
      )}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }: ComponentProps<'p'>) => {
  const { card } = useCardContext()

  return (
    <p
      className={cn('mr-12 mb-2 truncate text-base font-semibold', className)}
      {...props}>
      {card.title}
    </p>
  )
}

const CardDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  const { card } = useCardContext()

  return (
    <p
      className={cn(
        `text-md mb-3.5 line-clamp-2 max-w-[275px] break-all text-black/70
        dark:text-white/50`,
        className
      )}
      {...props}>
      {card.description}
    </p>
  )
}

const CardPriority = ({ className }: { className?: string }) => {
  const { card } = useCardContext()

  return (
    <div className={cn('mr-3.5', className)}>
      <p className='mb-1 text-xs text-black/50 dark:text-white/50'>Priority</p>
      <div className='flex items-center gap-1'>
        <div
          className={cn('size-3 rounded-full', getPriorityColor(card.priority))}
        />
        <p className='text-sm'>{card.priority}</p>
      </div>
    </div>
  )
}

const CardDeadline = ({ className }: { className?: string }) => {
  const { card } = useCardContext()

  return (
    <div className={cn(className)}>
      <p className='mb-1 text-xs text-black/50 dark:text-white/50'>Deadline</p>
      <p className='text-sm'>{format(card.deadline, 'dd/MM/yyyy')}</p>
    </div>
  )
}

const CardDeadlineTodayIndicator = ({ className }: { className?: string }) => {
  const { card } = useCardContext()

  return (
    isToday(card.deadline) && (
      <Icon
        name='bell'
        className={cn(
          'stroke-brand violet:stroke-brand-violet size-4.5 animate-bounce pr-1',
          className
        )}
      />
    )
  )
}

type CardActionButtonProps = ComponentProps<'button'> & {
  asChild?: boolean
}

const CardActionButton = ({
  className,
  asChild,
  ref,
  ...props
}: CardActionButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      type='button'
      className={cn(
        `focus-visible:styled-outline hocus:[&_svg]:stroke-black
        dark:hocus:[&_svg]:stroke-white-soft dark:[&_svg]:dark:stroke-white-soft/50
        [&_svg]:size-4 [&_svg]:stroke-black/50`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

export const Card = Object.assign(CardProvider, {
  PriorityIndicator: CardPriorityIndicator,
  Title: CardTitle,
  Description: CardDescription,
  Priority: CardPriority,
  Deadline: CardDeadline,
  DeadlineTodayIndicator: CardDeadlineTodayIndicator,
  ActionButton: CardActionButton
})
