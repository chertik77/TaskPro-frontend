import type { Passkey } from '@better-auth/passkey/client'

import { Separator } from '@base-ui/react'
import { KeyRoundIcon } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { Settings } from '@/entities/setting'

import { pluralize } from '@/shared/lib'

import { AddPasskeyButton } from './AddPasskeyButton'
import { AddPasskeyNameDialog } from './AddPasskeyNameDialog'
import { DeletePasskeyAlertDialog } from './DeletePasskeyAlertDialog'
import { EditPasskeyNameDialog } from './EditPasskeyNameDialog'

type PasskeysSectionProps = {
  passkeys: Passkey[] | undefined
}

export const PasskeysSection = ({ passkeys }: PasskeysSectionProps) => {
  const hasPasskeys = !!passkeys?.length

  return (
    <Settings.Item
      className='dark:bg-black-muted bg-white-muted flex flex-col rounded-lg
        py-5 pr-8 pl-4'>
      <m.div
        layout
        className='flex w-full items-center gap-3'>
        <p>
          {!hasPasskeys
            ? 'No passkeys registered'
            : pluralize(passkeys!.length, 'passkey')}
        </p>
        <AddPasskeyButton />
      </m.div>
      {hasPasskeys && (
        <>
          <Separator
            className='my-1 block h-px w-full bg-black/20 dark:bg-white/20'
          />
          <AnimatePresence
            initial={false}
            mode='popLayout'>
            {passkeys!.map(passkey => (
              <m.div
                key={passkey.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className='flex w-full items-center'>
                <KeyRoundIcon className='mr-2 size-5 opacity-50' />
                <p>{passkey.name}</p>
                <div className='ml-auto flex items-center gap-3'>
                  <EditPasskeyNameDialog
                    passkeyId={passkey.id}
                    name={passkey.name!}
                  />
                  <DeletePasskeyAlertDialog passkeyId={passkey.id} />
                </div>
                <AddPasskeyNameDialog
                  passkeyId={passkey.id}
                  passkeyAaguid={passkey.aaguid}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </Settings.Item>
  )
}
