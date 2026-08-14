import type { CollisionDetection } from '@dnd-kit/core'

import {
  closestCenter,
  closestCorners,
  getFirstCollision,
  pointerWithin,
  rectIntersection
} from '@dnd-kit/core'

export const createCollisionDetection =
  (getColumnTaskIds: (columnId: string) => string[]): CollisionDetection =>
  args => {
    const { active, droppableContainers, pointerCoordinates } = args

    if (active.data.current?.type === 'column') {
      return closestCenter({
        ...args,
        droppableContainers: droppableContainers.filter(
          container => container.data.current?.type === 'column'
        )
      })
    }

    const intersections = pointerCoordinates
      ? pointerWithin(args)
      : closestCorners(args)

    const collisions = intersections.length
      ? intersections
      : rectIntersection(args)

    const overId = getFirstCollision(collisions, 'id')

    if (overId === null) return []

    const overContainer = droppableContainers.find(
      container => container.id === overId
    )

    if (overContainer?.data.current?.type !== 'column') return [{ id: overId }]

    const taskIds = getColumnTaskIds(String(overId))

    if (!taskIds.length) return [{ id: overId }]

    return closestCorners({
      ...args,
      droppableContainers: droppableContainers.filter(
        container =>
          container.id !== overId && taskIds.includes(String(container.id))
      )
    })
  }
