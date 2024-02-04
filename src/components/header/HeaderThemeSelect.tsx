import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SvgIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';

const updateUserTheme = createAsyncThunk(
  "auth/theme",
  async (theme: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.user.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      console.log('Updated theme:', theme);
      return theme;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const HeaderThemeSelect = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.user.user.theme);

  const handleThemeChange = async (theme: string) => {
    try {
      await (dispatch as ThunkDispatch<RootState, unknown, any>)(updateUserTheme(theme));
      handleClose();
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoSvg = currentTheme === 'dark' ? '#chevron-down-white' : '#chevron-down';

  return (
    <div className="flex justify-left w-100">
      <Button
        id="theme-button"
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          fontFamily: 'Poppins',
          border: 'none',
          fontSize: '14px',
          fontStyle: 'normal',
          textTransform: 'capitalize',
          fontWeight: 500,
          color: 'text.secondary',
        }}
        className="main-transition"
      >
        Theme
        <SvgIcon
          sx={{
            width: '16px',
            height: '16px',
            backgroundColor: 'transparent',
            marginLeft: '4px',
          }}
        >
          <use href={"icon" + `${logoSvg}`}></use>
        </SvgIcon>
      </Button>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
        sx={{
          left: '-8px',
          fontFamily: 'Poppins',
          fontSize: '14px',
          boxShadow: '0px 2px 4px rgba(17, 17, 17, 0.1)',
          zIndex: '3000',
          '&& .Mui-selected': {
            backgroundColor: 'transparent',
            bgcolor: 'background.paper',
          },
          '&& li.MuiMenuItem-root': {
            width: '100px',
          },
          '&& ul.MuiList-root': {
            paddingTop: '18px',
            paddingBottom: '18px',
            border: '1px solid',
            borderColor: 'secondary.light',
            borderRadius: '8px',
          },
          '&& .MuiPopover-paper': {
            borderRadius: '8px',
          },
        }}
        className="main-transition"
      >
        <MenuItem
          onClick={() => handleThemeChange('light')}
          sx={{
            fontSize: '14px',
            minHeight: '21px',
            padding: '2px 44px 2px 18px',
            fontFamily: 'Poppins',
            color: currentTheme === 'light' ? 'text.hint' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
          className="main-transition"
        >
          Light
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange('dark')}
          sx={{
            fontSize: '14px',
            minHeight: '21px',
            padding: '2px 44px 2px 18px',
            fontFamily: 'Poppins',
            color: currentTheme === 'dark' ? 'text.hint' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
          className="main-transition"
        >
          Dark
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange('violet')}
          sx={{
            fontSize: '14px',
            minHeight: '21px',
            padding: '2px 44px 2px 18px',
            fontFamily: 'Poppins',
            color: currentTheme === 'violet' ? 'text.hint' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
          className="main-transition"
        >
          Violet
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderThemeSelect;

// export const HeaderThemeSelect = () => {
//   return <div>HeaderThemeSelect</div>
// }

// export default HeaderThemeSelect;