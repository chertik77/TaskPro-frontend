import { useState } from 'react'
import { PencilIcon } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'

import { EditPasskeyNameForm } from './EditPasskeyNameForm'

type EditPasskeyNameDialogProps = {
  passkeyId: string
  name: string
}

export const EditPasskeyNameDialog = ({
  passkeyId,
  name
}: EditPasskeyNameDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        aria-label='Edit passkey'
        className='focus-visible:styled-outline dark:text-white-soft
          hocus:[&_svg]:opacity-100 text-black [&_svg]:size-4 [&_svg]:opacity-50
          [&_svg]:transition-opacity'>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit passkey</DialogTitle>
        <EditPasskeyNameForm
          passkeyId={passkeyId}
          name={name}
          closeDialog={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
