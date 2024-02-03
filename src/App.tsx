import { Outlet } from '@tanstack/react-router'
import { Button } from 'components/ui/button/Button'
import { AuthPage } from 'pages/AuthPage'

function App() {
  return (
    <>
      <Button isAddIcon>Add</Button>
      <AuthPage />
      <Outlet />
    </>
  )
}

export default App
