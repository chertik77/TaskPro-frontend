import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoardInitialState, Card, Column } from './board-types'

export const addNewBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  state.board = action.payload
}

export const getBoardByIdFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  state.board = action.payload
}

export const editBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  state.board.title = action.payload.title
  state.board.icon = action.payload.icon
  state.board.background = action.payload.background
}

export const deleteBoardFullfilled = (state: BoardInitialState) => {
  Object.assign(state, { board: {} })
}

export const addNewColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  state.board.columns.push(action.payload)
}

export const editNewColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  const columns = state.board.columns.map(column =>
    column._id === action.payload._id
      ? { ...column, ...action.payload }
      : column
  )

  state.board.columns = columns
}

export const deleteColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  const i = state.board.columns.findIndex(
    column => column._id === action.payload._id
  )
  state.board.columns.splice(i, 1)
}

export const addNewCardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Card>
) => {
  const column = state.board.columns.find(
    column => column._id === action.payload.column
  )

  column?.cards?.push(action.payload)
}

export const editCardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Card>
) => {
  const card = state.board.columns
    .find(column => column._id === action.payload.column)
    ?.cards?.find(card => card._id === action.payload._id)

  if (card) {
    card.title = action.payload.title
    card.description = action.payload.description
    card.priority = action.payload.priority
    card.deadline = action.payload.deadline
  }
}

export const deleteCardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Card>
) => {
  const column = state.board.columns.find(
    column => column._id === action.payload.column
  )
  if (column) {
    const cardIndex = column.cards.findIndex(
      card => card._id === action.payload._id
    )
    if (cardIndex !== -1) {
      column.cards.splice(cardIndex, 1)
    }
  }
}

export const changeCardColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Card>
) => {
  const oldColumn = state.board.columns.find(
    column => column._id === action.payload.oldColumn
  )

  const newColumn = state.board.columns.find(
    column => column._id === action.payload.column
  )

  const card = oldColumn?.cards?.find(card => card._id === action.payload._id)

  if (card) {
    oldColumn?.cards?.splice(oldColumn?.cards?.indexOf(card), 1)
    newColumn?.cards?.push(card)
  }
}
