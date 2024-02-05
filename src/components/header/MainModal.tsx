// import React, { useEffect, useState } from 'react';
// import Modal from '@mui/material/Modal';

// interface MainModalProps {
//   modalIsOpen: boolean;
//   closeModal: () => void;
//   children: React.ReactNode;
// }

// const MainModal: React.FC<MainModalProps> = ({ closeModal, children, modalIsOpen }) => {
//   const [localModalIsOpen, setLocalModalIsOpen] = useState(false);

//   useEffect(() => {
//     setLocalModalIsOpen(modalIsOpen);
//   }, [modalIsOpen]);

//   const handleClose = () => {
//     setLocalModalIsOpen(false);
//     closeModal();
//   };

//   return (
//     <Modal
//       open={localModalIsOpen}
//       onClose={handleClose}
//       className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
//     >
//       <div className="bg-white p-8 rounded shadow-md">
//         {children}
//       </div>
//     </Modal>
//   );
// };

// export default MainModal;
