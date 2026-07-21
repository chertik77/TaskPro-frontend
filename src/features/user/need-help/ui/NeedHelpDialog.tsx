import { useState } from 'react'
import { CircleQuestionMarkIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

import { NeedHelpCard } from './NeedHelpCard'
import { NeedHelpForm } from './NeedHelpForm'

export const NeedHelpDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <NeedHelpCard>
        <DialogTrigger
          aria-label='Open need help modal'
          className='focus-visible:styled-outline text-md hocus:text-accent
            dark:text-white-soft flex items-center gap-2 font-medium
            transition-colors'>
          <CircleQuestionMarkIcon className='size-4' />
          Need help?
        </DialogTrigger>
      </NeedHelpCard>
      <DialogContent className='max-tablet:w-84'>
        <DialogTitle>Need help</DialogTitle>
        <DialogDescription className='sr-only'>
          You can contact us here by sending us an email.
        </DialogDescription>
        <NeedHelpForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
