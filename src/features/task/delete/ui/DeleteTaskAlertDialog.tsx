import { TrashIcon } from 'lucide-react'

import { Task } from '@/entities/task'

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

import { useDeleteTask } from '../api/useDeleteTask'

export const DeleteColumnAlertDialog = ({ taskId }: { taskId: string }) => {
  const { mutate: deleteTask } = useDeleteTask()

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Task.ActionButton />}
        aria-label='Delete task'>
        <TrashIcon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete task?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This task and all of its associated data
          will be permanently deleted.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTask({ path: { taskId } })}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
