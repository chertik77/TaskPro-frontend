import { Settings } from '@/entities/setting'

import { useGetSessions } from '../api/useGetSecuritySettings'
import { SessionsList } from './session-list/SessionList'

export const SecuritySettings = () => {
  const { data: sessions, isPending } = useGetSessions()

  return (
    <Settings
      title='Security & Access'
      isLoading={isPending}>
      <Settings.SubTitle>Sessions</Settings.SubTitle>
      <SessionsList sessions={sessions} />
      <Settings.SubTitle className='mt-10'>Passkeys</Settings.SubTitle>
      <Settings.Item
        className='dark:bg-black-muted bg-white-muted flex items-center gap-3
          rounded-lg py-3 pr-8 pl-4'>
        <div>hkhbbhjhbj</div>
      </Settings.Item>
    </Settings>
  )
}
