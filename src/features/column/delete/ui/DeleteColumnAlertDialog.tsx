import { TrashIcon } from 'lucide-react'

import { Column } from '@/entities/column'
import { ConfirmDeleteTrigger } from '@/entities/setting'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/ui'

import { useDeleteColumn } from '../api/useDeleteColumn'

export const DeleteColumnAlertDialog = ({ columnId }: { columnId: string }) => {
  const { mutate: deleteColumn } = useDeleteColumn()

  const handleDeleteColumn = () => {
    deleteColumn({ path: { columnId } })
  }

  return (
    <ConfirmDeleteTrigger onConfirm={handleDeleteColumn}>
      <AlertDialog>
        <AlertDialogTrigger
          render={<Column.ActionButton />}
          aria-label='Delete column'>
          <TrashIcon />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete column?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The column and all of its contents
            will be permanently deleted.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteColumn}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDeleteTrigger>
  )
}
