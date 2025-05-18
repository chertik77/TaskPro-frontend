import type { BoardTypes } from '@/entities/board'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { useEditBoardForm } from '../hooks/useEditBoardForm'
import { EditBoardDialogTrigger } from './EditBoardDialogTrigger'
import { EditBoardForm } from './EditBoardForm'

type EditBoardDialogProps = {
  data: BoardTypes.EditBoardModalSchema
}

export const EditBoardDialog = ({ data }: EditBoardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form } = useEditBoardForm(data)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditBoardDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogTitle>Edit board</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a board here by changing its title, icon and background.
        </DialogDescription>
        <EditBoardForm
          data={data}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
