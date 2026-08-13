import { PlusIcon } from 'lucide-react'

import { useLabelModalStore } from '@/entities/label'

import { Button } from '@/shared/ui'

export const AddLabelDialogButton = () => {
  const { setModal } = useLabelModalStore()

  return (
    <Button
      className='h-10 w-45 gap-2'
      onClick={() => setModal({ isOpen: true })}>
      <span
        className='grid size-7 place-items-center rounded-md bg-black
          text-white'>
        <PlusIcon className='size-4' />
      </span>
      Add label
    </Button>
  )
}
