import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Sidebar} from './components/ui/Sidebar/Sidebar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Sidebar></Sidebar>
  </React.StrictMode>,
)
