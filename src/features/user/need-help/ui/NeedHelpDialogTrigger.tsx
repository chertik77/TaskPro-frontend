import { DialogTrigger, Icon } from '@/shared/ui'

import { NeedHelpCard } from './NeedHelpCard'

export const NeedHelpDialogTrigger = () => (
  <NeedHelpCard>
    <DialogTrigger
      aria-label='Open need help modal'
      className='focus-visible:styled-outline text-md violet:text-white hocus:text-brand-light
        violet:hocus:text-brand-violet dark:text-white-soft dark:hocus:text-brand-light
        flex size-max items-center gap-2 bg-transparent font-medium transition-all'>
      <Icon
        name='help'
        className='size-5'
      />
      Need help?
    </DialogTrigger>
  </NeedHelpCard>
)
