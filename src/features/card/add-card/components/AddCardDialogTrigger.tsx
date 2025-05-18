import { DialogTrigger, PlusButtonWithLoader } from '@/shared/ui'

export const AddCardDialogTrigger = () => (
  <DialogTrigger asChild>
    <PlusButtonWithLoader
      aria-label='Add card'
      className='mt-3.5'>
      Add card
    </PlusButtonWithLoader>
  </DialogTrigger>
)
