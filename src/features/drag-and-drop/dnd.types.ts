import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type DragAndDropContext = {
  columns: ColumnTypes.ColumnsSchema
  cards: CardTypes.CardsSchema
  activeColumn: ColumnTypes.ColumnSchema | null
  activeCard: CardTypes.CardSchema | null
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: ColumnTypes.ColumnsSchema | undefined
}

export type CardDragHandlersProps = Pick<DragAndDropContext, 'cards'> & {
  setCards: Dispatch<SetStateAction<CardTypes.CardsSchema>>
  setActiveCard: Dispatch<SetStateAction<CardTypes.CardSchema | null>>
}

export type ColumnDragHandlersProps = Pick<DragAndDropContext, 'columns'> & {
  setColumns: Dispatch<SetStateAction<ColumnTypes.ColumnsSchema>>
  setActiveColumn: Dispatch<SetStateAction<ColumnTypes.ColumnSchema | null>>
}
