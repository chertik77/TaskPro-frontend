import { useQuery } from '@tanstack/react-query'

import { Settings } from '@/entities/setting'
import { sessionQueries } from '@/entities/user'

import { DeleteAccountAlertDialog } from './DeleteAccountAlertDialog'

export const DeleteAccountSection = () => {
  const { data: accounts } = useQuery(sessionQueries.account())

  const hasPassword = !!accounts?.some(
    account => account.providerId === 'credential'
  )

  return (
    <Settings.Item
      className='dark:bg-black-muted bg-white-muted tablet:items-center
        tablet:pr-8 flex items-center rounded-lg px-4 py-5'>
      <div className='space-y-1'>
        <p>Delete account</p>
        <p className='text-md text-black/50 dark:text-white/50'>
          Permanently deletes your account and all your data.
        </p>
      </div>
      <DeleteAccountAlertDialog hasPassword={hasPassword} />
    </Settings.Item>
  )
}
