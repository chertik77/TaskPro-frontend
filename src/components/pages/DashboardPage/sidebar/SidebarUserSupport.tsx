export const SidebarUserSupport = () => {
  return (
    <div className='mb-6 h-[238px] rounded-lg bg-[#F6F6F7] md:h-[272px]'>
      <div className='p-[14px] md:p-5'>
        <div className='mb-3.5 '>
          <picture>
            <source
              srcSet='/images/helpIcon.avif 1x, 
         /images/helpIcon@2x.avif 2x'
            />
            <img src='/images/2.avif ' alt='Need help icon' />
          </picture>
        </div>
        <p className=' mb-[18px] text-sm font-normal'>
          If you need help with
          <span className='text-[#BEDBB0]'> TaskPro</span>, check out our
          support resources or reach out to our customer support team.
        </p>
        <div>
          <a href='' className='flex items-center gap-2'>
            <div>
              <svg width='20' height='20'>
                <use href='assets/icons.svg#icon-help'></use>
              </svg>
            </div>
            <p className=' font-medium'>Need help?</p>
          </a>
        </div>
      </div>
    </div>
  )
}
