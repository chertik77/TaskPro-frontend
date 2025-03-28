import type { UserTypes } from '@/entities/user'

import * as Avatar from '@radix-ui/react-avatar'
import { useModal } from 'react-modal-state'

import { useAuthStore } from '@/entities/auth'

import { EditProfileModal } from './EditProfileModal'

export const EditProfileModalTrigger = () => {
  const { name, email, avatar } = useAuthStore(state => state.user)

  const { open: openEditProfileModal } = useModal(EditProfileModal)

  return (
    <button
      type='button'
      aria-label='Edit profile'
      onClick={() =>
        openEditProfileModal<UserTypes.EditProfileModalProps>({ name, email })
      }
      className='focus-visible:styled-outline flex items-center gap-2'>
      <p>{name}</p>
      {avatar && (
        <Avatar.Root>
          <Avatar.Image
            src={avatar}
            alt={name}
            referrerPolicy='no-referrer'
            className='size-8 rounded-lg object-cover'
          />
          <Avatar.Fallback
            className='flex size-8 items-center justify-center rounded-lg bg-white-muted
              violet:bg-white-gray dark:bg-black-soft'>
            {name.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
    </button>
  )
}
