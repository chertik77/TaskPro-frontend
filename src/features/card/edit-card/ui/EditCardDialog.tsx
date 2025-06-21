import type { EditCardData } from '../model/types'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { EditCardDialogTrigger } from './EditCardDialogTrigger'
import { EditCardForm } from './EditCardForm'

type EditCardDialogProps = {
  data: EditCardData
}

export const EditCardDialog = ({ data }: EditCardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditCardDialogTrigger />
      <DialogContent>
        <DialogTitle>Edit card</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a card here by changing its title, description, priority
          and deadline.
        </DialogDescription>
        <EditCardForm
          data={data}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
