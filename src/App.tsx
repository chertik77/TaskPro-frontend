import { Link, Outlet } from '@tanstack/react-router'
import { Button } from 'components/ui/button/Button'
import { AuthPage } from 'pages/AuthPage'

function App() {
  return (
    <>
      <Button isSmallIcon iconName='arrow' />
      <AuthPage />
      <Outlet />
      <Link to='dashboard'>dasboard</Link>
    </>
  )
}

export default App
