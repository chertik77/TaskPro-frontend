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

import { useDeleteAvatar } from '../../api/useDeleteAvatar'

type DeleteAvatarAlertDialogProps = {
  isDisabled?: boolean
}

export const DeleteAvatarAlertDialog = ({
  isDisabled
}: DeleteAvatarAlertDialogProps) => {
  const { mutate: deleteAvatar } = useDeleteAvatar()

  const handleDeleteAvatar = () => {
    deleteAvatar({})
  }

  return (
    <ConfirmDeleteTrigger
      onConfirm={handleDeleteAvatar}
      isDisabled={isDisabled}>
      <AlertDialog>
        <AlertDialogTrigger
          disabled={isDisabled}
          className='focus-visible:styled-outline enabled:hocus:text-accent flex
            cursor-pointer items-center gap-2 transition-colors
            disabled:cursor-not-allowed disabled:opacity-50'>
          Remove
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Remove avatar?</AlertDialogTitle>
          <AlertDialogDescription>
            Your profile will fall back to the default avatar. You can upload a
            new one at any time.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAvatar}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDeleteTrigger>
  )
}
