import type { UserTypes } from '@/entities/user'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'motion/react'

import { Settings } from '@/entities/setting'
import { sessionQueries } from '@/entities/user'

import { parseUserAgent } from '../../lib/parseUserAgent'
import { BrowserIcon } from './BrowserIcon'
import { RevokeSessionButton } from './RevokeSessionButton'
import { SessionMeta } from './SessionMeta'

type SessionsListProps = {
  sessions: UserTypes.InferedSession[] | undefined
}

export const SessionsList = ({ sessions }: SessionsListProps) => {
  const currentSessionId = useQuery({
    ...sessionQueries.current(),
    select: session => session?.session.id
  }).data

  const sortedSessions = sessions?.toSorted((a, b) => {
    const aIsCurrent = a.id === currentSessionId
    const bIsCurrent = b.id === currentSessionId

    if (aIsCurrent !== bIsCurrent) {
      return aIsCurrent ? -1 : 1
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <AnimatePresence
      initial={false}
      mode='popLayout'>
      {sortedSessions?.map(({ id, userAgent, updatedAt }) => {
        const isCurrent = id === currentSessionId
        const { browser, os } = parseUserAgent(userAgent)

        return (
          <Settings.Item
            key={id}
            className='dark:bg-black-muted bg-white-muted tablet:pr-8
              tablet:items-center flex items-center gap-3! rounded-lg px-4 py-3'>
            <BrowserIcon browser={browser} />
            <div className='space-y-1'>
              {browser && os && (
                <p className='text-base font-medium'>
                  {browser} on {os}
                </p>
              )}
              <SessionMeta
                isCurrent={isCurrent}
                updatedAt={updatedAt}
              />
            </div>
            <RevokeSessionButton
              sessionId={id}
              isCurrent={isCurrent}
            />
          </Settings.Item>
        )
      })}
    </AnimatePresence>
  )
}
