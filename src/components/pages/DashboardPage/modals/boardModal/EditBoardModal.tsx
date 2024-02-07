import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { useBoard } from 'hooks/useBoard'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const EditBoardModal = () => {
  const { register, errors } = useBoard()

  return (
    <Modal size='sm' modalTitle='Edit board'>
      <Field
        {...register('title')}
        inputName='title'
        placeholder='Title'
        errors={errors}
      />
      <p className='mt-6'>Icons</p>
      <Icons />
      <p className='mt-6 '>Background</p>
      <BackgroundContainer />
      <Button isAddIcon>Create</Button>
    </Modal>
  )
}
