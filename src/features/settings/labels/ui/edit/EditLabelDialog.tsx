import type { Label } from '@/shared/api'

import { useState } from 'react'
import { PencilIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

import { EditLabelForm } from './EditLabelForm'

type EditLabelDialogProps = {
  formData: Pick<Label, 'id' | 'name' | 'color' | 'description'>
}

export const EditLabelDialog = ({ formData }: EditLabelDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        aria-label='Edit label'
        className='focus-visible:styled-outline dark:text-white-soft
          hocus:[&_svg]:opacity-100 text-black [&_svg]:size-4 [&_svg]:opacity-50
          [&_svg]:transition-opacity'>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Label</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a label here by changing its name and color.
        </DialogDescription>
        <EditLabelForm
          formData={formData}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
