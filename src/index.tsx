import { App } from 'components/App'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
          <BrowserRouter
            basename={import.meta.env.DEV ? '/' : '/final-project-frontend'}>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
