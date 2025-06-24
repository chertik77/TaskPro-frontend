import type { ReactNode } from 'react'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { AddBoardForm } from './AddBoardForm'

type AddBoardDialogProps = {
  children: ReactNode
}

export const AddBoardDialog = ({ children }: AddBoardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      {children}
      <DialogContent>
        <DialogTitle>New board</DialogTitle>
        <DialogDescription className='sr-only'>
          You can create a new board here by adding a title, icon and
          background.
        </DialogDescription>
        <AddBoardForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
