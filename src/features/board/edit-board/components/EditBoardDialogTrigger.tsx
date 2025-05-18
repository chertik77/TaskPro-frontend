import { DialogTrigger, Icon } from '@/shared/ui'

export const EditBoardDialogTrigger = () => (
  <DialogTrigger
    aria-label='Edit board'
    className='focus-visible:styled-outline hocus:*:stroke-black
      violet:hocus:*:stroke-white-soft dark:hocus:*:stroke-white-soft'>
    <Icon
      name='pencil'
      className='violet:stroke-white/50 dark:stroke-white-soft/50 size-4 stroke-black/50'
    />
  </DialogTrigger>
)
