import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'

import { useMemo, useState } from 'react'
import { parse } from 'valibot'

import { ColumnContracts } from '@/entities/column'

export const useDndState = (
  initialColumns: ColumnTypes.ColumnsSchema | undefined
) => {
  const parsedColumns = useMemo(
    () => parse(ColumnContracts.ColumnsSchema, initialColumns),
    [initialColumns]
  )

  const [columns, setColumns] = useState(parsedColumns)
  const [cards, setCards] = useState(parsedColumns.flatMap(c => c.cards))
  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeCard, setActiveCard] = useState<CardTypes.CardSchema | null>(
    null
  )

  const [activeColumn, setActiveColumn] =
    useState<ColumnTypes.ColumnSchema | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)

    const parsedColumns = parse(ColumnContracts.ColumnsSchema, initialColumns)

    setColumns(parsedColumns)
    setCards(parsedColumns.flatMap(c => c.cards))
  }

  return {
    columns,
    cards,
    activeColumn,
    activeCard,
    setColumns,
    setCards,
    setActiveColumn,
    setActiveCard
  }
}
