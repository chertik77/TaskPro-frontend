import React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { LabelStyled } from "./radioFilters.styled.jsx";

const RadioFilters = ({ onFilterChange, onModalClose, onClick }) => {
  const radioButtons = [
    {
      value: 'Without',
      label: 'Without priority',
      labelColor: 'rgba(22, 22, 22, 0.5)',
      radioColor: {
        static: 'rgba(22, 22, 22, 0.3)',
        onChecked: ' #ffffff',
      },
    },
    {
      value: 'Low',
      label: 'Low',
      labelColor: '#8fa1d0',
      radioColor: {
        static: '#8fa1d0',
        onChecked: ' #ffffff',
      },
    },
    {
      value: 'Medium',
      label: 'Medium',
      labelColor: '#e09cb5',
      radioColor: {
        static: '#e09cb5',
        onChecked: ' #ffffff',
      },
    },
    {
      value: 'High',
      label: 'High',
      labelColor: '#bedbb0',
      radioColor: {
        static: '#bedbb0',
        onChecked: ' #ffffff',
      },
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '120px',
      }}
    >
      <RadioGroup
        aria-labelledby="label-changer"
        defaultValue="all"
        name="radio-buttons-group"
        onChange={ev => {
          onFilterChange(ev.target.value);
          setTimeout(() => {
            onModalClose();
          }, 150);
        }}
        sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
      >
        <FormControlLabel
          value=""
          control={<Radio sx={{ display: 'none' }} />}
          label={<LabelStyled>Show all</LabelStyled>}
          onClick={onClick}
        />
        {radioButtons.map(button => {
          const { value, label, labelColor, radioColor } = button;
          return (
            <FormControlLabel
              key={value}
              value={value}
              sx={{
                display: 'flex',
                gap: '8px',
                margin: '0',
                height: '24px',
                '& .MuiTypography-root': {
                  fontFamily: 'Poppins',
                  fontSize: '12px',
                  letterSpacing: '-0.24px',
                  color: labelColor,
                },
              }}
              control={
                <Radio
                  onClick={onClick}
                  sx={{
                    width: '14px',
                    height: '14px',
                    color: 'transparent',
                    backgroundColor: radioColor.static,
                    '&.Mui-checked': {
                      color: radioColor.static,
                      backgroundColor: radioColor.onChecked,
                    },
                  }}
                  disableRipple
                />
              }
              label={label}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default RadioFilters;