import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'
import { useLogoutMutation } from 'redux/api/user'

export const SidebarLogoutBtn = () => {
  const [logout] = useLogoutMutation()
  const { close } = useModal('burger-menu')

  return (
    <Button
      className='mt-6 flex h-[32px] items-center gap-3.5 bg-transparent text-black hocus:bg-transparent hocus:text-brand-hover violet:bg-transparent violet:hocus:bg-transparent dark:text-white desktop:px-6'
      onClick={() => {
        logout(undefined)
        close()
      }}>
      <svg className='size-8 text-brand hocus:text-brand-hover violet:text-white violet:hocus:text-brand-third'>
        <use xlinkHref='/assets/icons.svg#icon-logout-btn' />
      </svg>
      <span className='text-fs-16-lh-normal-fw-500 violet:text-white violet:text-white violet:hocus:text-brand-third dark:text-white dark:hocus:text-brand-hover'>
        Log out
      </span>
    </Button>
  )
}
