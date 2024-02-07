import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'
import { useModal } from 'react-modal-state'

export const HeaderUserInfo = () => {
  const { name, avatarURL } = useSelector(selectUser)
  const { open } = useModal('add-card-modal')

  return (
    <div className='flex items-center gap-2'>
      <button onClick={open}>test</button>
      <p>{name}</p>
      <img src={avatarURL.url} alt={name as string} className='size-8' />
    </div>
  )
}
