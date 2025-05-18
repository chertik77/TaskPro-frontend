import type { ReactNode } from 'react'

type NeedHelpCardProps = {
  children: ReactNode
}

export const NeedHelpCard = ({ children }: NeedHelpCardProps) => (
  <div
    className='bg-white-muted violet:bg-gray dark:bg-black-muted tablet:p-5 mb-6 rounded-lg
      p-3.5'>
    <img
      className='mb-3.5 h-[78px] w-[54px]'
      src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1733568218/TaskPro/need_help.png'
      alt='Need help icon'
    />
    <p className='text-md violet:text-white tablet:text-base mb-4.5'>
      If you need help with
      <span className='text-brand violet:text-brand-violet'> TaskPro</span>,
      check out our support resources or reach out to our customer support team.
    </p>
    {children}
  </div>
)
