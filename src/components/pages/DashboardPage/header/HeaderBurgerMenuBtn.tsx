// export const HeaderBurgerMenuBtn = () => {
//   return (
//     <button className='desktop:hidden'>
//       <svg className='size-6 stroke-black dark:stroke-white'>
//         <use xlinkHref='/assets/icons.svg#icon-menu' />
//       </svg>
//     </button>
//   )
// }

import React from 'react';
import PropTypes from 'prop-types';

interface HeaderBurgerMenuBtnProps {
  toggleSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const HeaderBurgerMenuBtn = ({ toggleSidebar }: HeaderBurgerMenuBtnProps) => {
  return (
    <button className='desktop:hidden' onClick={toggleSidebar}>
      <svg className='size-6 stroke-black dark:stroke-white'>
        <use xlinkHref='/assets/icons.svg#icon-menu' />
      </svg>
    </button>
  );
};

HeaderBurgerMenuBtn.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

