/* eslint-disable tailwindcss/classnames-order */
import { HeaderBurgerMenuBtn } from './HeaderBurgerMenuBtn'
import { HeaderThemeSelect } from './HeaderThemeSelect'
import { HeaderUserInfo } from './HeaderUserInfo'

export const Header = () => (
  <header
    className='flex justify-between bg-white-primary px-5 py-default dark:bg-black
      desktop:col-start-2 desktop:row-start-1 desktop:justify-end'>
    <HeaderBurgerMenuBtn />
    <div className='flex items-center gap-default'>
      <HeaderThemeSelect />
      <HeaderUserInfo />
    </div>
  </header>
)
