import * as React from 'react';
import RadioFilters from './radioButtons/radioFilters.js';
import { Modal } from 'components/ui/modal/Modal';
import ModalTitle from 'components/ModalTitle/ModalTitle';
import { FormStyled, BoxStyled, SubtitleStyled } from './ModalFilters.styled.js';

const ModalFilters = ({ onClose, onClick }) => {
  let priority = '';
  return (
    <Modal onClose={onClose}>
      <ModalTitle>Filters</ModalTitle>
      <FormStyled>
        <BoxStyled>
          <SubtitleStyled>Label color</SubtitleStyled>
        </BoxStyled>
        <RadioFilters
          onFilterChange={() => priority}
          onModalClose={onClose}
          onClick={onClick}
        />
      </FormStyled>
    </Modal>
  );
};

export default ModalFilters;