import type { DragAndDropContext, DragAndDropProviderProps } from './types'

import { useMemo } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { createContext, useContextSelector } from 'use-context-selector'

import { createCollisionDetection } from '../lib/collisionDetection'
import { coordinateGetter } from '../lib/coordinateGetter'
import { useGetAccessibilityAnnouncements } from '../lib/useGetAccessibilityAnnouncements'
import { useColumnDragHandlers } from './useColumnDragHandlers'
import { useDndState } from './useDndState'
import { useTaskDragHandlers } from './useTaskDragHandlers'

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

const measuring = { droppable: { strategy: MeasuringStrategy.Always } }

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const {
    columns,
    tasks,
    tasksByColumn,
    activeColumn,
    activeTask,
    tasksRef,
    columnsRef,
    applyTasks,
    applyColumns,
    getColumnTaskIds,
    setActiveColumn,
    setActiveTask
  } = useDndState(initialColumns)

  const taskDragHandlers = useTaskDragHandlers({
    tasksRef,
    applyTasks,
    setActiveTask
  })

  const columnDragHandlers = useColumnDragHandlers({
    columnsRef,
    applyColumns,
    setActiveColumn
  })

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 }
    }),
    useSensor(KeyboardSensor, { coordinateGetter })
  )

  const collisionDetection = useMemo(
    () => createCollisionDetection(getColumnTaskIds),
    [getColumnTaskIds]
  )

  const announcements = useGetAccessibilityAnnouncements({ columns, tasks })

  const accessibility = useMemo(() => ({ announcements }), [announcements])

  const value = useMemo(
    () => ({ columns, tasksByColumn, activeTask, activeColumn }),
    [columns, tasksByColumn, activeTask, activeColumn]
  )

  return (
    // eslint-disable-next-line @eslint-react/no-context-provider
    <DragAndDropContext.Provider value={value}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        measuring={measuring}
        accessibility={accessibility}
        onDragStart={e => {
          taskDragHandlers.onDragStart(e)
          columnDragHandlers.onDragStart(e)
        }}
        onDragOver={taskDragHandlers.onDragOver}
        onDragEnd={e => {
          taskDragHandlers.onDragEnd(e)
          columnDragHandlers.onDragEnd(e)
        }}
        onDragCancel={() => {
          taskDragHandlers.onDragCancel()
          columnDragHandlers.onDragCancel()
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
