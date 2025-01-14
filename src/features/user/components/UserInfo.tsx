import * as Avatar from '@radix-ui/react-avatar'
import { useModal } from 'react-modal-state'

import { useAuthStore } from 'features/auth/auth.store'

import { EditProfileModal } from './modals'

export const UserInfo = () => {
  const { name, avatar } = useAuthStore(state => state.user)

  const { open: openEditProfileModal } = useModal(EditProfileModal)

  return (
    <button
      type='button'
      onClick={openEditProfileModal}
      className='focus-visible:styled-outline flex items-center gap-2'>
      <p>{name}</p>
      <Avatar.Root>
        <Avatar.Image
          src={avatar}
          alt={name}
          referrerPolicy='no-referrer'
          className='size-8 rounded-lg object-cover'
        />
        <Avatar.Fallback
          className='flex size-8 items-center justify-center rounded-lg bg-white-gray
            violet:bg-white-gray-secondary dark:bg-black-secondary'>
          {name.charAt(0).toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
    </button>
  )
}
