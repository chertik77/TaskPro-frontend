import React, { useState } from 'react';
import avatarLight from '../../images/userAvatarLight.jpg';
import avatarDark from '../../images/userAvatarDark.jpg';
import MainModal from './MainModal';
import { useSelector } from 'react-redux';
import { HeaderThemeSelect } from './HeaderThemeSelect';

const selectUser = (state: { auth: { user: UserData } }) => state.auth.user;

interface UserData {
  avatar: string;
  login: string;
  email: string;
  theme: string;
}

const Header: React.FC<{ click: () => void }> = ({ click }) => {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = user.theme;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentUserData = {
    avatar: user.avatar,
    login: user.login,
    email: user.email,
  };

  return (
    <div className="bg-background-paper">
      <div className="p-4 md:p-8 lg:p-6">
        <button
          className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded"
          onClick={click}
        >
          Open Drawer
        </button>
        <div className="flex items-center space-x-4">
          <HeaderThemeSelect />
          <p className="text-text-primary">{user.login}</p>
          <button
            className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded"
            onClick={openModal}
          >
            Open Drawer
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {theme === 'dark' ? (
            <img
              className="rounded-full"
              src={currentUserData.avatar || avatarDark}
              alt="Avatar"
            />
          ) : (
            <img
              className="rounded-full"
              src={currentUserData.avatar || avatarLight}
              alt="Avatar"
            />
          )}
        </div>
        <MainModal modalIsOpen={isModalOpen} closeModal={closeModal}>
          {/* <ProfileEditModal user={currentUserData} modalClose={closeModal} /> */}
        </MainModal>
      </div>
    </div>
  );
};

export default Header;


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { IoMenu } from 'react-icons/io5';
// import MainModal from './MainModal';
// import { RootState } from '../../redux/store';
// // import { ThemeComponent } from 'components/themeComponent/ThemeComponent';

// const selectUser = (state: RootState) => state.user;

// const Header: React.FC<{ click: () => void }> = ({ click }) => {
//   const user = useSelector(selectUser);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const theme = user.theme;

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

// const currentUserData = {
//   avatar: user.avatar,
//   login: user.name || '',
//   email: user.email || '',
// };

//   return (
//     <div className="bg-white dark:bg-gray-800">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <button
//             className="lg:hidden text-gray-700 dark:text-gray-300"
//             aria-label="Open drawer"
//             onClick={click}
//           >
//             <IoMenu className="w-6 h-6" />
//           </button>
//           <div className="flex items-center space-x-4">
//             {/* <ThemeComponent /> */}
//             <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
//               {currentUserData.login}
//             </p>
//             <button
//               className="flex-shrink-0 focus:outline-none"
//               onClick={openModal}
//               aria-label="Open drawer"
//             >
//               <img
//                 className="h-8 w-8 rounded-full"
//                 src={currentUserData.avatar || (theme === 'dark' ? '/path-to-dark-avatar' : '/path-to-light-avatar')}
//                 alt={currentUserData.login || 'User Avatar'}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//         <MainModal modalIsOpen={isModalOpen} closeModal={closeModal}>
//           {/* <Editprofile user={currentUserData} modalClose={closeModal} /> */}
//       </MainModal>
//     </div>
//   );
// };

// export default Header;


// export const Header = () => {
//   return <div>Header</div>
// }
