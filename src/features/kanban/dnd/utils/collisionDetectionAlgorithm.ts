import type { Active, ClientRect, DroppableContainer } from '@dnd-kit/core'
import type { RectMap } from '@dnd-kit/core/dist/store'
import type { Coordinates } from '@dnd-kit/utilities'

import { pointerWithin, rectIntersection } from '@dnd-kit/core'

export const collisionDetectionAlgorithm = (args: {
  active: Active
  collisionRect: ClientRect
  droppableRects: RectMap
  droppableContainers: DroppableContainer[]
  pointerCoordinates: Coordinates | null
}) => {
  const type = args.active?.data.current?.type

  if (type === 'card') return pointerWithin(args)

  if (type === 'column') return rectIntersection(args)

  return pointerWithin(args)
}
