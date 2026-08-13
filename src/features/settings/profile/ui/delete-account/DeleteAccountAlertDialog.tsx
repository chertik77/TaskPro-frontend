import { useState } from 'react'

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

import { useDeleteAccount } from '../../api/useDeleteAccount'
import { DeleteAccountForm } from './DeleteAccountForm'

type DeleteAccountAlertDialogProps = {
  hasPassword: boolean
}

export const DeleteAccountAlertDialog = ({
  hasPassword
}: DeleteAccountAlertDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: deleteAccount, isPending } = useDeleteAccount(() =>
    setIsDialogOpen(false)
  )

  return (
    <AlertDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger
        className='focus-visible:styled-outline hocus:text-red ml-auto shrink-0
          cursor-pointer transition-colors'>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete account?</AlertDialogTitle>
        <AlertDialogDescription className='mb-6'>
          Your boards, columns, tasks and labels will be permanently deleted.
          This cannot be undone.
        </AlertDialogDescription>
        {hasPassword ? (
          <DeleteAccountForm closeDialog={() => setIsDialogOpen(false)} />
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => deleteAccount(undefined)}>
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
