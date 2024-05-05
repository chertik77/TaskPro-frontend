import { useModal } from 'react-modal-state'

export const SidebarUserSupportBtn = () => {
  const { open } = useModal('need-help-modal')

  return (
    <div
      className='h-[238px] rounded-lg bg-white-gray p-default violet:bg-gray-secondary
        dark:bg-black-third tablet:h-[272px] tablet:p-5 desktop:mx-6'>
      <div className='mb-3.5'>
        <picture>
          <source srcSet='/images/helpIcon.avif 1x, /images/helpIcon@2x.avif 2x' />
          <img
            src='/images/2.avif'
            alt='Need help icon'
          />
        </picture>
      </div>
      <p
        className='mb-[18px] text-fs-12-lh-1.33-fw-400 violet:text-white
          tablet:text-fs-14-lh-1.42-fw-400'>
        If you need help with
        <span className='text-brand violet:text-brand-secondary'> TaskPro</span>
        , check out our support resources or reach out to our customer support
        team.
      </p>
      <button
        onClick={open}
        className='flex gap-2 text-fs-12-lh-normal-fw-400 hocus:text-brand-hover violet:text-white
          violet:hocus:text-brand-third dark:text-white-primary
          dark:hocus:text-brand-hover'>
        <svg className='size-5'>
          <use href={`/icons.svg#icon-help`} />
        </svg>
        Need help?
      </button>
    </div>
  )
}
