import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type DragAndDropContext = {
  columns: ColumnTypes.ColumnsSchema | undefined
  cards: CardTypes.CardsSchema | undefined
  activeColumn: ColumnTypes.ColumnSchema | null
  activeCard: CardTypes.CardSchema | null
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: ColumnTypes.ColumnsSchema | undefined
}

export type CardDragHandlersProps = Pick<DragAndDropContext, 'cards'> & {
  setCards: Dispatch<SetStateAction<CardTypes.CardsSchema | undefined>>
  setActiveCard: Dispatch<SetStateAction<CardTypes.CardSchema | null>>
}

export type ColumnDragHandlersProps = Pick<DragAndDropContext, 'columns'> & {
  setActiveColumn: Dispatch<SetStateAction<ColumnTypes.ColumnSchema | null>>
  setColumns: Dispatch<SetStateAction<ColumnTypes.ColumnsSchema | undefined>>
}
