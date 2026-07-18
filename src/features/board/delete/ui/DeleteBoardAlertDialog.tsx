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
          className='focus-visible:styled-outline dark:text-white-soft group
            text-black'>
          <TrashIcon
            className='group-hocus:opacity-100 size-4 opacity-50
              transition-opacity'
          />
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
