import { DialogTrigger, Icon } from '@/shared/ui'

import { NeedHelpCard } from './NeedHelpCard'

export const NeedHelpDialogTrigger = () => (
  <NeedHelpCard>
    <DialogTrigger
      aria-label='Open need help modal'
      className='focus-visible:styled-outline text-md hocus:text-brand-light
        dark:text-white-soft flex items-center gap-2 font-medium
        transition-colors'>
      <Icon
        name='help'
        className='size-5'
      />
      Need help?
    </DialogTrigger>
  </NeedHelpCard>
)
