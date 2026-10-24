import type { DropAnimation } from '@dnd-kit/core'

import { defaultDropAnimationSideEffects, DragOverlay } from '@dnd-kit/core'
import { MotionGlobalConfig } from 'motion/react'
import { createPortal } from 'react-dom'

import { useDragAndDropSelector } from '@/features/drag-and-drop'

import { dropTiming } from '../config/animations'
import { MemoizedColumn } from './column-list/MemoizedColumn'
import { MemoizedTask } from './task-list/MemoizedTask'

const noop = () => {}

const hideDragSource = defaultDropAnimationSideEffects({
  styles: { active: { opacity: '0' } }
})

const dropAnimation: DropAnimation = {
  ...dropTiming,
  sideEffects: params => {
    const lifted =
      params.dragOverlay.node.querySelector<HTMLElement>('[data-drag-lift]')

    if (lifted) {
      const { scale, rotate, boxShadow, outlineColor } =
        getComputedStyle(lifted)

      lifted.animate(
        [
          { scale, rotate, boxShadow, outlineColor },
          {
            scale: '1',
            rotate: '0deg',
            boxShadow: '0px 0px 0px 0px rgba(17, 17, 17, 0)',
            outlineColor: 'transparent'
          }
        ],
        { ...dropTiming, fill: 'forwards' }
      )
    }

    return hideDragSource(params)
  }
}

export const KanbanDragOverlay = () => {
  const activeColumn = useDragAndDropSelector(ctx => ctx.activeColumn)
  const activeTask = useDragAndDropSelector(ctx => ctx.activeTask)
  const columns = useDragAndDropSelector(ctx => ctx.columns)

  return createPortal(
    <DragOverlay
      dropAnimation={MotionGlobalConfig.skipAnimations ? null : dropAnimation}>
      {activeColumn && (
        <div className='w-83.5'>
          <div
            data-drag-lift
            className='styled-outline animate-drag-lift list-none rounded-lg'>
            <MemoizedColumn
              column={activeColumn}
              isOverlay
            />
          </div>
        </div>
      )}
      {activeTask && (
        <div>
          <div
            data-drag-lift
            className='styled-outline animate-drag-lift cursor-grabbing
              rounded-lg [--drag-lift-rotate:1.5deg]'>
            <MemoizedTask
              task={activeTask}
              columns={columns}
              onCompletedChange={noop}
            />
          </div>
        </div>
      )}
    </DragOverlay>,
    document.body
  )
}
