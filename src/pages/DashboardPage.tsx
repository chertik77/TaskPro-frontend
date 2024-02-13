import { Header, Sidebar } from 'components/pages/DashboardPage'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectTheme } from 'redux/slices/user/user-slice'

const DashboardPage = () => {
  const { setTheme } = useTheme()
  const theme = useSelector(selectTheme)

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  return (
    <div className='desktop:grid desktop:h-dvh desktop:grid-cols-[260px,1fr] desktop:grid-rows-[auto,1fr]'>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  )
}

export default DashboardPage
