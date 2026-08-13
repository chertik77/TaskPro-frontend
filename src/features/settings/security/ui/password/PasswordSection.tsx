import { format } from 'date-fns'

import { Settings } from '@/entities/setting'

import { ChangePasswordDialog } from './ChangePasswordDialog'

type PasswordSectionProps = {
  updatedAt: Date | undefined
}

export const PasswordSection = ({ updatedAt }: PasswordSectionProps) => (
  <Settings.Item
    className='dark:bg-black-muted bg-white-muted tablet:items-center
      tablet:pr-8 flex items-center rounded-lg px-4 py-5'>
    <div className='space-y-1'>
      <p>Password set</p>
      {updatedAt && (
        <p className='text-md text-black/50 dark:text-white/50'>
          Last updated {format(updatedAt, 'd MMM yyyy')}
        </p>
      )}
    </div>
    <ChangePasswordDialog />
  </Settings.Item>
)
