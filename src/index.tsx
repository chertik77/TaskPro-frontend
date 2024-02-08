import { App } from 'components/App'
import { ThemeProviderContainer } from 'components/ThemeProviderContainer'
import { StrictMode, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { ModalProvider, ModalRenderer } from 'react-modal-state'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'
import './index.css'

const EditProfileModal = lazy(() =>
  import('components/pages/DashboardPage/modals').then(m => ({
    default: m.EditProfileModal
  }))
)

const EditBoardModal = lazy(() =>
  import('components/pages/DashboardPage/modals').then(m => ({
    default: m.EditBoardModal
  }))
)

const NewBoardModal = lazy(() =>
  import('components/pages/DashboardPage/modals').then(m => ({
    default: m.NewBoardModal
  }))
)

const AddColumnModal = lazy(() =>
  import('components/pages/DashboardPage/modals').then(m => ({
    default: m.AddColumnModal
  }))
)

const EditColumnModal = lazy(() =>
  import('components/pages/DashboardPage/modals').then(m => ({
    default: m.EditColumnModal
  }))
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderContainer>
          <BrowserRouter>
            <ModalProvider
              modals={[
                ['edit-board-modal', EditBoardModal],
                ['new-board-modal', NewBoardModal],
                ['add-column-modal', AddColumnModal],
                ['edit-column-modal', EditColumnModal],
                ['edit-profile-modal', EditProfileModal]
              ]}>
              <App />
              <ModalRenderer Component={EditBoardModal} />
              <ModalRenderer Component={NewBoardModal} />
              <ModalRenderer Component={AddColumnModal} />
              <ModalRenderer Component={EditColumnModal} />
              <ModalRenderer Component={EditProfileModal} />
            </ModalProvider>
          </BrowserRouter>
        </ThemeProviderContainer>
      </PersistGate>
    </Provider>
  </StrictMode>
)
