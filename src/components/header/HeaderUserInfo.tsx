import { EditProfile } from 'components/features/EditProfile'
import { useModal } from 'hooks'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'

export const HeaderUserInfo = () => {
  const { name, avatarURL } = useSelector(selectUser)
  const { toggleModal, isModalOpen } = useModal()

  return (
    <div className='flex items-center gap-2'>
      <p>{name}</p>
      <button
        className='size-8 bg-cover'
        style={{ backgroundImage: `url(${avatarURL?.url})` }}
        onClick={toggleModal}></button>
      {isModalOpen && (
        <EditProfile isModalOpen={isModalOpen} toggleModal={toggleModal} />
      )}
    </div>
  )
}
