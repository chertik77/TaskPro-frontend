import { useEffect } from 'react'
import { Header, Sidebar } from 'components/pages/dashboard'
import { useTheme } from 'next-themes'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectTheme } from 'redux/slices/user/user-slice'

const DashboardPage = () => {
  const { setTheme } = useTheme()
  const theme = useSelector(selectTheme)

  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])

  return (
    <div
      className='mobile:grid-cols-[225px,1fr] desktop:grid desktop:h-dvh
        desktop:grid-cols-[260px,1fr] desktop:grid-rows-[auto,1fr]'>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  )
}

export default DashboardPage
