import type { Board } from 'types'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { BoardAddColumnBtn } from './BoardAddColumnBtn'
import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  backgroundIdentifier?: string
  columns: Board['columns'] | undefined
}

export const BoardColumnsList = ({
  columns,
  backgroundIdentifier
}: BoardColumnsListProps) => {
  const [parent] = useAutoAnimate({ duration: 400 })

  return (
    <div
      className='flex gap-[34px]'
      ref={parent}>
      {columns?.map(column => (
        <BoardColumnsItem
          column={column}
          key={column.id}
          backgroundIdentifier={backgroundIdentifier}
        />
      ))}
      <BoardAddColumnBtn />
    </div>
  )
}
