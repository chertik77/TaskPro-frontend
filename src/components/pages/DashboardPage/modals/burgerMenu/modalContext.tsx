// File: ModalContext.tsx
import React, { createContext, useContext } from 'react';
import { useModalInstance } from 'react-modal-state';

interface ModalContextProps {
  isOpen: boolean;
  close: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC = () => {
  const { isOpen, close } = useModalInstance();

  return (
    <ModalContext.Provider value={{ isOpen, close }}>
    
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
