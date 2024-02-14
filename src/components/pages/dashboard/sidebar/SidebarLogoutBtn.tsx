import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'
import { useLogoutMutation } from 'redux/api/user'

export const SidebarLogoutBtn = () => {
  const [logout] = useLogoutMutation()
  const { close } = useModal('burger-menu')

  return (
    <Button
      className='my-6 flex items-center gap-3.5 bg-transparent text-black hocus:bg-transparent hocus:text-brand-hover violet:bg-transparent violet:hocus:bg-transparent dark:text-white desktop:px-6'
      onClick={() => {
        logout(undefined)
        close()
      }}>
      <svg className='size-8 text-brand hocus:text-brand-hover violet:text-white violet:hocus:text-brand-third'>
        <use xlinkHref='/assets/icons.svg#icon-logout-btn' />
      </svg>
      <span className='text-fs-16-lh-normal-fw-500 violet:text-white'>
        Log out
      </span>
    </Button>
  )
}
