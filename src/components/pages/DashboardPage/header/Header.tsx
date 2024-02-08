// import { HeaderBurgerMenuBtn } from './HeaderBurgerMenuBtn'
// import { HeaderThemeSelect } from './HeaderThemeSelect'
// import { HeaderUserInfo } from './HeaderUserInfo'

// export const Header = () => (
//   <header className='flex justify-between bg-white-primary px-5 py-[14px] dark:bg-black desktop:justify-end'>
//     <HeaderBurgerMenuBtn />
//     <div className='flex items-center gap-[14px]'>
//       <HeaderThemeSelect />
//       <HeaderUserInfo />
//     </div>
//   </header>
// )

import { HeaderBurgerMenuBtn } from './HeaderBurgerMenuBtn';
import { HeaderThemeSelect } from './HeaderThemeSelect';
import { HeaderUserInfo } from './HeaderUserInfo';
import PropTypes from 'prop-types';

interface HeaderProps {
  toggleSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className='flex justify-between bg-white-primary px-5 py-[14px] dark:bg-black desktop:justify-end'>
      <HeaderBurgerMenuBtn toggleSidebar={toggleSidebar} />
      <div className='flex items-center gap-[14px]'>
        <HeaderThemeSelect />
        <HeaderUserInfo />
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
