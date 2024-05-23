import type { onSaveProps } from 'react-edit-text'
import type { Column, ColumnTitle } from 'types'

import { useState } from 'react'
import { EditText } from 'react-edit-text'
import { Tooltip } from 'react-tooltip'
import { toast } from 'sonner'

import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import {
  DEFAULT_COLUMN_TITLE,
  REQUIRED_COLUMN_TITLE_LENGTH
} from 'constants/titles'
import { columnService } from 'services'

export const BoardColumnsActions = ({ column }: { column: Column }) => {
  const [columnTitle, setColumnTitle] = useState(column.title)

  const boardId = useGetBoardId()

  const { mutateAsync } = useAppMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: () => columnService.deleteColumn(boardId, column._id)
  })

  const { mutateAsync: mutateColumn } = useAppMutation<ColumnTitle>({
    mutationKey: ['editColumn'],
    mutationFn: data => columnService.editColumn(boardId, column._id, data)
  })

  const handleColumnEdit = ({ value, previousValue }: onSaveProps) => {
    if (value.length < REQUIRED_COLUMN_TITLE_LENGTH) {
      setColumnTitle(previousValue)
      return toast.error('Column title must be at least 3 characters long.')
    }

    toast.promise(mutateColumn({ title: value }), {
      loading: 'Updating the column...',
      success: 'Changes to the column have been saved successfully.',
      error:
        'Unexpected error during column update. We apologize for the inconvenience. Please try again later.'
    })
  }

  const handleColumnDelete = () => {
    toast.promise(mutateAsync(), {
      loading: 'Deleting the column...',
      success: 'The column has been successfully deleted from the board.',
      error:
        'Unexpected error during column deletion. We apologize for the inconvenience. Please try again later.'
    })
  }

  return (
    <div
      className='mb-default flex h-[56px] min-w-[335px] items-center rounded-lg bg-white px-5
        py-[18px] dark:bg-black'>
      <EditText
        onSave={handleColumnEdit}
        value={columnTitle}
        onEditMode={() => {
          if (columnTitle === DEFAULT_COLUMN_TITLE) setColumnTitle('')
        }}
        onChange={e => setColumnTitle(e.target.value)}
        className='hover:bg-transparent'
        inputClassName='outline-none bg-transparent'
      />
      <Button
        className='ml-auto'
        onClick={handleColumnDelete}
        iconName='trash'
        data-tooltip-id='delete-column-tooltip'
        data-tooltip-content='Delete column'
      />
      <Tooltip
        id='delete-column-tooltip'
        delayShow={500}
      />
    </div>
  )
}
