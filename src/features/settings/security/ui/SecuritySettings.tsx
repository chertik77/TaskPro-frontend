import { Settings } from '@/entities/setting'

import { useGetSecuritySettings } from '../api/useGetSecuritySettings'
import { AccountList } from './account-list/AccountList'
import { AccountOAuthErrorHandler } from './account-list/AccountOAuthErrorHandler'
import { PasskeysSection } from './passkeys/PasskeysSection'
import { SessionsList } from './session-list/SessionList'

export const SecuritySettings = () => {
  const { sessions, passkeys, accounts, isPending } = useGetSecuritySettings()

  return (
    <Settings
      title='Security & Access'
      isLoading={isPending}>
      <Settings.SubTitle>Sessions</Settings.SubTitle>
      <SessionsList sessions={sessions} />
      <Settings.SubTitle className='mt-10'>Passkeys</Settings.SubTitle>
      <PasskeysSection passkeys={passkeys} />
      <Settings.SubTitle className='mt-10'>
        Connected accounts
      </Settings.SubTitle>
      <AccountList accounts={accounts} />
      <AccountOAuthErrorHandler />
    </Settings>
  )
}
