import type { ColumnSchemaFields } from 'lib/schemas'
import type { onSaveProps } from 'react-edit-text'
import type { Column } from 'types'

import { useState } from 'react'
import { EditText } from 'react-edit-text'
import { toast } from 'sonner'

import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { columnService } from 'services'

const REQUIRED_COLUMN_TITLE_LENGTH = 3

export const BoardColumnsActions = ({ column }: { column: Column }) => {
  const [columnTitle, setColumnTitle] = useState(column.title)

  const boardId = useGetBoardId()

  const { mutateAsync } = useAppMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: () => columnService.deleteColumn(boardId, column._id)
  })

  const { mutateAsync: mutateColumn } = useAppMutation<ColumnSchemaFields>({
    mutationKey: ['editColumn'],
    mutationFn: data => columnService.editColumn(boardId, column._id, data)
  })

  const handleColumnEdit = ({ value, previousValue }: onSaveProps) => {
    if (value.length < REQUIRED_COLUMN_TITLE_LENGTH) {
      setColumnTitle(previousValue)
      return toast.error('Column title must be at least 3 characters long.')
    }

    toast.promise(mutateColumn({ title: value }), {
      loading: 'Updating column...',
      success: 'Column updated successfully!',
      error: 'An error occurred while updating the column.'
    })
  }

  const handleColumnDelete = () => {
    toast.promise(mutateAsync(), {
      loading: 'Deleting column...',
      success: 'Column deleted successfully!',
      error: 'An error occurred while deleting the column.'
    })
  }

  return (
    <div
      className='mb-default flex h-[56px] min-w-[335px] items-center rounded-lg bg-white px-5
        py-[18px] dark:bg-black'>
      <EditText
        onSave={handleColumnEdit}
        value={columnTitle}
        onChange={e => setColumnTitle(e.target.value)}
        className='hover:bg-transparent'
        inputClassName='outline-none bg-transparent'
      />
      <Button
        className='ml-auto'
        onClick={handleColumnDelete}
        iconName='trash'
      />
    </div>
  )
}
