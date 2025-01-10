import type { AxiosError } from 'axios'

import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import {
  EditBoardModal,
  NewBoardModal
} from 'features/kanban/board/components/modals'
import {
  AddCardModal,
  EditCardModal
} from 'features/kanban/card/components/modals'
import {
  AddColumnModal,
  EditColumnModal
} from 'features/kanban/column/components/modals'
import { SidebarMobileModal } from 'features/sidebar/components'
import {
  EditProfileModal,
  NeedHelpModal
} from 'features/user/components/modals'

import { App } from 'components/App'

import { persistor, store } from './store'

import 'react-edit-text/dist/index.css'
import 'react-responsive-modal/styles.css'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

declare module '@tanstack/react-query' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    defaultError: AxiosError
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate
              loading={null}
              persistor={persistor}>
              <ModalProvider>
                <App />
                <ModalRenderer Component={NewBoardModal} />
                <ModalRenderer Component={EditBoardModal} />
                <ModalRenderer Component={AddColumnModal} />
                <ModalRenderer Component={EditColumnModal} />
                <ModalRenderer Component={AddCardModal} />
                <ModalRenderer Component={EditCardModal} />
                <ModalRenderer Component={NeedHelpModal} />
                <ModalRenderer Component={EditProfileModal} />
                <ModalRenderer Component={SidebarMobileModal} />
              </ModalProvider>
            </PersistGate>
          </Provider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
