import { useTheme } from 'next-themes'
import { HeaderBurgerMenuBtn } from './HeaderBurgerMenuBtn'
import { Select, SelectContent, SelectTrigger } from './HeaderThemeSelect'
import HeaderUserInfo from './HeaderUserInfo'

export const Header = () => {
  const { setTheme } = useTheme()
  return (
    <header className='flex bg-white-primary py-[14px] dark:bg-black'>
      <HeaderBurgerMenuBtn />
      <div>
        <Select onValueChange={setTheme}>
          <SelectTrigger />
          <SelectContent />
        </Select>
        <HeaderUserInfo />
      </div>
    </header>
  )
}
