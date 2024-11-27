import { HeaderBurgerMenuBtn } from './HeaderBurgerMenuBtn'
import { HeaderThemeSelect } from './HeaderThemeSelect'
import { HeaderUserInfo } from './HeaderUserInfo'

export const Header = () => (
  <header
    className='flex justify-end bg-white-primary px-5 py-3.5 transition-all duration-300
      dark:bg-black'>
    <HeaderBurgerMenuBtn />
    <div className='flex items-center gap-3.5'>
      <HeaderThemeSelect />
      <HeaderUserInfo />
    </div>
  </header>
)
