import type { ColumnTypes } from '@/entities/column'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { useEditColumnForm } from '../hooks/useEditColumnForm'
import { EditColumnDialogTrigger } from './EditColumnDialogTrigger'
import { EditColumnForm } from './EditColumnForm'

type EditColumnDialogProps = {
  data: ColumnTypes.EditColumnModalSchema
}

export const EditColumnDialog = ({ data }: EditColumnDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form } = useEditColumnForm(data)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditColumnDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
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
