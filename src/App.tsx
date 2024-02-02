import { Link, Outlet } from '@tanstack/react-router'
import { ThemeChanger } from 'components/ui/ThemeChanger'

function App() {
  return (
    <>
      <Link to='/' className='text-black'>
        Home
      </Link>
      <Link to='/about' className='text-black'>
        About
      </Link>
      <ThemeChanger />
      <Outlet />
    </>
  )
}

export default App
