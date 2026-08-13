import { Separator } from '@base-ui/react'

import { Settings } from '@/entities/setting'
import { useMe } from '@/entities/user'

import { EditNameDialog } from './EditNameDialog'

export const AccountSection = () => {
  const user = useMe()

  return (
    <Settings.Item
      className='dark:bg-black-muted bg-white-muted tablet:pr-8 flex flex-col
        items-start gap-4 rounded-lg px-4 py-5'>
      <div className='flex w-full items-center justify-between gap-3'>
        <div className='min-w-0 space-y-1'>
          <p className='text-md text-black/50 dark:text-white/50'>Name</p>
          <p className='truncate'>{user?.name}</p>
        </div>
        <EditNameDialog />
      </div>
      <Separator className='block h-px w-full bg-black/20 dark:bg-white/20' />
      <div className='min-w-0 space-y-1'>
        <p className='text-md text-black/50 dark:text-white/50'>Email</p>
        <p className='truncate'>{user?.email}</p>
      </div>
    </Settings.Item>
  )
}
