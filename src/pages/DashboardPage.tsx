import { EditProfile } from 'components/features/EditProfile'
import { Header } from 'components/header/Header'
import { useModal } from 'hooks'

const DashboardPage = () => {
  const { isModalOpen, toggleModal } = useModal()
  return (
    <>
      <Header />
      <EditProfile isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </>
  )
}

export default DashboardPage
