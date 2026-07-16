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
        className='focus-visible:styled-outline hocus:text-black
          dark:hocus:text-white-soft dark:text-white-soft/50 text-black/50'>
        <PencilIcon className='size-4' />
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
