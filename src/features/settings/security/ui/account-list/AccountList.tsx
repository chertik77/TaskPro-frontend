import type { Account } from 'better-auth'

import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { Settings } from '@/entities/setting'

import { ACCOUNT_DATA } from '../../config/account-data'
import { AccountConnectionButton } from './AccountConnectionButton'

type AccountListProps = {
  accounts: Account[] | undefined
}

export const AccountList = ({ accounts }: AccountListProps) =>
  ACCOUNT_DATA.map(({ id, icon: Icon, label }) => {
    const isConnected = !!accounts?.some(account => account.providerId === id)

    return (
      <Settings.Item
        key={id}
        className='dark:bg-black-muted bg-white-muted flex items-center gap-3
          rounded-lg py-3 pr-8 pl-4'>
        <div className='flex w-full items-center gap-3'>
          <Icon className='size-5' />
          <div className='space-y-1'>
            <p>{label}</p>
            <AnimatePresence initial={false}>
              {isConnected && (
                <m.div
                  key='connected'
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className='text-md flex items-center gap-1 text-black/50
                    dark:text-white/50'>
                  <span className='size-2 rounded-full bg-green-500' />
                  Connected
                </m.div>
              )}
            </AnimatePresence>
          </div>
          <AccountConnectionButton
            isConnected={isConnected}
            providerId={id}
          />
        </div>
      </Settings.Item>
    )
  })
