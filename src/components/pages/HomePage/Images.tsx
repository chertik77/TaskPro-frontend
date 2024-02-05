export const Picture = () => (
  <picture>
    <source
      media='(min-width: 768px)'
      srcSet='
         /images/Welcome_tab_desktop.avif 1x, 
         /images/Welcome_tab_desktop@2x.avif 2x
      '
    />

    <source
      media='(max-width: 767px)'
      srcSet='
         /images/Welcome_phone.avif 1x, 
         /images/Welcome_phone@2x.avif 2x
      '
    />

    <img
      className='user-with-notebook'
      src='images/Welcome_tab_desktop.avif'
      alt='user-with-notebook'
      loading='lazy'
    />
  </picture>
)

export const Logo = () => {
  return (
    <svg className='w-10 h-10 tablet:w-12 tablet:h-12 desktop:w-12 desktop:h-12'>
      <use xlinkHref='/src/lib/icons/icons.svg#icon-logo' />
    </svg>
  )
}
