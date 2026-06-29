import { DialogTrigger, Icon } from '@/shared/ui'

export const EditBoardDialogTrigger = () => (
  <DialogTrigger
    aria-label='Edit board'
    className='focus-visible:styled-outline hocus:text-black
      dark:hocus:text-white-soft dark:text-white-soft/50 text-black/50'>
    <Icon
      name='pencil'
      className='size-4'
    />
  </DialogTrigger>
)
