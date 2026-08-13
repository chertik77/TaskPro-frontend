import type { ReactNode } from 'react'

import { Separator } from '@base-ui/react'
import { CameraIcon, LockIcon } from 'lucide-react'

import { Settings, useSettings } from '@/entities/setting'
import { defaultAvatarUrl, useMe } from '@/entities/user'

import { resolveTheme } from '@/shared/config'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'

import { DeleteAvatarAlertDialog } from './delete/DeleteAvatarAlertDialog'
import { EditAvatarDialog } from './edit/EditAvatarDialog'
import { EditNameDialog } from './EditNameDialog'

type ProfileRowProps = {
  label: string
  value: ReactNode
  children: ReactNode
}

const ProfileRow = ({ label, value, children }: ProfileRowProps) => (
  <div className='tablet:gap-5 tablet:px-5 flex items-center gap-4 px-4 py-4'>
    <div className='min-w-0 flex-1 space-y-1'>
      <p className='text-md text-black/50 dark:text-white/50'>{label}</p>
      <p className='truncate'>{value}</p>
    </div>
    {children}
  </div>
)

const RowSeparator = () => (
  <Separator className='block h-px w-full bg-black/10 dark:bg-white/10' />
)

export const ProfileCard = () => {
  const user = useMe()

  const { data: theme } = useSettings(state => state.general.theme)

  const name = user?.name ?? 'Guest'

  return (
    <Settings.Item
      className='dark:bg-black-muted bg-white-muted tablet:items-stretch
        tablet:justify-start tablet:gap-0 flex flex-col items-stretch
        justify-start gap-0 rounded-lg p-0'>
      <div
        className='tablet:gap-5 tablet:px-5 flex items-center justify-between
          gap-4 px-4 py-4'>
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
      </div>
      <RowSeparator />
      <ProfileRow
        label='Name'
        value={user?.name}>
        <EditNameDialog />
      </ProfileRow>
      <RowSeparator />
      <ProfileRow
        label='Email'
        value={user?.email}>
        <span
          className='text-md flex shrink-0 items-center gap-1.5 rounded-md
            bg-black/5 px-2 py-1 text-black/50 dark:bg-white/5
            dark:text-white/50'>
          <LockIcon className='size-3' />
          Read-only
        </span>
      </ProfileRow>
    </Settings.Item>
  )
}
