import type { onSaveProps } from 'react-edit-text'
import type { Column } from '../column.types'

import { useState } from 'react'
import { EditText } from 'react-edit-text'
import { toast } from 'sonner'

import { useDeleteColumn, useEditColumn } from 'features/kanban/column/hooks'

import { Button } from 'components/ui'

import { cn } from 'lib'

import {
  DEFAULT_COLUMN_TITLE,
  REQUIRED_COLUMN_TITLE_LENGTH
} from '../column.constants'

export const BoardColumnsActions = ({ column }: { column: Column }) => {
  const [columnTitle, setColumnTitle] = useState(column.title)

  const { mutate: deleteColumn } = useDeleteColumn()

  const { mutate: editColumn } = useEditColumn()

  const handleColumnEdit = ({ value, previousValue }: onSaveProps) => {
    if (value.trim().length < REQUIRED_COLUMN_TITLE_LENGTH) {
      setColumnTitle(previousValue.trim())

      return toast.error('Column title must be at least 3 characters long.')
    }
    editColumn({ columnId: column.id, data: { title: value } })
  }

  return (
    <div
      className={cn(
        `mb-3.5 flex h-3xl min-w-8xl items-center justify-center rounded-lg bg-white px-5
        py-lg dark:bg-black`
      )}>
      <EditText
        onSave={handleColumnEdit}
        value={columnTitle}
        onEditMode={() => {
          if (columnTitle === DEFAULT_COLUMN_TITLE) setColumnTitle('')
        }}
        onChange={e => setColumnTitle(e.target.value)}
        className='w-[250px] hover:bg-transparent'
        inputClassName='outline-none bg-transparent'
      />
      <Button
        className='ml-auto'
        onClick={() => deleteColumn(column.id)}
        iconName='trash'
      />
    </div>
  )
}
