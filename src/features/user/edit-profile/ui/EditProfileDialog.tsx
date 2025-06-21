import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { useEditProfile } from '../api/useEditProfile'
import { EditAvatar } from './EditAvatar'
import { EditProfileDialogTrigger } from './EditProfileDialogTrigger'
import { EditProfileForm } from './EditProfileForm'

export const EditProfileDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: editProfile, isPending } = useEditProfile(setIsDialogOpen)

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
        <EditAvatar
          changeUserAvatar={editProfile}
          isPending={isPending}
        />
        <EditProfileForm
          editProfile={editProfile}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
