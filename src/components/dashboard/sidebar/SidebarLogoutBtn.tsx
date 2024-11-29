import { useLogoutUser } from 'hooks/auth'

export const SidebarLogoutBtn = () => {
  const { mutate, isPending } = useLogoutUser()

  return (
    <button
      className='group flex items-center gap-3.5 bg-transparent px-6 text-md font-medium
        violet:text-white'
      disabled={isPending}
      onClick={() => mutate()}>
      <svg
        className='size-8 text-brand transition-colors group-hover:text-brand-hover
          group-focus:text-brand-hover violet:text-white
          group-hover:violet:text-brand-third group-focus:violet:text-brand-third'>
        <use href='/icons.svg#icon-logout' />
      </svg>
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
