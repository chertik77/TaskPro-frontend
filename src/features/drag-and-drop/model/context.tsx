import type { DragAndDropContext, DragAndDropProviderProps } from './types'

import { useMemo } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { createContext, useContextSelector } from 'use-context-selector'

import { coordinateGetter } from '../lib/coordinateGetter'
import { useGetAccessibilityAnnouncements } from '../lib/useGetAccessibilityAnnouncements'
import { useColumnDragHandlers } from './useColumnDragHandlers'
import { useDndState } from './useDndState'
import { useTaskDragHandlers } from './useTaskDragHandlers'

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const {
    columns,
    tasks,
    activeColumn,
    activeTask,
    setActiveColumn,
    setActiveTask,
    setColumns,
    setTasks
  } = useDndState(initialColumns)

  const taskDragHandlers = useTaskDragHandlers({
    tasks,
    setActiveTask,
    setTasks
  })

  const columnDragHandlers = useColumnDragHandlers({
    columns,
    setActiveColumn,
    setColumns
  })

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 5, delay: 250, tolerance: 5 }
    }),
    useSensor(KeyboardSensor, { coordinateGetter })
  )

  const announcements = useGetAccessibilityAnnouncements({ columns, tasks })

  const value = useMemo(
    () => ({ columns, tasks, activeTask, activeColumn }),
    [columns, tasks, activeTask, activeColumn]
  )

  return (
    // eslint-disable-next-line @eslint-react/no-context-provider
    <DragAndDropContext.Provider value={value}>
      <DndContext
        sensors={sensors}
        accessibility={{ announcements }}
        onDragStart={e => {
          taskDragHandlers.onDragStart(e)
          columnDragHandlers.onDragStart(e)
        }}
        onDragOver={taskDragHandlers.onDragOver}
        onDragEnd={e => {
          taskDragHandlers.onDragEnd(e)
          columnDragHandlers.onDragEnd(e)
        }}>
        {children}
      </DndContext>
    </DragAndDropContext.Provider>
  )
}

export const useDragAndDropSelector = <T,>(
  selector: (value: DragAndDropContext) => T
) => {
  const selected = useContextSelector(DragAndDropContext, ctx => {
    if (!ctx) {
      throw new Error(
        'useDragAndDropSelector must be used within a DragAndDropProvider'
      )
    }

    return selector(ctx)
  })

  return selected
}
