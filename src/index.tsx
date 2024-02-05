import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { Toaster } from 'sonner'
import './index.css'

import { routeTree } from './routeTree.gen'
import { Sidebar } from 'components/sidebar/Sidebar'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
        <RouterProvider router={router} />
        <Sidebar></Sidebar>
        <Toaster richColors position='top-right' />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
