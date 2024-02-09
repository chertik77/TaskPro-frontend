import { Header } from 'components/pages/DashboardPage/header/Header'
import { Sidebar } from 'components/pages/DashboardPage/sidebar/Sidebar'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/slices/user/user-slice'

const DashboardPage = () => {
  const { setTheme } = useTheme()
  const theme = useSelector(selectTheme)

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  return (
    <>
      <Header />
      <Sidebar />
    </>
  )
}

export default DashboardPage
