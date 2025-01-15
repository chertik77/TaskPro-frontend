import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Providers } from './providers'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
)
