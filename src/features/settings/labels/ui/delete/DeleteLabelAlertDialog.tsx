import { TrashIcon } from 'lucide-react'

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

import { useDeleteLabel } from '../../api/useDeleteLabel'

export const DeleteLabelAlertDialog = ({ labelId }: { labelId: string }) => {
  const { mutate: deleteLabel } = useDeleteLabel()

  const handleDeleteLabel = () => {
    deleteLabel({ path: { labelId } })
  }

  return (
    <ConfirmDeleteTrigger onConfirm={handleDeleteLabel}>
      <AlertDialog>
        <AlertDialogTrigger
          aria-label='Delete label'
          className='focus-visible:styled-outline dark:text-white-soft group
            text-black'>
          <TrashIcon
            className='group-hocus:opacity-100 size-4 opacity-50
              transition-opacity'
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete label?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The label will be permanently deleted
            and removed from all tasks that use it.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLabel}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDeleteTrigger>
  )
}
