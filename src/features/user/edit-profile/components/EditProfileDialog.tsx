import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { EditAvatar } from './EditAvatar'
import { EditProfileDialogTrigger } from './EditProfileDialogTrigger'
import { EditProfileForm } from './EditProfileForm'

export const EditProfileDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditProfileDialogTrigger />
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription className='sr-only'>
          You can update your profile information here and change your avatar.
        </DialogDescription>
        <EditAvatar setIsDialogOpen={setIsDialogOpen} />
        <EditProfileForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
