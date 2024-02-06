import { App } from 'components/App'
import { EditBoardModal } from 'components/pages/DashboardPage/modals/boardModal/EditBoardModal'
import { NewBoardModal } from 'components/pages/DashboardPage/modals/boardModal/NewBoardModal'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute='class'
          themes={['light', 'dark', 'violet']}
          defaultTheme={store.getState().user.user.userTheme}>
          <BrowserRouter>
            <ModalProvider
              modals={[
                ['edit-board-modal', EditBoardModal],
                ['new-board-modal', NewBoardModal]
              ]}>
              <App />
              <ModalRenderer Component={EditBoardModal} />
              <ModalRenderer Component={NewBoardModal} />
            </ModalProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
