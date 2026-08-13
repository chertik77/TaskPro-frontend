import { useState } from 'react'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'

import { EditNameForm } from './EditNameForm'

export const EditNameDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className='focus-visible:styled-outline hocus:text-accent shrink-0
          cursor-pointer transition-colors'>
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit name</DialogTitle>
        <EditNameForm closeDialog={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
