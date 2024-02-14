import { App } from 'components/App'
import {
  AddCardModal,
  AddColumnModal,
  BurgerMenu,
  EditBoardModal,
  EditCardModal,
  EditColumnModal,
  EditProfileModal,
  NeedHelpModal,
  NewBoardModal
} from 'components/pages/dashboard/modals'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            themes={['light', 'dark', 'violet']}
            enableSystem={false}>
            <ModalProvider
              modals={[
                ['edit-board-modal', EditBoardModal],
                ['new-board-modal', NewBoardModal],
                ['add-column-modal', AddColumnModal],
                ['edit-column-modal', EditColumnModal],
                ['create-need-help-modal', NeedHelpModal],
                ['add-card-modal', AddCardModal],
                ['edit-card-modal', EditCardModal],
                ['edit-profile-modal', EditProfileModal],
                ['burger-menu', BurgerMenu]
              ]}>
              <App />
              <ModalRenderer Component={EditBoardModal} />
              <ModalRenderer Component={NewBoardModal} />
              <ModalRenderer Component={AddColumnModal} />
              <ModalRenderer Component={EditColumnModal} />
              <ModalRenderer Component={NeedHelpModal} />
              <ModalRenderer Component={AddCardModal} />
              <ModalRenderer Component={EditCardModal} />
              <ModalRenderer Component={EditProfileModal} />
              <ModalRenderer Component={BurgerMenu} />
            </ModalProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)
