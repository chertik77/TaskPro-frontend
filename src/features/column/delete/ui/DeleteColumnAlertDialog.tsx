import { Column } from '@/entities/column'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  Icon
} from '@/shared/ui'

import { useDeleteColumn } from '../api/useDeleteColumn'

export const DeleteColumnAlertDialog = ({ columnId }: { columnId: string }) => {
  const { mutate: deleteColumn } = useDeleteColumn()

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Column.ActionButton />}
        aria-label='Delete column'>
        <Icon name='trash' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete column?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. The column and all of its contents will
          be permanently deleted.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteColumn({ columnId })}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
