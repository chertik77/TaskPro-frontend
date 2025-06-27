import { DialogTrigger, Icon } from '@/shared/ui'

export const AddColumnDialogTrigger = () => (
  <DialogTrigger
    aria-label='Add column'
    className='violet:bg-white violet:text-black dark:bg-black-soft desktop:mr-6
      focus-visible:styled-outline mr-5 flex h-14 w-84 items-center justify-center
      gap-2 rounded-lg bg-white -outline-offset-2 disabled:opacity-100 dark:text-white'>
    <Icon
      name='plus'
      className='violet:bg-brand-violet size-7 rounded-md bg-black text-white dark:bg-white
        dark:text-black'
    />
    Add column
  </DialogTrigger>
)
