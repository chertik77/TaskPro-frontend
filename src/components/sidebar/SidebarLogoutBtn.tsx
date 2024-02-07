import { Button } from 'components/ui'
import { useLogoutMutation } from 'redux/api/user'

export const SidebarLogoutBtn = () => {
  const [logout] = useLogoutMutation()
  return (
    <Button isSmallIcon iconName='logout'
      className='flex items-center gap-3.5 mt-6 violet:text-white'
    onClick={logout}>
        <span className=' text-base font-medium '>Log out</span>
        </Button>
)}