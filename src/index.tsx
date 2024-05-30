import type { AxiosError } from 'axios'

import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'contexts/theme.context'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from 'components/App'
import {
  AddCardModal,
  BurgerMenu,
  EditBoardModal,
  EditCardModal,
  EditProfileModal,
  NeedHelpModal,
  NewBoardModal
} from 'components/dashboard/modals'

import { persistor, store } from 'redux/store'

import 'react-edit-text/dist/index.css'
import 'react-responsive-modal/styles.css'
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}>
            <BrowserRouter>
              <ThemeProvider>
                <ModalProvider>
                  <App />
                  <ModalRenderer Component={EditBoardModal} />
                  <ModalRenderer Component={NewBoardModal} />
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
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
