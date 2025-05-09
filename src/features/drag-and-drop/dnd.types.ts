import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type DragAndDropContext = {
  setColumns: Dispatch<SetStateAction<ColumnTypes.ColumnSchema[] | undefined>>
  setCards: Dispatch<SetStateAction<CardTypes.CardSchema[] | undefined>>
  columns: ColumnTypes.ColumnSchema[] | undefined
  cards: CardTypes.CardSchema[] | undefined
  activeCard: CardTypes.CardSchema | null
  activeColumn: ColumnTypes.ColumnSchema | null
  setActiveCard: Dispatch<SetStateAction<CardTypes.CardSchema | null>>
  setActiveColumn: Dispatch<SetStateAction<ColumnTypes.ColumnSchema | null>>
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: ColumnTypes.ColumnSchema[] | undefined
}
