import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'
import { useLogoutMutation } from 'redux/api/user'

export const SidebarLogoutBtn = () => {
  const [logout] = useLogoutMutation()
  const { open } = useModal('add-card-modal')

  return (
    <>
      {/* remove before PR */}
      <button onClick={open}>Anton test</button>
      <Button className='flex items-center gap-3.5' onClick={logout}>
        <svg className='size-8 text-brand hocus:text-brand-hover violet:text-white violet:hocus:text-brand-third'>
          <use xlinkHref='/assets/icons.svg#icon-logout-btn' />
        </svg>
        <span className='text-fs-16-lh-normal-fw-500 violet:text-white'>
          Log out
        </span>
      </Button>
    </>
  )
}
