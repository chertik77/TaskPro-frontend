import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import './index.css'

import { routeTree } from './routeTree.gen'
import { Sidebar } from 'components/sidebar/Sidebar'

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
        <RouterProvider router={router} />
        <Sidebar></Sidebar>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
