import type { AxiosError } from 'axios'

import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider } from 'contexts/sidebar.context'
import { ThemeProvider } from 'contexts/theme.context'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { Board } from 'components/dashboard'
import {
  AddCardModal,
  BurgerMenu,
  EditBoardModal,
  EditCardModal,
  EditProfileModal,
  NeedHelpModal,
  NewBoardModal
} from 'components/dashboard/modals'
import { Layout } from 'components/Layout'
import { PrivateRoute, RestrictedRoute } from 'components/routes'
import { CreateBoard } from 'components/ui'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <RestrictedRoute component={<HomePage />} /> }
    ]
  },
  {
    path: '/auth/signin',
    element: <RestrictedRoute component={<SigninPage />} />
  },
  {
    path: '/auth/signup',
    element: <RestrictedRoute component={<SignupPage />} />
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute
        component={
          <SidebarProvider>
            <DashboardPage />
          </SidebarProvider>
        }
      />
    ),
    children: [
      { index: true, element: <CreateBoard /> },
      { path: ':boardId', element: <Board /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <ThemeProvider>
            <ModalProvider>
              <RouterProvider router={router} />
              <ModalRenderer Component={EditBoardModal} />
              <ModalRenderer Component={NewBoardModal} />
              <ModalRenderer Component={NeedHelpModal} />
              <ModalRenderer Component={AddCardModal} />
              <ModalRenderer Component={EditCardModal} />
              <ModalRenderer Component={EditProfileModal} />
              <ModalRenderer Component={BurgerMenu} />
            </ModalProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
)
