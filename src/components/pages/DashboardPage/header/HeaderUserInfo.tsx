import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'

export const HeaderUserInfo = () => {
  const { name, avatarURL } = useSelector(selectUser)

  return (
    <div className='flex items-center gap-2'>
      <p>{name}</p>
      <img src={avatarURL.url} alt={name as string} className='size-8' />
    </div>
  )
}
