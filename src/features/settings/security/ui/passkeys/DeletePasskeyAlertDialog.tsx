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

import { useDeletePasskey } from '../../api/useDeletePasskey'

type DeleteBoardAlertDialogProps = {
  passkeyId: string
}

export const DeletePasskeyAlertDialog = ({
  passkeyId
}: DeleteBoardAlertDialogProps) => {
  const { mutate: deletePasskey } = useDeletePasskey()

  const handleDeletePasskey = () => {
    deletePasskey({ id: passkeyId })
  }

  return (
    <ConfirmDeleteTrigger onConfirm={handleDeletePasskey}>
      <AlertDialog>
        <AlertDialogTrigger
          aria-label='Remove passkey'
          className='focus-visible:styled-outline dark:text-white-soft group
            text-black'>
          <TrashIcon
            className='group-hocus:opacity-100 size-4 opacity-50
              transition-opacity'
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Remove passkey?</AlertDialogTitle>
          <AlertDialogDescription>
            This passkey will no longer be available for signing in to your
            account. You can add it again at any time.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePasskey}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDeleteTrigger>
  )
}
