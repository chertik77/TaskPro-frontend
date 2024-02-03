import { Link } from "@tanstack/react-router"

export const HomePage = () => {
  return (
    <div className='bg-welcome-page-gradient'>
      <div className='flex justify-center'>
      <picture>
              <source
                media="(min-width: 768px)"
          srcSet="
                  /images/boy_t_d.avif 1x, 
                  /images/boy_t_d@2x.avif 2x,
                  /images/boy_t_d@3x.avif 3x
                "
              />
              
              <source
                media="(max-width: 767px)"
                srcSet="
                  /images/boy_phone.avif 1x, 
                  /images/boy_phone@2x.avif 2x,
                  /images/boy_phone@3x.avif 3x
                "
              />
              
              <img
                className="user-with-notebook"
                src="images/boy_phone.avif"
                alt="user-with-notebook"
                loading="lazy"
              />
        </picture>
        </div>
      <h1>Task Pro</h1>
      <p>Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!</p>
      <ul>
        
        <li><Link to='/signup'>Registration</Link> </li>
        <li><Link to='/signin'>Log In</Link> </li>
      </ul>
    </div>
  )
}
