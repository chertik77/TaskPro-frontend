import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { AddCardDialogTrigger } from './AddCardDialogTrigger'
import { AddCardForm } from './AddCardForm'

type AddCardDialogProps = {
  columnId: string
}

export const AddCardDialog = ({ columnId }: AddCardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <AddCardDialogTrigger />
      <DialogContent>
        <DialogTitle>Add card</DialogTitle>
        <DialogDescription className='sr-only'>
          You can add a new card here by adding a title, description, priority
          and deadline.
        </DialogDescription>
        <AddCardForm
          columnId={columnId}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
