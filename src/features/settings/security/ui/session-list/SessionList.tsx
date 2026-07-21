import type { UserTypes } from '@/entities/user'

import { Fragment } from 'react/jsx-runtime'
import { Separator } from '@base-ui/react'
import { formatDistanceToNowStrict } from 'date-fns'
import { AnimatePresence } from 'motion/react'

import { Settings } from '@/entities/setting'

import { BrowserIcon } from './BrowserIcon'
import { RevokeSessionButton } from './RevokeSessionButton'

type SessionsListProps = {
  sessions: UserTypes.InferedSession[] | undefined
}

export const SessionsList = ({ sessions }: SessionsListProps) => (
  <AnimatePresence
    initial={false}
    mode='popLayout'>
    {sessions?.map(({ id, browser, os, isCurrent, updatedAt }) => {
      const meta = [
        isCurrent && (
          <div
            key='current'
            className='flex items-center gap-1 text-green-500'>
            <span className='size-2 rounded-full bg-current' />
            Current session
          </div>
        ),

        !isCurrent && updatedAt && (
          <span key='last-active'>
            Last active{' '}
            {formatDistanceToNowStrict(new Date(updatedAt), {
              addSuffix: true
            })}
          </span>
        )
      ].filter(Boolean)

      return (
        <Settings.Item
          key={id}
          className='dark:bg-black-muted bg-white-muted flex items-center gap-3
            rounded-lg py-3 pr-8 pl-4'>
          <BrowserIcon browser={browser} />
          <div className='space-y-1'>
            {browser && os && (
              <p className='text-base font-medium'>
                {browser} on {os}
              </p>
            )}
            <div
              className='text-md flex items-center gap-2 text-black/50
                dark:text-white/50'>
              {meta.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <Separator className='size-1 rounded-full bg-current' />
                  )}
                  {item}
                </Fragment>
              ))}
            </div>
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
