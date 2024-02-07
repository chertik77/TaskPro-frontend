import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { useBoard } from 'hooks/useBoard'
import type { ChangeEvent } from 'react'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const NewBoardModal = () => {
  const { register, errors } = useBoard()

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <Modal size='sm' modalTitle='New board'>
      <Field
        {...register('title')}
        inputName='title'
        className={errors && 'mb-2'}
        placeholder='Title'
        errors={errors}
      />
      <p className='mt-6'>Icons</p>
      <Icons handleIconChange={handleIconChange} />
      <p className='mt-6'>Background</p>
      <BackgroundContainer />
      <Button isAddIcon iconName='plus' onClick={e => console.log(e)}>
        Create
      </Button>
    </Modal>
  )
}
