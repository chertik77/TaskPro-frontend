import type { CardTypes } from '@/entities/card'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { useEditCardForm } from '../hooks/useEditCardForm'
import { EditCardDialogTrigger } from './EditCardDialogTrigger'
import { EditCardForm } from './EditCardForm'

type EditCardDialogProps = {
  data: CardTypes.EditCardModalSchema
}

export const EditCardDialog = ({ data }: EditCardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form } = useEditCardForm(data)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditCardDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
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
