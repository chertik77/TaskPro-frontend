import type { Active, ClientRect, DroppableContainer } from '@dnd-kit/core'
import type { RectMap } from '@dnd-kit/core/dist/store'
import type { Coordinates } from '@dnd-kit/utilities'

import { closestCorners, rectIntersection } from '@dnd-kit/core'

export const collisionDetection = (args: {
  active: Active
  collisionRect: ClientRect
  droppableRects: RectMap
  droppableContainers: DroppableContainer[]
  pointerCoordinates: Coordinates | null
}) => {
  const type = args.active.data.current?.type

  return type === 'column' ? rectIntersection(args) : closestCorners(args)
}
