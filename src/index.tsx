import { App } from 'components/App'
import { ThemeProviderContainer } from 'components/ThemeProviderContainer'
import {
  AddColumnModal,
  BurgerMenu,
  EditBoardModal,
  EditColumnModal,
  EditProfileModal,
  NewBoardModal,
  AddCardModal,
  EditCardModal
} from 'components/pages/DashboardPage/modals'
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
        <ThemeProviderContainer>
          <BrowserRouter>
            <ModalProvider
              modals={[
                ['edit-board-modal', EditBoardModal],
                ['new-board-modal', NewBoardModal],
                ['add-column-modal', AddColumnModal],
                ['edit-column-modal', EditColumnModal],
                ['add-card-modal', AddCardModal],
                ['edit-card-modal', EditCardModal],
                ['edit-profile-modal', EditProfileModal],
                ['edit-profile-modal', EditProfileModal],
                ['burger-menu', BurgerMenu]
              ]}>
              <App />
              <ModalRenderer Component={EditBoardModal} />
              <ModalRenderer Component={NewBoardModal} />
              <ModalRenderer Component={AddColumnModal} />
              <ModalRenderer Component={EditColumnModal} />
              <ModalRenderer Component={AddCardModal} />
              <ModalRenderer Component={EditCardModal} />
              <ModalRenderer Component={EditProfileModal} />
              <ModalRenderer Component={BurgerMenu} />
            </ModalProvider>
          </BrowserRouter>
        </ThemeProviderContainer>
      </PersistGate>
    </Provider>
  </StrictMode>
)
