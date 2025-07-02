import { useSessionStore } from '@/entities/session'

import { Avatar, AvatarFallback, AvatarImage, DialogTrigger } from '@/shared/ui'

export const EditProfileDialogTrigger = () => {
  const {
    user: { name, avatar }
  } = useSessionStore()

  return (
    <DialogTrigger
      type='button'
      aria-label='Edit profile'
      className='focus-visible:styled-outline flex items-center gap-2'>
      <p>{name}</p>
      <Avatar>
        <AvatarImage
          src={avatar}
          alt={name}
        />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </DialogTrigger>
  )
}
