import { Button } from 'components/ui'

export const SidebarUserSupportBtn = () => (
  <div className='mb-6 h-[238px] tablet:h-[272px]'>
    <div
      className='rounded-lg bg-white-gray p-[14px] violet:bg-gray-secondary
           dark:bg-black-third tablet:p-5'>
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
      <Button className='violet:text-white' isSmallIcon iconName='help'>
        <span className='text-fs-12-lh-normal-fw-400'>Need help?</span>
      </Button>
    </div>
  </div>
)
