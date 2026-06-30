import { defaultAvatarUrl, useMe } from '@/entities/user'

import { resolveTheme } from '@/shared/config'
import { Avatar, AvatarFallback, AvatarImage, DialogTrigger } from '@/shared/ui'

export const EditProfileDialogTrigger = () => {
  const user = useMe()

  const name = user?.name ?? 'Guest'

  console.log(user)

  return (
    <DialogTrigger
      type='button'
      aria-label='Edit profile'
      className='focus-visible:styled-outline flex items-center gap-2'>
      <p>{name}</p>
      <Avatar>
        <AvatarImage
          src={user?.image || defaultAvatarUrl[resolveTheme(user?.theme)]}
          alt={name}
        />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </DialogTrigger>
  )
}
