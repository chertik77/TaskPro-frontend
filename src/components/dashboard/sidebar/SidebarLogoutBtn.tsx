import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { logout } from 'redux/user.slice'

import { authService } from 'services'

import { BurgerMenu } from '../modals/BurgerMenu'

export const SidebarLogoutBtn = () => {
  const dispatch = useDispatch()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      toast.success(
        'You have successfully logged out. We look forward to seeing you again soon!'
      )
    },
    onError() {
      toast.error(
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
      )
    }
  })

  const handleClickLogout = () => {
    mutateAsync()
      .then(() => dispatch(logout()))
      .finally(closeBurgerMenu)
  }

  return (
    <button
      className='mt-6 flex items-center gap-3.5 bg-transparent px-6 text-black
        hocus:bg-transparent hocus:text-brand-hover violet:bg-transparent
        violet:hocus:bg-transparent dark:text-white tablet:ml-0'
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
