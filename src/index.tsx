import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from 'redux/store'
import { Toaster } from 'sonner'
import './index.css'
import { routeTree } from './routeTree.gen'
import { PersistGate } from 'redux-persist/integration/react'
        
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
          <RouterProvider router={router} />
          <Toaster richColors position='top-right' />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
