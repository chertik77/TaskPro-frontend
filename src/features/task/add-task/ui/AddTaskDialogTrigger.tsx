import { DialogTrigger, PlusButtonWithLoader } from '@/shared/ui'

export const AddTaskDialogTrigger = () => (
  <DialogTrigger asChild>
    <PlusButtonWithLoader
      aria-label='Add task'
      className='mt-3.5'>
      Add task
    </PlusButtonWithLoader>
  </DialogTrigger>
)
