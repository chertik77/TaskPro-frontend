import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from 'components/dashboard'

const DashboardPage = () => (
  <div
    className='grid-cols-[225px,1fr] desktop:grid desktop:grid-cols-[260px,1fr]
      desktop:grid-rows-[auto,1fr]'>
    <Sidebar />
    <Header />
    <Outlet />
  </div>
)

export default DashboardPage
