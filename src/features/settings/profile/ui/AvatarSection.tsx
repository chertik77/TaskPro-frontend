import { CameraIcon } from 'lucide-react'

import { Settings, useSettings } from '@/entities/setting'
import { defaultAvatarUrl, useMe } from '@/entities/user'

import { resolveTheme } from '@/shared/config'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'

import { DeleteAvatarAlertDialog } from './delete/DeleteAvatarAlertDialog'
import { EditAvatarDialog } from './edit/EditAvatarDialog'

export const AvatarSection = () => {
  const user = useMe()

  const { data: theme } = useSettings(state => state.general.theme)

  const name = user?.name ?? 'Guest'

  return (
    <Settings.Item
      className='dark:bg-black-muted bg-white-muted tablet:items-center
        tablet:pr-8 flex items-center justify-between rounded-lg px-4 py-4'>
      <EditAvatarDialog>
        <Avatar className='size-15 rounded-xl bg-white dark:bg-black'>
          <AvatarImage
            src={user?.image || defaultAvatarUrl[resolveTheme(theme)]}
            alt='Avatar'
          />
          <AvatarFallback className='text-xl'>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span
          className='bg-accent ring-white-muted dark:ring-black-muted
            group-hocus:scale-110 absolute -right-1.5 -bottom-1.5 grid size-7
            place-items-center rounded-full text-black ring-4
            transition-transform'>
          <CameraIcon className='size-3.5' />
        </span>
      </EditAvatarDialog>
      <DeleteAvatarAlertDialog isDisabled={!user?.image} />
    </Settings.Item>
  )
}
