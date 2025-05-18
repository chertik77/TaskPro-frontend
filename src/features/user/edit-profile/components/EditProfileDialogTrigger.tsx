import * as Avatar from '@radix-ui/react-avatar'

import { useAuthStore } from '@/shared/store'
import { DialogTrigger } from '@/shared/ui'

export const EditProfileDialogTrigger = () => {
  const { name, avatar } = useAuthStore(state => state.user)

  return (
    <DialogTrigger
      type='button'
      aria-label='Edit profile'
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
            className='bg-white-muted violet:bg-white-gray dark:bg-black-soft flex size-8 items-center
              justify-center rounded-lg'>
            {name.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
    </DialogTrigger>
  )
}
