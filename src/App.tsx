import { Outlet } from '@tanstack/react-router'
import { AuthPage } from 'pages/AuthPage'

function App() {
  return (
    <>
      <AuthPage />
      <Outlet />
    </>
  )
}

export default App
