import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '@/shared/ui'

import { usePasskeyDialogStore } from '../../model/passkey-dialog.store'
import { AddPasskeyNameForm } from './AddPasskeyNameForm'

export const AddPasskeyNameDialog = () => {
  const { isOpen, setIsOpen, passkeyId } = usePasskeyDialogStore()

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogTitle>New passkey added</AlertDialogTitle>
        <AlertDialogDescription className='mb-6'>
          Give this passkey a name so you can easily recognize it when managing
          your security settings.
        </AlertDialogDescription>
        <AddPasskeyNameForm
          passkeyId={passkeyId}
          closeDialog={() => setIsOpen(false)}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
