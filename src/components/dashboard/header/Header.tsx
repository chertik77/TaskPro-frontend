import { HeaderBurgerMenuBtn } from './HeaderBurgerMenuBtn'
import { HeaderThemeSelect } from './HeaderThemeSelect'
import { HeaderUserInfo } from './HeaderUserInfo'

export const Header = () => (
  <header
    className='flex justify-between bg-white-primary px-5 py-3.5 dark:bg-black
      desktop:justify-end'>
    <HeaderBurgerMenuBtn />
    <div className='flex items-center gap-3.5'>
      <HeaderThemeSelect />
      <HeaderUserInfo />
    </div>
  </header>
)
