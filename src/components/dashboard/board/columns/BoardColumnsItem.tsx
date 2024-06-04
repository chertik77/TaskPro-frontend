import type { Column } from 'types'

import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { selectCardPriority, selectCardSort } from 'redux/filter.slice'

import { cn, getFilteredCardsByPriority, getSortedCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const cardPriority = useSelector(selectCardPriority)
  const cardSort = useSelector(selectCardSort)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSort)

  return (
    <>
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        exit={{ y: -40 }}
        transition={{ duration: 0.5 }}>
        <BoardColumnsActions
          column={column}
          sortedCardsLength={sortedCards?.length}
        />
      </motion.div>
      {column?.cards?.length > 0 && (
        <div
          className={cn(
            'custom-scrollbar -mr-4 space-y-2 overflow-y-auto pr-4',
            {
              'h-[calc(100dvh-300px)] desktop:h-[calc(100dvh-270px)]':
                column.cards.length > 3 && !cardPriority
            }
          )}>
          <AnimatePresence>
            {sortedCards?.map(card => (
              <motion.div
                key={card.id}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}>
                <BoardCard card={card} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
