import { useSettings } from '@/entities/setting'
import { defaultAvatarUrl, useMe } from '@/entities/user'

import { resolveTheme } from '@/shared/config'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'

export const UserInfo = () => {
  const user = useMe()

  const { data: theme } = useSettings(state => state.general.theme)

  const name = user?.name ?? 'Guest'

  return (
    <div className='flex items-center gap-2'>
      <p>{name}</p>
      <Avatar>
        <AvatarImage
          src={user?.image || defaultAvatarUrl[resolveTheme(theme)]}
          alt={name}
        />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  )
}
