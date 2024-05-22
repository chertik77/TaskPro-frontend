import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'

import { selectUser } from 'redux/user.slice'

import { EditProfileModal } from '../modals'

export const HeaderUserInfo = () => {
  const { name, avatarURL } = useSelector(selectUser)

  const { open } = useModal(EditProfileModal)

  return (
    <button
      type='button'
      onClick={open}
      className='flex items-center gap-2'>
      <p>{name}</p>
      <img
        src={avatarURL}
        alt={name}
        className='size-8 rounded-lg'
      />
    </button>
  )
}
