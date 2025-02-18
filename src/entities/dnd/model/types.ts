import type { Card } from '@/entities/card/@x/dnd'
import type { Column } from '@/entities/column/@x/dnd'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type DragAndDropContext = {
  setColumns: Dispatch<SetStateAction<Column[] | undefined>>
  setCards: Dispatch<SetStateAction<Card[] | undefined>>
  columns: Column[] | undefined
  cards: Card[] | undefined
  activeCard: Card | null
  activeColumn: Column | null
  setActiveCard: Dispatch<SetStateAction<Card | null>>
  setActiveColumn: Dispatch<SetStateAction<Column | null>>
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: Column[] | undefined
}
