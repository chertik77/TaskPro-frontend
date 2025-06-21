import type { EditBoardData } from '../model/types'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { EditBoardDialogTrigger } from './EditBoardDialogTrigger'
import { EditBoardForm } from './EditBoardForm'

type EditBoardDialogProps = {
  data: EditBoardData
}

export const EditBoardDialog = ({ data }: EditBoardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditBoardDialogTrigger />
      <DialogContent>
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
