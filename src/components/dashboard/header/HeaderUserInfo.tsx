import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'

import { selectUser } from 'redux/user.slice'

import { EditProfileModal } from '../modals'

export const HeaderUserInfo = () => {
  const { name, avatar } = useSelector(selectUser)

  const { open } = useModal(EditProfileModal)

  return (
    <button
      type='button'
      onClick={open}
      className='flex items-center gap-2'>
      <p>{name}</p>
      <img
        src={avatar}
        alt={name}
        referrerPolicy='no-referrer'
        className='size-8 rounded-lg'
      />
    </button>
  )
}
