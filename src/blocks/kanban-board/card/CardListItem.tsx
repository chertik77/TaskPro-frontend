import type { CardTypes } from '@/entities/card'

import { isToday } from 'date-fns'

import { DeleteCardTrigger } from '@/features/card/delete-card'
import { EditCardModalTrigger } from '@/features/card/edit-card'
import { Draggable } from '@/features/drag-and-drop'

import { CardDraggingState, getPriorityColor } from '@/entities/card'

import { cn } from '@/shared/lib/cn'
import { Icon } from '@/shared/ui'

import { CardListItemDeadline } from './CardListItemDeadline'
import { CardListItemPriority } from './CardListItemPriority'

type CardListItemProps = {
  card: CardTypes.CardSchema
}

export const CardListItem = ({ card }: CardListItemProps) => (
  <Draggable
    entity={card}
    key={card.id}
    draggableType='card'
    WhileDraggingComponent={CardDraggingState}>
    {({ setNodeRef, isDragging, attributes, listeners, style }) => (
      <li
        className={cn(
          'cursor-grab touch-manipulation list-none focus-visible:outline-none',
          isDragging && 'select-none'
        )}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}>
        <div
          className='relative h-[154px] overflow-hidden rounded-lg bg-white py-3.5 pl-6 pr-5
            dark:bg-black'>
          <span
            className={cn(
              'absolute left-0 top-0 h-full w-1 rounded-l',
              getPriorityColor(card.priority)
            )}
          />
          <p className='mb-2 text-base font-semibold'>{card.title}</p>
          <p className='mb-3.5 line-clamp-2 text-md text-black/70 dark:text-white/50'>
            {card.description}
          </p>
          <div className='flex items-end border-t border-black/10 pt-3.5 dark:border-white/10'>
            <CardListItemPriority priority={card.priority} />
            <CardListItemDeadline deadline={card.deadline} />
            <div className='ml-auto flex gap-2'>
              {isToday(card.deadline) && (
                <Icon
                  name='bell'
                  className='size-4.5 animate-bounce stroke-brand pr-1 violet:stroke-brand-violet'
                />
              )}
              <EditCardModalTrigger card={card} />
              <DeleteCardTrigger cardId={card.id} />
            </div>
          </div>
        </div>
      </li>
    )}
  </Draggable>
)
