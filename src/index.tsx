import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { Toaster } from 'sonner'
import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  basepath: import.meta.env.DEV ? '/' : '/final-project-frontend'
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
        <RouterProvider router={router} />
        <Toaster richColors position='top-right' />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
