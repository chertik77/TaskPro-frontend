import { themes } from 'constants/themes'
import { ThemeProvider } from 'next-themes'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectTheme } from 'redux/user.slice'

import { Header, Sidebar } from 'components/dashboard'

const DashboardPage = () => {
  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme={theme}
      themes={themes}
      enableSystem={false}>
      <div
        className='mobile:grid-cols-[225px,1fr] desktop:grid desktop:h-dvh
          desktop:grid-cols-[260px,1fr] desktop:grid-rows-[auto,1fr]'>
        <Sidebar />
        <Header />
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default DashboardPage
