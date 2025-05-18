import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { NeedHelpDialogTrigger } from './NeedHelpDialogTrigger'
import { NeedHelpForm } from './NeedHelpForm'

export const NeedHelpDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <NeedHelpDialogTrigger />
      <DialogContent className='max-tablet:w-84'>
        <DialogTitle>Need help</DialogTitle>
        <DialogDescription className='sr-only'>
          You can contact us here by sending us an email.
        </DialogDescription>
        <NeedHelpForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
