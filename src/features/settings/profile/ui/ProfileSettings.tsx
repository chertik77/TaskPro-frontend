import { Settings } from '@/entities/setting'

import { DeleteAccountSection } from './delete-account/DeleteAccountSection'
import { ProfileCard } from './ProfileCard'

export const ProfileSettings = () => (
  <Settings title='Profile'>
    <ProfileCard />
    <Settings.SubTitle className='text-red mt-10'>
      Danger zone
    </Settings.SubTitle>
    <DeleteAccountSection />
  </Settings>
)
