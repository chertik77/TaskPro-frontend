import { useRef, useState } from 'react'

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

  const initialFocusRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditProfileDialogTrigger />
      <DialogContent initialFocus={initialFocusRef}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription className='sr-only'>
          You can update your profile information here and change your avatar.
        </DialogDescription>
        <EditAvatar />
        <EditProfileForm
          setIsDialogOpen={setIsDialogOpen}
          initialFocusRef={initialFocusRef}
        />
      </DialogContent>
    </Dialog>
  )
}
