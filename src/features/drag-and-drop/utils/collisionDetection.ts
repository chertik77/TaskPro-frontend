import type { Active, ClientRect, DroppableContainer } from '@dnd-kit/core'
import type { RectMap } from '@dnd-kit/core/dist/store'
import type { Coordinates } from '@dnd-kit/utilities'

import { pointerWithin, rectIntersection } from '@dnd-kit/core'

export const collisionDetection = (args: {
  active: Active
  collisionRect: ClientRect
  droppableRects: RectMap
  droppableContainers: DroppableContainer[]
  pointerCoordinates: Coordinates | null
}) => {
  const pointerCollisions = pointerWithin(args)

  if (pointerCollisions.length > 0) return pointerCollisions

  return rectIntersection(args)
}
