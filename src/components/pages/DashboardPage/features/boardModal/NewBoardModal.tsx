import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { useBoard } from 'hooks/useBoard'
import { BackgroundContainer } from './BackgroundContainer'
import { Svg } from './svg/Svg'

export const NewBoardModal = () => {
  const { register, errors } = useBoard()
  return (
    <Modal size='sm' modalTitle='New board'>
      <Field
        {...register('title')}
        inputName='title'
        placeholder='Title'
        errors={errors}
      />
      <p className='mt-6'>Icons</p>
      <Svg />
      <p className='mt-6 '>Background</p>
      <BackgroundContainer />
      <Button isAddIcon={true} onClick={e => console.log(e)}>
        Create
      </Button>
    </Modal>
  )
}
