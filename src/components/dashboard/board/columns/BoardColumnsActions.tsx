import type { onSaveProps } from 'react-edit-text'
import type { Column } from 'types/board.types'

import { EditText } from 'react-edit-text'
import { toast } from 'sonner'

import { Button } from 'components/ui/Button'

import { useDeleteColumn } from 'hooks/column/useDeleteColumn'
import { useEditColumn } from 'hooks/column/useEditColumn'

import 'react-edit-text/dist/index.css'

export const BoardColumnsActions = ({ column }: { column: Column }) => {
  const { mutateAsync } = useDeleteColumn(column._id)

  const { mutateAsync: mutateColumn } = useEditColumn(column._id)

  const handleColumnEdit = ({ value }: onSaveProps) => {
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
        defaultValue={column.title}
        className='rounded-lg'
        inputClassName='outline-none bg-transparent w-40'
      />
      <Button
        className='ml-auto'
        onClick={handleColumnDelete}
        iconName='trash'
      />
    </div>
  )
}
