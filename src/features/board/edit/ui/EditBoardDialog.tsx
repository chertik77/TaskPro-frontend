import type { EditBoardData } from '../model/types'

import { useState } from 'react'
import { PencilIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

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
      <DialogTrigger
        aria-label='Edit board'
        className='focus-visible:styled-outline dark:text-white-soft group
          text-black'>
        <PencilIcon
          className='group-hocus:opacity-100 size-4 opacity-50
            transition-opacity'
        />
      </DialogTrigger>
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
