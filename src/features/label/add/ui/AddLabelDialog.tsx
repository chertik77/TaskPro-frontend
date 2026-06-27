import { useLabelModalStore } from '@/entities/label'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { AddLabelForm } from './AddLabelForm'

export const AddLabelDialog = () => {
  const { modal, setModal } = useLabelModalStore()

  return (
    <Dialog
      open={modal.isOpen}
      onOpenChange={() => setModal({ isOpen: false })}>
      <DialogContent>
        <DialogTitle>Add Label</DialogTitle>
        <DialogDescription className='sr-only'>
          You can add a new label here by adding a name and color.
        </DialogDescription>
        <AddLabelForm name={modal.props?.name as string} />
      </DialogContent>
    </Dialog>
  )
}
