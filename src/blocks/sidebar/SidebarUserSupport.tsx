import { useModal } from 'react-modal-state'

import { NeedHelpModal } from 'features/user/components/modals'

import { SidebarMobileModal } from './SidebarMobileModal'

export const SidebarUserSupport = () => {
  const { open: openNeedHelpModal } = useModal(NeedHelpModal)

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  return (
    <div
      className='mb-6 rounded-lg bg-white-gray p-3.5 violet:bg-gray-secondary dark:bg-black-third
        tablet:p-5'>
      <img
        className='mb-3.5 h-[78px] w-[54px]'
        src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1733568218/TaskPro/need_help.png'
        alt='Need help icon'
      />
      <p className='mb-lg text-sm violet:text-white tablet:text-base'>
        If you need help with
        <span className='text-brand violet:text-brand-secondary'> TaskPro</span>
        , check out our support resources or reach out to our customer support
        team.
      </p>
      <button
        onClick={() => {
          openNeedHelpModal()
          closeSidebarMobileModal()
        }}
        className='focus-visible:styled-outline flex items-center gap-2 text-sm font-medium
          transition-colors hocus:text-brand-hover violet:text-white
          violet:hocus:text-brand-third dark:text-white-primary
          dark:hocus:text-brand-hover'>
        <svg className='size-5'>
          <use href='/icons.svg#icon-help' />
        </svg>
        Need help?
      </button>
    </div>
  )
}
