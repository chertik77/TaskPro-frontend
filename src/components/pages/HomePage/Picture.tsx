export const Picture = () => {
   return(<picture className='flex justify-center pt-[211px] tablet:pt-[293px] desktop:pt-[166px]'>
   <source
      media="(min-width: 768px)"
      srcSet="
         /images/Welcome_tab_desktop.avif 1x, 
         /images/Welcome_tab_desktop@2x.avif 2x
      "
   />
              
   <source
      media="(max-width: 767px)"
      srcSet="
         /images/Welcome_phone.avif 1x, 
         /images/Welcome_phone@2x.avif 2x
      "
   />
              
   <img
      className="user-with-notebook"
      src="images/Welcome_tab_desktop.avif"
      alt="user-with-notebook"
      loading="lazy"
   />
   </picture>)
}