import type { ReactNode, RefObject } from 'react'

import { Component } from 'react'
import { MotionGlobalConfig } from 'motion/react'

import { flipTiming } from '../config/animations'

type Point = { x: number; y: number }

type Snapshot = Map<string, Point> | null

type FlipGroupProps = {
  containerRef: RefObject<HTMLElement | null>
  disabled?: boolean
  children: ReactNode
}

const ITEM_SELECTOR = ':scope > [data-flip-id], :scope > * > [data-flip-id]'

const FLIP_ANIMATION_ID = 'flip'

const getItems = (container: HTMLElement) => [
  ...container.querySelectorAll<HTMLElement>(ITEM_SELECTOR)
]

const getOffset = (item: HTMLElement, origin: DOMRect): Point => {
  const rect = item.getBoundingClientRect()

  return { x: rect.left - origin.left, y: rect.top - origin.top }
}

/**
 * A class component because only getSnapshotBeforeUpdate can read the DOM
 * right before React mutates it.
 */
export class FlipGroup extends Component<FlipGroupProps> {
  getSnapshotBeforeUpdate(prevProps: FlipGroupProps): Snapshot {
    const { containerRef, disabled } = this.props

    const container = containerRef.current

    // While dragging, and in the commit the drag ends in, dnd-kit has already
    // moved the items visually — animating them again would move them twice.
    if (
      !container ||
      prevProps.disabled ||
      disabled ||
      MotionGlobalConfig.skipAnimations
    ) {
      return null
    }

    const origin = container.getBoundingClientRect()

    const snapshot = new Map<string, Point>()

    for (const item of getItems(container)) {
      const id = item.dataset.flipId

      if (id) snapshot.set(id, getOffset(item, origin))
    }

    return snapshot
  }

  componentDidUpdate(_: FlipGroupProps, __: unknown, snapshot: Snapshot) {
    const { containerRef } = this.props

    const container = containerRef.current

    if (!container || !snapshot?.size) return

    const items = getItems(container)

    for (const item of items) {
      for (const animation of item.getAnimations()) {
        if (animation.id === FLIP_ANIMATION_ID) animation.cancel()
      }
    }

    const origin = container.getBoundingClientRect()

    for (const item of items) {
      const previous = item.dataset.flipId && snapshot.get(item.dataset.flipId)

      if (!previous) continue

      const current = getOffset(item, origin)

      const dx = previous.x - current.x
      const dy = previous.y - current.y

      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue

      item.animate(
        { translate: [`${dx}px ${dy}px`, '0px 0px'] },
        { ...flipTiming, id: FLIP_ANIMATION_ID }
      )
    }
  }

  render() {
    const { children } = this.props

    return children
  }
}
