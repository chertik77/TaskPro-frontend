import type { Column } from 'types'

import { useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import { useOnDragEnd } from 'hooks/card'

import { BoardAddColumnBtn } from './BoardAddColumnBtn'
import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  columns: Column[] | undefined
  backgroundIdentifier?: string
}

export const BoardColumnsList = ({
  columns,
  backgroundIdentifier
}: BoardColumnsListProps) => {
  const [orderedColumns, setOrderedColumns] = useState(columns)

  useEffect(() => {
    setOrderedColumns(columns)
  }, [columns])

  const [animationParent] = useAutoAnimate({ duration: 400 })

  const { onDragEnd } = useOnDragEnd({
    orderedColumns: orderedColumns,
    setOrderedColumns: setOrderedColumns
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className='flex gap-[34px]'
        ref={animationParent}>
        {orderedColumns?.map(column => (
          <Droppable
            key={column.id}
            droppableId={column.id}>
            {({ innerRef, droppableProps, placeholder }) => (
              <div
                {...droppableProps}
                ref={innerRef}>
                <BoardColumnsItem
                  column={column}
                  backgroundIdentifier={backgroundIdentifier}
                />
                {placeholder}
              </div>
            )}
          </Droppable>
        ))}
        <BoardAddColumnBtn />
      </div>
    </DragDropContext>
  )
}
