/* eslint-disable no-restricted-imports */

import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type {
  Active,
  Collision,
  DndContextProps,
  Announcements as OriginalAnnouncements,
  Over,
  Translate
} from '@dnd-kit/core'
import type { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext'
import type { RefObject } from 'react'

import { DndContext as OriginalDndContext } from '@dnd-kit/core'

type DroppableData =
  | { type: 'card'; card: CardTypes.CardSchema }
  | { type: 'column'; column: ColumnTypes.ColumnSchema }

type DraggableData =
  | { type: 'card'; card: CardTypes.CardSchema }
  | { type: 'column'; column: ColumnTypes.ColumnSchema }

type TypesafeActive = {
  id: string
  data: RefObject<DraggableData | undefined>
} & Omit<Active, 'data' | 'id'>

type TypesafeOver = {
  id: string
  data: RefObject<DroppableData | undefined>
} & Omit<Over, 'data' | 'id'>

type DragEvent = {
  activatorEvent: Event
  active: TypesafeActive
  collisions: Collision[] | null
  delta: Translate
  over: TypesafeOver | null
}

export type DragStartEvent = {} & Pick<DragEvent, 'active' | 'activatorEvent'>
export type DragMoveEvent = {} & DragEvent
export type DragOverEvent = {} & DragMoveEvent
export type DragEndEvent = {} & DragEvent
export type DragCancelEvent = {} & DragEndEvent

type Arguments = Pick<DragEvent, 'active' | 'over'>

export type Announcements = {
  onDragStart(event: Pick<Arguments, 'active'>): string | undefined
  onDragMove?(event: Arguments): string | undefined
  onDragOver(event: Arguments): string | undefined
  onDragEnd(event: Arguments): string | undefined
  onDragCancel(event: Arguments): string | undefined
} & Omit<
  OriginalAnnouncements,
  'onDragStart' | 'onDragMove' | 'onDragOver' | 'onDragEnd' | 'onDragCancel'
>

type Accessibility = Omit<
  NonNullable<Props['accessibility']>,
  'announcements'
> & {
  announcements?: Announcements
}

type DndContextTypesafeProps = {
  onDragStart?(event: DragStartEvent): void
  onDragMove?(event: DragMoveEvent): void
  onDragOver?(event: DragOverEvent): void
  onDragEnd?(event: DragEndEvent): void
  onDragCancel?(event: DragCancelEvent): void
  accessibility?: Accessibility
} & Omit<
  DndContextProps,
  | 'onDragStart'
  | 'onDragMove'
  | 'onDragOver'
  | 'onDragEnd'
  | 'onDragCancel'
  | 'accessibility'
>

export const DndContext = (props: DndContextTypesafeProps) => (
  <OriginalDndContext {...props} />
)
