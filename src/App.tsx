import { Link, Outlet } from '@tanstack/react-router'
import { AuthPage } from 'pages/AuthPage'
import { HomePage } from 'pages/HomePage'

function App() {
  return (
    <>
      <AuthPage />
      <Outlet />
      <Link to='dashboard'>dasboard</Link>
    </>
  )
}

export default App
