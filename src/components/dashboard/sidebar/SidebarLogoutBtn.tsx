import { useSidebar } from 'contexts/sidebar.context'

import { useLogoutUser } from 'hooks/auth'

import { cn } from 'lib'

export const SidebarLogoutBtn = () => {
  const { isSidebarOpen } = useSidebar()

  const { mutate, isPending } = useLogoutUser()

  return (
    <button
      className={cn(
        `group flex items-center gap-3.5 bg-transparent px-6 text-md font-medium
        violet:text-white`,
        isSidebarOpen && 'mt-6'
      )}
      disabled={isPending}
      onClick={() => mutate()}>
      <svg
        className='size-8 text-brand transition-colors group-hover:text-brand-hover
          group-focus:text-brand-hover violet:text-white
          group-hover:violet:text-brand-third group-focus:violet:text-brand-third'>
        <use href='/icons.svg#icon-logout' />
      </svg>
      {isPending ? 'Logging out...' : isSidebarOpen && 'Log out'}
    </button>
  )
}
