import type { onSaveProps } from 'react-edit-text'
import type { Column } from 'types'

import { useState } from 'react'
import { EditText } from 'react-edit-text'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button, Loader } from 'components/ui'

import { useDeleteColumn, useEditColumn } from 'hooks/column'

import { selectCardPriority } from 'redux/filter.slice'

import {
  DEFAULT_COLUMN_TITLE,
  REQUIRED_COLUMN_TITLE_LENGTH
} from 'constants/titles'

import { cn } from 'lib'

type BoardColumnsActionsProps = {
  column: Column
  sortedCardsLength?: number
}

export const BoardColumnsActions = ({
  column,
  sortedCardsLength
}: BoardColumnsActionsProps) => {
  const [columnTitle, setColumnTitle] = useState(column.title)

  const cardPriority = useSelector(selectCardPriority)

  const { mutate: deleteColumn, isPending: isDeleting } = useDeleteColumn(
    column.id
  )

  const { mutate } = useEditColumn(column.id)

  const handleColumnEdit = ({ value, previousValue }: onSaveProps) => {
    if (value.trim().length < REQUIRED_COLUMN_TITLE_LENGTH) {
      setColumnTitle(previousValue.trim())
      return toast.error('Column title must be at least 3 characters long.')
    }
    mutate({ title: value })
  }

  return (
    <div
      className={cn(
        `mb-3.5 flex h-3xl min-w-8xl items-center rounded-lg bg-white px-5 py-lg
        dark:bg-black`,
        cardPriority && sortedCardsLength === 0 && 'mb-0',
        isDeleting && 'justify-center'
      )}>
      {isDeleting ? (
        <div className='flex items-center gap-2'>
          <Loader />
          Deleting...
        </div>
      ) : (
        <>
          <EditText
            onSave={handleColumnEdit}
            value={columnTitle}
            onEditMode={() => {
              if (columnTitle === DEFAULT_COLUMN_TITLE) setColumnTitle('')
            }}
            onChange={e => setColumnTitle(e.target.value)}
            className='w-[270px] hover:bg-transparent'
            inputClassName='outline-none bg-transparent'
          />
          <Button
            className='ml-auto'
            onClick={() => deleteColumn()}
            iconName='trash'
          />
        </>
      )}
    </div>
  )
}
