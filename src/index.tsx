import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
