import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '@/shared/ui'

import { usePasskeyDialogStore } from '../../model/passkey-dialog.store'
import { AddPasskeyNameForm } from './AddPasskeyNameForm'

type AddPasskeyNameDialogProps = {
  passkeyId: string
  passkeyAaguid: string | null | undefined
}

export const AddPasskeyNameDialog = ({
  passkeyId,
  passkeyAaguid
}: AddPasskeyNameDialogProps) => {
  const { isOpen, setIsOpen } = usePasskeyDialogStore()

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
          passkeyAaguid={passkeyAaguid}
          closeDialog={() => setIsOpen(false)}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
