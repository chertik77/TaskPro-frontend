import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { AddColumnDialogTrigger } from './AddColumnDialogTrigger'
import { AddColumnForm } from './AddColumnForm'

export const AddColumnDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <AddColumnDialogTrigger />
      <DialogContent>
        <DialogTitle>Add column</DialogTitle>
        <DialogDescription className='sr-only'>
          You can add a new column here by adding a title.
        </DialogDescription>
        <AddColumnForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
