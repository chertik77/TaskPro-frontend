import { Settings } from '@/entities/setting'

import { useGetSecuritySettings } from '../api/useGetSecuritySettings'
import { PasskeysSection } from './passkeys/PasskeysSection'
import { SessionsList } from './session-list/SessionList'

export const SecuritySettings = () => {
  const { sessions, passkeys, isPending } = useGetSecuritySettings()

  return (
    <Settings
      title='Security & Access'
      isLoading={isPending}>
      <Settings.SubTitle>Sessions</Settings.SubTitle>
      <SessionsList sessions={sessions} />
      <Settings.SubTitle className='mt-10'>Passkeys</Settings.SubTitle>
      <PasskeysSection passkeys={passkeys} />
    </Settings>
  )
}
