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
    <svg
      className='tablet:w-12 tablet:h-12 desktop:w-12 desktop:h-12'
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'>
      <path
        d='M32 0H8C3.58172 0 0 3.58172 0 8V32C0 36.4183 3.58172 40 8 40H32C36.4183 40 40 36.4183 40 32V8C40 3.58172 36.4183 0 32 0Z'
        fill='#161616'
      />
      <path
        d='M16.6643 28.7836C16.9698 27.1941 17.2301 25.5209 17.5979 23.8478C17.7789 22.9722 17.5583 22.5985 16.5794 22.6654C15.6005 22.7324 14.5085 22.6989 13.4674 22.6654C12.4263 22.632 12.2396 22.1077 12.8394 21.3604C15.7929 17.7129 18.7804 14.1101 21.7566 10.5184C22.0905 10.1113 22.4752 9.82126 23.0241 10.128C23.5729 10.4347 23.4597 10.814 23.3692 11.2713C23.041 12.9445 22.7694 14.6176 22.4073 16.2573C22.2206 17.105 22.4639 17.4062 23.3466 17.3727C24.2324 17.3281 25.12 17.3281 26.0059 17.3727C26.5095 17.3727 27.1715 17.1106 27.4318 17.7966C27.6921 18.4826 27.1432 18.7726 26.866 19.1797C25.7343 20.574 24.5876 21.9664 23.4258 23.357C21.7246 25.3871 20.0365 27.4097 18.3617 29.4249C18.0336 29.8209 17.6658 30.1388 17.1056 29.938C16.5455 29.7373 16.6643 29.2632 16.6643 28.7836Z'
        fill='white'
      />
    </svg>
  )
}
