import type { onSaveProps } from 'react-edit-text'
import type { Column, ColumnTitle } from 'types'

import { useState } from 'react'
import { EditText } from 'react-edit-text'
import { toast } from 'sonner'

import { Button } from 'components/ui'

import { useAppMutation } from 'hooks'

import {
  DEFAULT_COLUMN_TITLE,
  REQUIRED_COLUMN_TITLE_LENGTH
} from 'constants/titles'
import { columnService } from 'services'

export const BoardColumnsActions = ({ column }: { column: Column }) => {
  const [columnTitle, setColumnTitle] = useState(column.title)

  const { mutate: deleteColumn } = useAppMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: () => columnService.deleteColumn(column.id),
    toastErrorMessage:
      'Unexpected error during column deletion. We apologize for the inconvenience. Please try again later.'
  })

  const { mutate } = useAppMutation<ColumnTitle>({
    mutationKey: ['editColumn'],
    mutationFn: data => columnService.editColumn(column.id, data),
    toastErrorMessage:
      'Unexpected error during column update. We apologize for the inconvenience. Please try again later.'
  })

  const handleColumnEdit = ({ value, previousValue }: onSaveProps) => {
    if (value.length < REQUIRED_COLUMN_TITLE_LENGTH) {
      setColumnTitle(previousValue)
      return toast.error('Column title must be at least 3 characters long.')
    }
    mutate({ title: value })
  }

  return (
    <div
      className='mb-3.5 flex h-[56px] min-w-[335px] items-center rounded-lg bg-white px-5
        py-[18px] dark:bg-black'>
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
    </div>
  )
}
