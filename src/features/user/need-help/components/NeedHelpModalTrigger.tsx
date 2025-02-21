import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { NeedHelpModal } from './NeedHelpModal'

export const NeedHelpModalTrigger = () => {
  const { open: openNeedHelpModal } = useModal(NeedHelpModal)

  return (
    <div
      className='mb-6 rounded-lg bg-white-muted p-3.5 violet:bg-gray dark:bg-black-muted
        tablet:p-5'>
      <img
        className='mb-3.5 h-[78px] w-[54px]'
        src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1733568218/TaskPro/need_help.png'
        alt='Need help icon'
      />
      <p className='mb-4.5 text-md violet:text-white tablet:text-base'>
        If you need help with
        <span className='text-brand violet:text-brand-violet'> TaskPro</span>,
        check out our support resources or reach out to our customer support
        team.
      </p>
      <button
        type='button'
        onClick={() => {
          openNeedHelpModal()
        }}
        className='focus-visible:styled-outline flex size-max items-center gap-2 bg-transparent
          text-md font-medium transition-all violet:text-white hocus:text-brand-light
          violet:hocus:text-brand-violet-soft dark:text-white-soft
          dark:hocus:text-brand-light'>
        <Icon
          name='help'
          className='size-5'
        />
        Need help?
      </button>
    </div>
  )
}
