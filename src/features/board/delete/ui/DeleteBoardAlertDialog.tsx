import { TrashIcon } from 'lucide-react'

import { ConfirmDeleteTrigger } from '@/entities/setting/ui/ConfirmDeleteTrigger'

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

import { useDeleteBoard } from '../api/useDeleteBoard'

export const DeleteBoardAlertDialog = () => {
  const { mutate: deleteBoard } = useDeleteBoard()

  const handleDeleteBoard = () => {
    deleteBoard()
  }

  return (
    <ConfirmDeleteTrigger onConfirm={handleDeleteBoard}>
      <AlertDialog>
        <AlertDialogTrigger
          aria-label='Delete board'
          className='focus-visible:styled-outline hocus:text-black
            dark:hocus:text-white-soft dark:text-white-soft/50 text-black/50'>
          <TrashIcon className='size-4' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete board?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The board and all of its contents will
            be permanently deleted.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBoard}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDeleteTrigger>
  )
}
