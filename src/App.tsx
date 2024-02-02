import { Link, Outlet } from '@tanstack/react-router'
import { Test } from 'components/ui/Test'

function App() {
  return (
    <>
      <Test />
      <Link to='/' className='text-black'>
        Go to home
      </Link>
      <Link to='register' className='text-black'>
        Go to register
      </Link>
      <Link to='login' className='text-black'>
        Go to login
      </Link>
      <Outlet />
    </>
  )
}

export default App
