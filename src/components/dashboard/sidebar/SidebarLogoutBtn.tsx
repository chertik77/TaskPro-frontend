import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'

import { useAppDispatch } from 'hooks'

import { logout } from 'redux/user.slice'

import { authService } from 'services'

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
    <button
      className='ml-[10px] mt-6 flex items-center gap-3.5 bg-transparent text-black
        hocus:bg-transparent hocus:text-brand-hover violet:bg-transparent
        violet:hocus:bg-transparent dark:text-white tablet:ml-0 desktop:px-6'
      disabled={isPending}
      onClick={handleClickLogout}>
      <svg
        className='size-8 text-brand hocus:text-brand-hover violet:text-white
          violet:hocus:text-brand-third'>
        <use href='/icons.svg#icon-logout' />
      </svg>
      <span
        className='text-fs-16-lh-normal-fw-500 violet:text-white violet:hocus:text-brand-third
          dark:text-white dark:hocus:text-brand-hover'>
        {isPending ? 'Logging out...' : 'Log out'}
      </span>
    </button>
  )
}
