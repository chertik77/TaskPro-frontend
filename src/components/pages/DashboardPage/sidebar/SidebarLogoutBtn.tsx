import { Button } from 'components/ui'
import { useLogoutMutation } from 'redux/api/user'

export const SidebarLogoutBtn = () => {
  const [logout] = useLogoutMutation()
  return (
    <Button isSmallIcon iconName='logout'
      className='mt-6 flex items-center gap-3.5 violet:text-white'
    onClick={logout}>
        <span className=' text-base font-medium '>Log out</span>
        </Button>
)}