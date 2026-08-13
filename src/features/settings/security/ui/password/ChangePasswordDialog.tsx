import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

import { ChangePasswordForm } from './ChangePasswordForm'

export const ChangePasswordDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className='focus-visible:styled-outline hocus:text-accent ml-auto
          cursor-pointer transition-colors'>
        Change
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Change password</DialogTitle>
        <DialogDescription className='mb-6'>
          You’ll stay signed in on this device. Every other device will be
          signed out.
        </DialogDescription>
        <ChangePasswordForm closeDialog={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
