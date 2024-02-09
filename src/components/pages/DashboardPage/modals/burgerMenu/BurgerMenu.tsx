// export const BurgerMenu = () => {
//   return (
//     <div></div>
//     // <Modal>
//     //   <div>hello</div>
//     // </Modal>
//   )
// }

import { useState } from 'react';
import { Sidebar } from '../../sidebar/Sidebar';

export const BurgerMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} onCloseSideBar={closeSidebar} />
    </>
  );
};