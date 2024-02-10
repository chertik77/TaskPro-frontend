import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'
import { useModal } from 'react-modal-state'

export const EditAvatar = () => {
  const { avatarURL } = useSelector(selectUser)
  const { open } = useModal('edit-avatar-modal')
  return (
    <button
      type='button'
      onClick={open}
      style={{ backgroundImage: `url(${avatarURL?.url})` }}
      className='relative size-[68px] rounded-lg bg-cover bg-center'>
      <div className='absolute bottom-[-12px] left-[22px] size-6 rounded-lg bg-brand p-[3px] text-black'>
        <p>+</p>
      </div>
    </button>
  )
}
