import type { EditColumnData } from '../model/types'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { EditColumnDialogTrigger } from './EditColumnDialogTrigger'
import { EditColumnForm } from './EditColumnForm'

type EditColumnDialogProps = {
  data: EditColumnData
}

export const EditColumnDialog = ({ data }: EditColumnDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditColumnDialogTrigger />
      <DialogContent>
        <DialogTitle>Edit column</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a column here by changing its title.
        </DialogDescription>
        <EditColumnForm
          data={data}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
