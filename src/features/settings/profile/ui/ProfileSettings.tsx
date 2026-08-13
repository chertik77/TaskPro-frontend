import { Settings } from '@/entities/setting'

import { AccountSection } from './AccountSection'
import { AvatarSection } from './AvatarSection'
import { DeleteAccountSection } from './delete-account/DeleteAccountSection'

export const ProfileSettings = () => (
  <Settings title='Profile'>
    <AvatarSection />
    <AccountSection />
    <Settings.SubTitle className='text-red mt-10'>
      Danger zone
    </Settings.SubTitle>
    <DeleteAccountSection />
  </Settings>
)
