import type { AxiosError } from 'axios'

import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'

import { App } from 'components/App'
import {
  AddCardModal,
  AddColumnModal,
  BurgerMenu,
  EditBoardModal,
  EditCardModal,
  EditProfileModal,
  NeedHelpModal,
  NewBoardModal
} from 'components/dashboard/modals'

import './index.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <BrowserRouter>
            <ModalProvider
              modals={[
                ['edit-board-modal', EditBoardModal],
                ['new-board-modal', NewBoardModal],
                ['add-column-modal', AddColumnModal],
                ['need-help-modal', NeedHelpModal],
                ['add-card-modal', AddCardModal],
                ['edit-card-modal', EditCardModal],
                ['edit-profile-modal', EditProfileModal],
                ['burger-menu', BurgerMenu]
              ]}>
              <App />
              <ModalRenderer Component={EditBoardModal} />
              <ModalRenderer Component={NewBoardModal} />
              <ModalRenderer Component={AddColumnModal} />
              <ModalRenderer Component={NeedHelpModal} />
              <ModalRenderer Component={AddCardModal} />
              <ModalRenderer Component={EditCardModal} />
              <ModalRenderer Component={EditProfileModal} />
              <ModalRenderer Component={BurgerMenu} />
            </ModalProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
