import type { EditColumnData } from '../model/types'

import { useState } from 'react'
import { PencilIcon } from 'lucide-react'

import { Column } from '@/entities/column'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

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
      <DialogTrigger
        render={
          <Column.ActionButton
            className='mr-2'
            aria-label='Edit column'>
            <PencilIcon />
          </Column.ActionButton>
        }
      />
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
