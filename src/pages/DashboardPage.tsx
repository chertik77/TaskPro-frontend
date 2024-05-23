import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from 'components/dashboard'

const DashboardPage = () => (
  <div
    className='grid h-dvh grid-rows-[60px,1fr] desktop:grid-cols-[260px,1fr]
      desktop:grid-rows-[auto,1fr]'>
    <Sidebar />
    <Header />
    <Outlet />
  </div>
)

export default DashboardPage
