import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'

export const HeaderUserInfo = () => {
  const { name, avatarURL } = useSelector(selectUser)
  const { open } = useModal('edit-profile-modal')

  return (
    <button
      type='button'
      onClick={open}
      className='flex items-center gap-2'>
      <p>{name}</p>
      <img
        src={avatarURL.url}
        alt={name as string}
        className='size-8 rounded-lg'
      />
    </button>
  )
}
