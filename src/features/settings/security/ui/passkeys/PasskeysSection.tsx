import type { Passkey } from '@better-auth/passkey/client'

import { Fragment } from 'react'
import { Separator } from '@base-ui/react'
import { KeyRoundIcon } from 'lucide-react'

import { Settings } from '@/entities/setting'

import { pluralize } from '@/shared/lib'

import { AddPasskeyButton } from './AddPasskeyButton'
import { AddPasskeyNameDialog } from './AddPasskeyNameDialog'
import { DeletePasskeyAlertDialog } from './DeletePasskeyAlertDialog'
import { EditPasskeyNameDialog } from './EditPasskeyNameDialog'

type PasskeysSectionProps = {
  passkeys: Passkey[] | undefined
}

export const PasskeysSection = ({ passkeys }: PasskeysSectionProps) => (
  <Settings.Item
    className='dark:bg-black-muted bg-white-muted flex flex-col rounded-lg py-5
      pr-8 pl-4'>
    <div className='flex w-full items-center gap-3'>
      <p>
        {!passkeys?.length
          ? 'No passkeys registered'
          : pluralize(passkeys.length, 'passkey')}
      </p>
      <AddPasskeyButton />
    </div>
    {!!passkeys?.length && (
      <Separator className='my-1 block h-px w-full bg-black/20 dark:bg-white/20' />
    )}
    {passkeys?.map(passkey => (
      <Fragment key={passkey.id}>
        <div className='flex w-full items-center'>
          <KeyRoundIcon className='mr-2 size-5 opacity-50' />
          <p>{passkey.name}</p>
          <div className='ml-auto space-x-3'>
            <EditPasskeyNameDialog
              passkeyId={passkey.id}
              name={passkey.name!}
            />
            <DeletePasskeyAlertDialog passkeyId={passkey.id} />
          </div>
        </div>
        <AddPasskeyNameDialog passkeyId={passkey.id} />
      </Fragment>
    ))}
  </Settings.Item>
)
