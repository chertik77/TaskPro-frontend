import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'

export const SidebarUserSupportBtn = () => {
  const { open } = useModal('need-help-modal')

  return (
    <div
      className='h-[238px] rounded-lg bg-white-gray p-[14px]
    violet:bg-gray-secondary dark:bg-black-third tablet:h-[272px] tablet:p-5 desktop:mx-6 desktop:mt-10'>
      <div className='mb-3.5'>
        <picture>
          <source srcSet='/images/helpIcon.avif 1x, /images/helpIcon@2x.avif 2x' />
          <img src='/images/2.avif' alt='Need help icon' />
        </picture>
      </div>
      <p className='mb-[18px] text-fs-12-lh-1.33-fw-400 violet:text-white tablet:text-fs-14-lh-1.42-fw-400'>
        If you need help with
        <span className='text-brand violet:text-brand-secondary'> TaskPro</span>
        , check out our support resources or reach out to our customer support
        team.
      </p>
      <div className='flex items-center gap-2'>
        <Button
          onClick={open}
          className='mb-4 hocus:text-brand-hover  violet:text-white violet:hocus:text-brand-third'
          isSmallIcon
          iconName='help'>
          <span className='text-fs-12-lh-normal-fw-400 opacity-100'>
            Need help?
          </span>
        </Button>
      </div>
    </div>
  )
}
