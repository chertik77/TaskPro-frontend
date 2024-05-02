import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { logout } from 'redux/slices/user/user-slice'

import { Button } from 'components/ui'

import { useAppDispatch } from 'hooks'

import { authService } from 'services/auth.service'

export const SidebarLogoutBtn = () => {
  const dispatch = useAppDispatch()

  const { close } = useModal('burger-menu')

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout()
  })

  const handleClickLogout = () => {
    mutateAsync()
      .then(() => dispatch(logout()))
      .finally(close)
  }

  return (
    <Button
      className='mt-6 flex h-[32px] items-center gap-3.5 bg-transparent text-black
        hocus:bg-transparent hocus:text-brand-hover violet:bg-transparent
        violet:hocus:bg-transparent dark:text-white desktop:px-6'
      disabled={isPending}
      onClick={handleClickLogout}>
      <svg
        className='size-8 text-brand hocus:text-brand-hover violet:text-white
          violet:hocus:text-brand-third'>
        <use xlinkHref='/assets/icons.svg#icon-logout-btn' />
      </svg>
      <span
        className='text-fs-16-lh-normal-fw-500 violet:text-white violet:hocus:text-brand-third
          dark:text-white dark:hocus:text-brand-hover'>
        {isPending ? 'Logging out...' : 'Log out'}
      </span>
    </Button>
  )
}
