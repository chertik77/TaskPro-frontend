import type { Card } from 'types/board.types'

import { format, isBefore, isToday } from 'date-fns'
import { useModal } from 'react-modal-state'

import { Button } from 'components/ui'

import { useDeleteCard } from 'hooks/card/useDeleteCard'

import { cn } from 'lib'

import { CardColumnSelect } from './CardColumnSelect'

export const BoardCard = ({ card }: { card: Card }) => {
  const { open } = useModal('edit-card-modal')

  const { mutate } = useDeleteCard(card.column, card._id)

  return (
    <div
      className={cn(
        `h-[154px] w-[334px] rounded-[8px] border-l-[4px] bg-white py-[14px] pl-[24px]
        pr-[20px] dark:bg-black`,
        card.priority === 'Without priority' &&
          'border-black/30 dark:border-white/30',
        card.priority === 'High' && 'border-brand',
        card.priority === 'Medium' && 'border-priority-medium',
        card.priority === 'Low' && 'border-priority-low'
      )}>
      <p className='pb-[8px] text-fs-14-lh-normal-fw-600 text-black dark:text-white'>
        {card.title}
      </p>
      <p
        className='mb-default line-clamp-2 min-h-[38px] text-fs-12-lh-normal-fw-400 text-black/70
          dark:text-white/50'>
        {card.description}
      </p>
      <div className='flex items-end border-t-DEFAULT border-black/10 pt-default dark:border-white/10'>
        <div className='pr-default'>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Priority
          </p>
          <div className='flex items-center gap-[4px]'>
            <div
              className={cn(
                'size-[12px] rounded-[50%]',
                card.priority === 'Without priority' &&
                  'bg-black/30 dark:bg-white/30',
                card.priority === 'High' && 'bg-brand',
                card.priority === 'Medium' && 'bg-priority-medium',
                card.priority === 'Low' && 'bg-priority-low'
              )}></div>
            <p className='text-fs-10-lh-normal-fw-400 text-black dark:text-white'>
              {card.priority === 'Without priority' ? 'Without' : card.priority}
            </p>
          </div>
        </div>
        <div>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Deadline
          </p>
          <p className='text-fs-10-lh-normal-fw-400 text-black dark:text-white'>
            {format(card.deadline, 'MM/dd/yyyy')}
          </p>
        </div>
        <div className='ml-auto flex gap-[8px]'>
          {isToday(card.deadline) && (
            <svg className='size-[19px] animate-bounce stroke-brand pr-[4px]'>
              <use href='/icons.svg#icon-bell'></use>
            </svg>
          )}
          {isBefore(card.deadline, new Date()) && !isToday(card.deadline) && (
            <svg className='size-[19px] animate-bounce stroke-red-500 pr-[4px]'>
              <use href='/icons.svg#icon-bell'></use>
            </svg>
          )}
          <CardColumnSelect card={card} />
          <Button
            onClick={() =>
              open({ card, columnId: card.column, cardId: card._id })
            }
            iconName='pencil'
          />
          <Button
            onClick={() => mutate()}
            iconName='trash'
          />
        </div>
      </div>
    </div>
  )
}
